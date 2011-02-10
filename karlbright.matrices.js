(function($){
  
  // Create our object within the jQuery object. Keep our code cleans
  $.matrices = {};
  // Default options, currently used to show/hide debug controls
  $.matrices.options = { showMatrix: true, showMouse: true };
  // Our global mouse object, this is updated from our mousemove method
  $.matrices.mouse = { x: 0, y: 0 };
  
  $.fn.matrices = function(options){
    // Extend the options if we have anything but default
    if(options) $.extend($.matrices.options,options);
    // Parse through options
    if(!$.matrices.options.showMatrix) $("form").hide();
    if(!$.matrices.options.showMouse)  $("#mouse").hide();
    // Attach events
    $(window).bind('mousemove',onMouseMove);
    $("form#matrix input").bind('change',onMatrixInputChange);
  };
  
  /*
  onMouseMove
  Takes mouse coordinates, saves them to globally accessible object.
  Used to calculate matrices on boxes as user moves around the page.
  e : event object, passed through from jQuery bind method
  */
  function onMouseMove(e) {
    $.matrices.mouse.x = e.pageX;
    $.matrices.mouse.y = e.pageY;
  }
  
  /*
  onMatrixInputChange
  Handles any change made to the matrix form inputs.
  Takes the value from the changed input and passes it to our updateMatrix method.
  e : event object, passed through from jQuery bind method
  */
  function onMatrixInputChange(e) {
    var $this = $(e.currentTarget);
    var id = '#' + $this.attr('id'), value = $this.val();
    updateMatrix(id,value);
  }
  
  /*
  updateMatrix
  Make it really easy to change matrix cells
  c : cell number (00,01,02,03,10,11,12,13,20,21,22,23,30,31,32,33)
  v : value
  ...OR...
  c : key/value pair for multiple values
  */
  function updateMatrix(c,v) {
    // Check whats being passed into the update matrix method
    // If it is an object then we are most likely changing multiple values
    if(typeof c == 'object') {
      // Iterate over key/value pair
      for(var cell in c) {
        // Set new values
        $(cell).val(c[cell]);
      }
    } else {
      // Check if string is complete or partial
      c = c.search(/^\#m/) != -1 ? c : '#m'+c.toString();
      // Set new values
      $(c).val(v);
    }
    // Update our box with new values
    updateBox();
  }
  
  /*
  updateBox
  Update our box with the correct transform3d styles.
  */
  function updateBox() {
    // Create empty array to store values too
    matrix = [];
    // Iterate over each input of the matrix form and save to the array
    $("form#matrix input").each(function(){
      matrix.push($(this).val());
    });
    // Update box styles
    $("#box").attr('style','-webkit-transform: matrix3d('+matrix+');');
  }
  
  /*
  document ready
  This function is called once the document is ready to rock and roll
  */
  $(function(){
    // Call matrices on our objects to setup event handlers and make the magic happen
    $("#box").matrices();
  });
  
})(jQuery);