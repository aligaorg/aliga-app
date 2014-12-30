//var arrest = require("./lib/arrest-readonly");
var util = require("util");
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();

//var mongoConnectionURL = process.env.MONGOHQ_URL || "mongodb://localhost:27017/arrecurdiary";
//var mongoCollection = "embedded";
app.set("port", (process.env.PORT || 3000));

app.use(bodyParser.json());
//arrest.use(app, "/api", new arrest.RestMongoAPI(mongoConnectionURL, mongoCollection));

/*function CalendarsAPI() {
  "use strict";

  arrest.RestMongoAPI.call(this, mongoConnectionURL, mongoCollection);
  var newRoutes = this.routes.filter(function (item) {
    return item.mount !== "/:id";
  });
  this.routes = newRoutes;
  this.routes.push({ method: "get", mount: "/:slug", handler: this._get });
  this.routes.push({ method: "get", mount: "/:slug/calendars", handler: this._calendars });
  this.routes.push({ method: "get", mount: "/:slug/calendars/:year", handler: this._calendarByYear });
}

util.inherits(CalendarsAPI, arrest.RestMongoAPI);

CalendarsAPI.prototype.sendError = function(res, code, message) {
  "use strict";
  var data = {
    success: false,
    code: code,
    error: message || ""
  };
  res.jsonp(code, data);
};

CalendarsAPI.prototype.responseCallback = function(res, criteria) {
  "use strict";
  var self = this;
  return function(err, data) {
    if (err) {
      self.sendError(res, err.code || parseInt(err) || 400, err.message || data);
    } else {

      // "/calendars" in URL means we are dealing with either
      // /:slug/calendars or /:slug/calendars/:year
      if ( res.req.originalUrl.indexOf("/calendars") > -1 ) {
        var criteriaString = JSON.stringify(criteria);

        // /:slug/calendars/:year
        if (criteriaString.indexOf("calendars.year") > -1) {
          var result = data.calendars[0];
          result.cityName = data.city;
          res.jsonp(result);
        } else {
          // /:slug/calendars ---> we don't need the full calendar
          var calendars = data.calendars;
          calendars.map(function(item) {
            delete item.days;
          });
          // ugly hack, but it works
          calendars.unshift({ "cityName": data.city });
          res.jsonp(calendars);
        }
      } else {
        // /:slug
        res.jsonp(data);
      }
    }
  };
};

CalendarsAPI.prototype._get = function(req, res) {
  "use strict";
  var criteria = req.criteria || { slug: req.params.slug };
  var options = req.options || arrest.RestMongoAPI.defaultQueryOptions(req);
  if (!req.params.slug) {
    this.exports.sendError(res, 400, "slug missing");
  } else {
    this.get(criteria, options, this.responseCallback(res, criteria));
  }
};

CalendarsAPI.prototype._calendars = function(req, res) {
  "use strict";
  var criteria = req.criteria || { slug: req.params.slug };
  var options = req.options || arrest.RestMongoAPI.defaultQueryOptions(req);

  if (!req.params.slug) {
    this.exports.sendError(res, 400, "slug missing");
  } else {
    this.get(criteria, options, this.responseCallback(res, criteria));
  }
};

CalendarsAPI.prototype._calendarByYear = function(req, res) {
  "use strict";
  var criteria = req.criteria || { slug: req.params.slug, "calendars.year": parseInt(req.params.year) };
  var options = req.options || arrest.RestMongoAPI.defaultQueryOptions(req);
  this.get(criteria, options, this.responseCallback(res, criteria));
};

arrest.use(app, "/api", new CalendarsAPI());*/

app.use(express.static(path.join(__dirname, "www")));

/*app.get('*', function(req, res) {
  "use strict";
  res.redirect("/#" + req.originalUrl);
});
*/
app.listen(app.get("port"), function() {
  "use strict";
  console.log("Node app is listening on port " + app.get("port"));
});
