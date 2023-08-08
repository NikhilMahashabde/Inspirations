"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var handleLogout = function (req, res) {
    req.session.destroy(function (err) {
        if (err) {
            return res
                .status(400)
                .json({ error: "failed to destroy session ".concat(err) });
        }
        res.json({ message: "Successfully logged out", isLoggedOut: true });
    });
};
exports.default = handleLogout;
