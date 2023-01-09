"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var express_1 = tslib_1.__importDefault(require("express"));
var router = express_1["default"].Router();
router.get('/', function (req, res) {
    var name = req.query.user;
    // const color = req.query.color || '#000';
    res.send(name);
});
exports["default"] = router;
//# sourceMappingURL=profile-route.js.map