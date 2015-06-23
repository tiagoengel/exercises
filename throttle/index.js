module.exports = function(fn, threshold) {
  var calls = 0, executed = 0, executing = false;
  var ctx = null, args = [];
  
  var throttle = function() {
    if (executing) {
      calls++;
      return;
    }
    executing = true;
    setTimeout(function() {
      fn.apply(ctx, args);
      if (++executed < calls) {
        executing = false;
        throttle();
      }
    }, threshold-1); // -1 to compensate the time taken to actually execute the function
  };

  return function() {
    ctx = this;
    args = arguments;

    if (calls++ > 0) {
      throttle.call();
      return;
    }

    fn.apply(ctx, args);
    executed++;

  };
};
