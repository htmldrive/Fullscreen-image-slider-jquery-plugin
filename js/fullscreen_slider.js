(function($) {

  function isArray(value) {
    if (typeof value == "undefined") return false;

    if (value instanceof Array || (!(value instanceof Object) && (Object.prototype.toString.call((value)) == '[object Array]') || typeof value.length == 'number' && typeof value.splice != 'undefined' && typeof value.propertyIsEnumerable != 'undefined' && !value.propertyIsEnumerable('splice'))) {
      return true;
    }

    return false;
  }

  $.fullscreen_slider = function(node, settings) {
    var lNode = $(node);
    if (!lNode.data("fullscreen_slider")) lNode.data("fullscreen_slider", new fullscreen_slider(node, settings));

    return lNode.data("fullscreen_slider");
  };

  $.fn.fullscreen_slider = function(action, opt_value) {

    var returnValue, args = arguments;

    function isDef(val) {
      return val !== undefined;
    };

    function isDefAndNotNull(val) {
      return val != null;
    };
    this.each(function() {
      var self = $.fullscreen_slider(this, action);

      if (typeof action == "string") {
        switch (action) {
          case "resize":
            self.reset();
            break;
        };

      } else if (!action && !opt_value) {
        if (!isArray(returnValue)) returnValue = [];

        returnValue.push(self);
      }
    });

    if (isArray(returnValue) && returnValue.length == 1) returnValue = returnValue[0];

    return returnValue || this;
  };

  var OPTIONS = {
    settings: {
      easing: 'easeOutQuad',
      handle_width: 30,
      speed: 'slow'
    },
  };

  function fullscreen_slider() {
    return this.init.apply(this, arguments);
  };

  fullscreen_slider.prototype.init = function(node, settings) {
    var caller = this;
    caller.settings = $.extend(true, {}, OPTIONS.settings, settings ? settings : {});
    caller.current = 0;
    caller.padding = $(window).height() * 0.2;
    caller.window_height = $(window).height();
    caller.window_width = $(window).width();
    caller.child_count = $(node).children('.fullscreen_slider_child').length;
    caller.node = $(node);
    caller.image_height = 900;
    caller.image_width = 600;
    caller.load_count = 0;
    caller.node.width(caller.window_width).height(caller.window_height);
    caller.node.children('.fullscreen_slider_child').click(function() {
      if (!$(this).is(":animated")) {
        caller.play($(this));
      }
    });
    caller.node.swipe({
      swipeLeft: function(event, direction, distance, duration, fingerCount) {
        caller.forward();
      },
      swipeRight: function(event, direction, distance, duration, fingerCount) {
        caller.backward();
      }
    });

    $("body").keydown(function(event) {
      if(!caller.node.children('.fullscreen_slider_child').eq(caller.current).is(":animated")){
        console.log(event.keyCode);
        if (event.keyCode == 37) caller.backward();
        if (event.keyCode == 38) ;
        if (event.keyCode == 39) caller.forward();
        if (event.keyCode == 40) ;
      }
    });
    caller.node.children('.fullscreen_slider_child').children('.fullscreen_slider_image').children('img').each(function(){
      var img = $('<img>').on('load', function(){
        caller.load_count ++;
        if(caller.load_count >= caller.child_count){
          caller.node.css('background-image','none');
          caller.reset();
        }
      });
      img.attr('src',$(this).attr('src'));
    });
  };

  fullscreen_slider.prototype.reset = function() {
    var caller = this;
    var node = caller.node;
    caller.window_height = $(window).height();
    caller.window_width = $(window).width();
    var window_width = caller.window_width;
    var window_height = caller.window_height;
    caller.padding = window_height * 0.15;
    var image_height = window_height - caller.padding * 2;
    var image_width = image_height * 1.33;

    caller.image_width = image_width;
    caller.image_height = image_height;

    node.children('.fullscreen_slider_child').children('.fullscreen_slider_image').children('img').width(image_width).height(image_height);
    node.width(window_width).height(window_height).show();
    node.children('.fullscreen_slider_child').width(image_width);
    node.children('.fullscreen_slider_child').height(image_height);
    var caption = node.children('.fullscreen_slider_child').children('.fullscreen_slider_caption');
    caption.each(function() {
      $(this).css('margin-top', (caller.padding - $(this).height()) / 2);
    });
    node.children('.fullscreen_slider_child').hide();

    var current_child = node.children('.fullscreen_slider_child').eq(caller.current);
    current_child.width(image_width).height(image_height);
    current_child.css({
      "top": caller.padding,
      "left": (window_width - image_width) / 2
    }).show();

    var prev_child = current_child.prev();
    prev_child.width(image_width).height(image_height);
    var prev_left = (-image_width + caller.settings.handle_width);
    prev_child.css({
      "top": (window_height - image_height) / 2,
      "left": prev_left
    }).show();

    var next_child = current_child.next();
    next_child.width(image_width).height(image_height);
    var next_left = window_width - caller.settings.handle_width;
    next_child.css({
      "top": (window_height - image_height) / 2,
      "left": next_left
    }).show();

    var first_child = prev_child.prev();
    first_child.width(image_width).height(image_height);
    var first_left = (-window_width + caller.settings.handle_width) * 2;
    first_child.css({
      "top": (window_height - image_height) / 2,
      "left": first_left
    }).show();

    var last_child = next_child.next();
    last_child.width(image_width).height(image_height);
    var last_left = (window_width - caller.settings.handle_width) * 2;
    last_child.css({
      "top": (window_height - image_height) / 2,
      "left": last_left
    }).show();

    node.children('.fullscreen_slider_child').children('.fullscreen_slider_caption').hide();
    setTimeout(function() {
      current_child.children('.fullscreen_slider_caption').show();
    }, 100);
    node.children('.fullscreen_slider_child').addClass('phone_hide');
    current_child.removeClass('phone_hide');
  }

  fullscreen_slider.prototype.play = function(dom) {
    var caller = this;
    if (dom.index() >= caller.current) {
      if (caller.current < caller.child_count - 1) {
        caller.forward();
      }
    } else {
      caller.backward();
    }
  };

  fullscreen_slider.prototype.forward = function() {
    var caller = this;
    if (caller.current >= caller.child_count - 1) {
      return false;
    }
    caller.node.children('.fullscreen_slider_child').children('.fullscreen_slider_caption').hide();
    var current_child = caller.node.children('.fullscreen_slider_child').eq(caller.current);
    current_child.animate({
      left: (-current_child.children('.fullscreen_slider_image').children('img').width() + caller.settings.handle_width)
    }, caller.settings.speed, caller.settings.easing, function() {
      caller.current++;
      caller.reset();
    });

    var prev_child = current_child.prev();
    prev_child.animate({
      left: (-caller.window_width)
    }, caller.settings.speed, caller.settings.easing);

    var next_child = current_child.next();
    next_child.animate({
      left: (caller.window_width - next_child.children('.fullscreen_slider_image').children('img').width()) / 2
    }, caller.settings.speed, caller.settings.easing);
    next_child.removeClass('phone_hide');

    var last_child = next_child.next();
    last_child.animate({
      left: caller.window_width - caller.settings.handle_width
    }, caller.settings.speed, caller.settings.easing);

  }

  fullscreen_slider.prototype.backward = function() {
    var caller = this;
    if (caller.current <= 0) {
      return false;
    }
    caller.node.children('.fullscreen_slider_child').children('.fullscreen_slider_caption').hide();
    var current_child = caller.node.children('.fullscreen_slider_child').eq(caller.current);
    current_child.animate({
      left: caller.window_width - caller.settings.handle_width
    }, caller.settings.speed, caller.settings.easing, function() {
      caller.current--;
      caller.reset();
    });

    var prev_child = current_child.prev();
    prev_child.animate({
      left: (caller.window_width - prev_child.children('.fullscreen_slider_image').children('img').width()) / 2
    }, caller.settings.speed, caller.settings.easing);
    prev_child.removeClass('phone_hide');

    var next_child = current_child.next();
    next_child.animate({
      left: caller.window_width * 2
    }, caller.settings.speed, caller.settings.easing);

    var first_child = prev_child.prev();
    first_child.animate({
      left: (-caller.image_width + caller.settings.handle_width)
    }, caller.settings.speed, caller.settings.easing);
  }
})(jQuery);