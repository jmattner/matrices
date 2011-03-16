(function() {
  var Matribox, index;
  index = 1;
  Matribox = {
    index: index,
    initialize: function() {
      this.index = index = index++;
      return console.log(this.index);
    }
  };
}).call(this);
