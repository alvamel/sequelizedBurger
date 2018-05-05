var express = require("express");
var router = express.Router();

// Import (burger.js) to use its db functions
var burger = require("../models/burger.js");

// Create routes set up logic where required
// Re-direct empty to /index
router.get('/', function (req, res) {
    res.redirect('/index');
});

// Get burgers
router.get('/index', function (req,res) {
    burger.all(function (data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render('index', hbsObject);
    });
});

// Post add burger
router.post("/api/burgers", function (req, res) {
    burger.create([
        "burger_name", "devoured"
    ], [
        req.body.name, false
    ], function (result) {
    // Send back ID of new quote
    res.json({
        id: result.insertId
    });
  });
});

// Put (update) burger
router.put("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);
    console.log(req.body);

    burger.update({
        devoured: req.body.devoured
    }, condition, function (result) {
        if (result.changedRows == 0) {
            // If no rows were changed, then ID must not exist throw error 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

// Export routes for server.js to use.
module.exports = router;