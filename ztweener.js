(function($) {
  function filter(obj1, obj2) {
    var result = {};
    for (key in obj1) {
      if (obj2[key] != obj1[key]) result[key] = obj2[key];
      if (typeof obj2[key] == 'array' && typeof obj1[key] == 'array')
        result[key] = arguments.callee(obj1[key], obj2[key]);
      if (typeof obj2[key] == 'object' && typeof obj1[key] == 'object')
        result[key] = arguments.callee(obj1[key], obj2[key]);
    }
    return result;
  }

  $.fn.getStyleObject = function() {
    var dom = this.get(0);
    var style;
    var returns = {};
    if (window.getComputedStyle) {
      var camelize = function(a, b) {
        return b.toUpperCase();
      };
      style = window.getComputedStyle(dom, null);
      for (var i = 0, l = style.length; i < l; i++) {
        var prop = style[i];
        var camel = prop.replace(/\-([a-z])/g, camelize);
        var val = style.getPropertyValue(prop);
        returns[camel] = val;
      };
      return returns;
    };
    if (style = dom.currentStyle) {
      for (var prop in style) {
        returns[prop] = style[prop];
      };
      return returns;
    };
    return this.css();
  }

  $.delayedCall = function(delay, funct) {
    setTimeout(function() {
      funct();
    }, delay * 1000);
  }

  $.fn.animateFrom = function(fromProperties, duration, easing, callback, delay) {
    // check if left, top, right, or bottom is animated from
    if ('left' in fromProperties && $(this).getStyleObject().left == 'auto') {
      $(this).css({
        'left': '0'
      });
    } else if ('right' in fromProperties && $(this).getStyleObject().right == 'auto') {
      $(this).css({
        'right': '0'
      });
    } else if ('top' in fromProperties && $(this).getStyleObject().top == 'auto') {
      $(this).css({
        'top': '0'
      });
    } else if ('bottom' in fromProperties && $(this).getStyleObject().bottom == 'auto') {
      $(this).css({
        'bottom': '0'
      });
    }

    // get inital styles from element
    var originalProperties = $(this).getStyleObject();
    $(this).css(
      fromProperties
    );

    // check what values have changed
    var oldValues = filter($(this).getStyleObject(), originalProperties);

    $(this).animate(oldValues, duration * 1000, easing, function() {
      if (callback) {
        callback();
      } else {
        callback
      }
    }, delay * 1000);
  }

  $.fn.animateTo = function(toProperties, duration, easing, callback, delay) {
    var that = $(this);
    setTimeout(function() {
      $(that).animate(
        toProperties, duration * 1000, easing,
        function() {
          if (callback) {
            callback();
          } else {
            callback
          }
        }, 0);
    }, delay * 1000);
  }
})(Zepto);