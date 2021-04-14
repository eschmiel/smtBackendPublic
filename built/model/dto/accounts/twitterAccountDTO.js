"use strict";
var TwitterAccountDTO = /** @class */ (function () {
    function TwitterAccountDTO(account_id, twitter_id, access_token, access_token_secret) {
        this.account_id = account_id;
        this.twitter_id = twitter_id;
        this.access_token = access_token;
        this.access_token_secret = access_token_secret;
    }
    return TwitterAccountDTO;
}());
module.exports = TwitterAccountDTO;
