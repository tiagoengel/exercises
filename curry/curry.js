module.exports = function(fn) {
  var argsLength = fn.length;
  var slice = Array.prototype.slice;

  var curry = function() {
    if (arguments.length === argsLength) {
      return fn.apply(null, arguments);
    } else {
      var lastArgs = slice.call(arguments);
      return function() {
        var newArgs = slice.call(arguments);
        return curry.apply(null, lastArgs.concat(newArgs));
      };
    }
  };
  return curry;
};
