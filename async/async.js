var Async = function() {};
Async.prototype = {

  sequence: function(fns) {
    var fnSize = fns.length;
    return function(cb) {
      process.nextTick(function() {
        var next = function(nextFn) {
          if (nextFn >= fnSize) return cb;
          return function(err, data) {
            if (err) return cb.call(null, err, data);
            return fns[nextFn].call(null, next(nextFn+1), data);
          };
        };
        fns[0].call(null, next(1));
      });
    };
  },

  parallel: function(fns) {
    var result = [];
    var fnSize = fns.length;
    var executed = 0;
    return function(cb) {
      var done = function(idx) {
        return function(err, data) {
          result[idx] = data;
          executed++;
          if (err) cb.call(null, err, null);
          if (executed === fnSize) cb.call(null, null, result);
        };
      };
      process.nextTick(function() {
        fns.forEach(function(fn, idx) {
          fn.call(null, done(idx));
        });
      });
    };
  },

  race: function(fns) {
    var fnSize = fns.length;
    var hasAWinner = false;

    return function(cb) {
      var done = function(err, data) {
        if (!hasAWinner) {
          hasAWinner = true;
          cb.call(null, err, data);
        }
      };

      process.nextTick(function() {
        fns.forEach(function(fn) {
          fn.call(null, done);
        });
      });
    };
  }
};

module.exports = new Async();
