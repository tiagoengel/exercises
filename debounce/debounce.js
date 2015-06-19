module.exports = function(cb, threshold) {
  var executed = false;
  var ctx = null;
  var args = null;
  return function() {
    args = arguments;
    ctx = this;
    if (!executed) {
      executed = true;
      setTimeout(function() {
        executed = false;
        cb.apply(ctx, args);
      }, threshold);
    }
  };
};
