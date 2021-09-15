const path = require('path');
const configPath = path.join(process.cwd(), 'built', 'configs', 'mainConfig');
const config = require(configPath);

const { RateLimiterPostgres } = require('rate-limiter-flexible');
const db = require(config.modulePaths.database);
const userVerification = require(config.modulePaths.userVerification);
const userManager = require(config.modulePaths.userManager);


function LoginAttemptLimiter() {
    this.maxConsecutiveFailsByUsernameAndIP = 5;
    this.maxWrongAttemptsByIPperDay = 100;

    this.limiterConsecutiveFailsByUsernameAndIP = new RateLimiterPostgres({
        storeClient: db.$pool, //replace this with actual imported client store
        keyPrefix: 'login_fail_consecutive_username_and_ip',
        points: this.maxConsecutiveFailsByUsernameAndIP,
        duration: 60 * 60 * 3, // Store number for 3 hours since first fail
        blockDuration: 60 * 15 // Block for 15 minutes
    });

    this.limiterSlowBruteByIP = new RateLimiterPostgres({
        storeClient: db.$pool, //replace this with the actual imported client store
        keyPrefix: 'login_fail_ip_per_day',
        points: this.maxWrongAttemptsByIPperDay,
        duration: 60 * 60 * 24, //store number for one day since first fail
        blockDuration: 60 * 60 * 24 //Block for 1 day, if 100 wrong attempts per day
    });
}


LoginAttemptLimiter.prototype.process = async function(req, res, next) {
    const ipAddr = req.ip;
    const username = req.body.username;
    const password = req.body.password;

    const usernameAndIP = username + ipAddr;

    const resUsernameAndIP = await this.limiterConsecutiveFailsByUsernameAndIP.get(usernameAndIP);
    const resSlowByIP = await this.limiterSlowBruteByIP.get(ipAddr);

    let retrySecs = 0;

    //Check if IP or Username + IP is already blocked
    if (resSlowByIP !== null && resSlowByIP.consumedPoints > this.maxWrongAttemptsByIPperDay) {
        retrySecs = Math.round(resSlowByIP.msBeforeNext / 1000) || 1;
    }
    else if (resUsernameAndIP !== null && resUsernameAndIP.consumedPoints > this.maxConsecutiveFailsByUsernameAndIP) {
        retrySecs = Math.round(resUsernameAndIP.msBeforeNext / 1000 || 1);
    }

    if (retrySecs) {
        res.set('Retry-After', String(retrySecs));
        res.status(429).send('Too Many Requests');
    }

    let usernameExists = await userVerification.verifyUsername(username);

    try {
        if (!usernameExists) await this.limiterSlowBruteByIP.consume(ipAddr);
        else {
            let userId = await userManager.getUser_id(username);
            let passwordIsCorrect = await userVerification.verifyPassword(userId, password);

            if (!passwordIsCorrect) {
                await this.limiterConsecutiveFailsByUsernameAndIP.consume(usernameAndIP);
                await this.limiterSlowBruteByIP.consume(ipAddr);
            }
            else {
                let resUsernameAndIP = this.limiterConsecutiveFailsByUsernameAndIP.get(usernameAndIP);
                if (resUsernameAndIP !== null && resUsernameAndIP.consumedPoints > 0) {
                    await this.limiterConsecutiveFailsByUsernameAndIP.delete(usernameAndIP);
                }
            }
        }
    }
    catch (rlRejected) {
        if (rlRejected instanceof Error) throw rlRejected;
        else {
            res.set('Retry-After', String(Math.round(rlRejected.msBeforeNext / 1000)) || 1);
            res.status(429).send('Too Many Requests');
        }        
    }

    next();
}


export = LoginAttemptLimiter;