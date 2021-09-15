const userManager = require('../managers/userManager');

function Doomsday() { }

Doomsday.prototype.ragnarok = function () {
    for (let i = 1; i < 78; i++) {
        userManager.deleteUser(i);
    }
}

export = new Doomsday();