import { connect } from "net";

// Import MySQL connection
var connection = require("../config/connection.js");

// ORM functions that takes in inputs and commands
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

function objToSql(ob) {
    var arr = [];

for (var key in ob) {
    var value = ob[key];

    if (Object.hasOwnProperty.call(ob, key)) {
      
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
      }
      arr.push(key + "=" + value);
    }
}

return arr.toString();
}

// Object for all SQL statement functions
var orm = {
    // select rows from table
    all: function (tableInput, cb) {
        var queryString = "SELECT * FROM" + tableInput + ";";
        connection.query(queryString, function (err, res) {
            if (err) throw err;
            cb(res);
        });
    },
    // insert row into the table
    create: function (table, cols, vals, cb) {
        var queryString = "INSERT INTO" + table;

        queryString += "(";
        queryString += cols.toString();
        queryString += ")";
        queryString += "VALUES (";
        queryString += printQuestionMarks(vals.lenght);
        queryString += ")";

        console.log(queryString);

        connection.query(queryString, vals, function (err, res) {
            if (err) throw err;
            cn(res);
        });
    },
    // update row in the table
    update: function (table, objColVals, condition, cb) {
        var queryString = "UPDATE" + table;

        queryString += "SET";
        queryString += objToSql(objColVals);
        queryString += "WHERE";
        queryString += condition;

        console.log(queryString);

        connection.query(queryString, function (err, res) {
            if (err) throw err;
            cb(res);
        });
    },
}

module.exports = orm;
