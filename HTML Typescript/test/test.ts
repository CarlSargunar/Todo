var mytest = (function () {
  return {
    log: function () {
      console.log('This is an IIFE');
    },
    log2: function () {
      console.log('This is an IIFE');
    }
  };
})();

mytest.log();
mytest.log2();
