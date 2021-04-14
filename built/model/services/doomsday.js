"use strict";
var userManager = require('../managers/userManager');
function Doomsday() { }
Doomsday.prototype.ragnarok = function () {
    for (var i = 1; i < 78; i++) {
        userManager.deleteUser(i);
    }
};
module.exports = new Doomsday();
