(function($){
  
  var brightbox = {};
  brightbox.mouse = {};
  brightbox.window = {};
  brightbox.methods = {
    init: function(options) {
      this.each(function(){
        var $this = $(this), data = $this.data('brightbox');
        if(!data) {
          $this.data('brightbox', {
            matrix: [1,0,0,0,
                     0,1,0,0,
                     0,0,1,0,
                     0,0,0,1]
          });
        }
        $(document).bind('mousemove',{box:this},brightbox.methods.transformBox);
      });
      $(window).unbind('mousemove');
      $(window).unbind('resize');
      $(window).bind('mousemove',brightbox.methods.getMouseCoordinates);
      $(window).bind('resize',brightbox.methods.getWindowDimensions);
      brightbox.methods.getWindowDimensions();
    },
    getMouseCoordinates: function(event) {
      brightbox.mouse.x = event.pageX;
      brightbox.mouse.y = event.pageY;
    },
    getWindowDimensions: function(event) {
      brightbox.window.height = $(window).height();
      brightbox.window.width = $(window).width();
    },
    transformBox: function(event) {
      if(event.data.box) {
        var $this = $(event.data.box), data = $this.data('brightbox');
        // var horizontal = (brightbox.window.width/2-brightbox.mouse.x)/20000;
        // var offset = $this.offset();
        // var horizontalCenter = offset.left + ($this.width()*3.3);
        // var verticalCenter = offset.top + ($this.height()*3.3);
        // var horizontal = ((horizontalCenter/2-brightbox.mouse.x)/8000);
        // var vertical = ((verticalCenter/2-brightbox.mouse.y)/8000);
        // brightbox.methods.modifyMatrix(event.data.box,0,3,horizontal);
        // brightbox.methods.modifyMatrix(event.data.box,1,3,vertical);
        $this.brightbox('modifyStyle');
      }
    },
    modifyMatrix: function(obj,row,column,value) {
      var data = $(obj).data('brightbox');
      if(data.matrix) {
        cell = (row*4)+column;
        data.matrix[cell] = value;
      }
    },
    modifyStyle: function() {
      var $this = $(this), data = $this.data('brightbox');
      if(brightbox.methods.isValidMatrix(data.matrix)) {
        var style = brightbox.methods.getStyleFromMatrix(data.matrix, false);
        $this.attr('style',style);
      }
    },
    getStyleFromMatrix: function(matrix, checkIfValid) {
      var style = "-webkit-transform: matrix3d(";
      if(typeof(checkIfValid) != 'undefined' || checkIfValid) {
        if(!brightbox.methods.isValidMatrix(matrix)) return false;
      }
      $.each(matrix,function(i,v){
        style = style + v;
        if(i != 15) style = style + ",";
      });
      style = style + ");";
      return style;
    },
    isValidMatrix: function(matrix) {
      return true;
    }
  };
  
  $.fn.brightbox = function(method) {
    if(brightbox.methods[method]) {
      return brightbox.methods[method].apply(this,Array.prototype.slice.call(arguments,1));
    } else if (typeof method === 'object' || ! method) {
      return brightbox.methods.init.apply(this,arguments);
    } else {
      $.error('Brightbox could not find that method. Typo?');
    }
  }
  
  $(function(){
    $("#box1").brightbox();
    $("#box2").brightbox();
    $("#box3").brightbox();
  });
  
})(jQuery);