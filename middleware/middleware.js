var Middleware = function() {
  this.steps = [];
};

Middleware.prototype = {

  use: function(step) {
    this.steps.push(step);
  },

  go: function(resume) {
    var first = this.steps.shift();
    if (!first) resume.call();
    first.call(null, this._next(resume));
  },

  _next: function(resume) {
    var next = this.steps.shift();
    if (!next) return resume;
    return next.bind(null, this._next(resume));
  }

};

module.exports = Middleware;
