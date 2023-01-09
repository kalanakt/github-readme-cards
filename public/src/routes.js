"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var express_1 = tslib_1.__importDefault(require("express"));
var router = express_1["default"].Router();
var profile_route_1 = tslib_1.__importDefault(require("./routes/profile-route"));
// Profile widget
router.use('/profile', profile_route_1["default"]);
exports["default"] = router;
//# sourceMappingURL=routes.js.map