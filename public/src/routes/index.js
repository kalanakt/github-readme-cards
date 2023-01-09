var Router = require('express');
var views = require('./views');
var router = Router();
router.get('/:name/:color', function (req, res) {
    var _a = req.params, name = _a.name, color = _a.color;
    var svg = views.generateSVG(name, color);
    res.set('Content-Type', 'image/svg+xml').send(svg);
});
export default router;
//# sourceMappingURL=index.js.map