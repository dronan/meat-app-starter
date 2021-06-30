"use strict";
exports.__esModule = true;
exports.handleAuthentication = void 0;
var users_1 = require("./users");
var handleAuthentication = function (req, resp) {
    var user = req.body;
    if (isValid(user)) {
        var dbUser = users_1.users[user.email];
        resp.json({ name: dbUser.name, email: dbUser.email });
    }
    else {
        resp.status(403).json({ message: 'Dados Invalidos.' });
    }
};
exports.handleAuthentication = handleAuthentication;
function isValid(user) {
    if (!user)
        return false;
    var dbUser = users_1.users[user.email];
    return dbUser != undefined && dbUser.matches(user);
}
