Fullscreen Image Slider with jQuery plugin
=======================


[![Fullscreen Image Slider with jQuery plugin](http://www.htmldrive.net/media/2013/4/14/1365927602.png "Fullscreen Image Slider with jQuery plugin")](http://www.htmldrive.net/items/show/1276/Fullscreen-Image-Slider-with-jQuery-plugin "Fullscreen Image Slider with jQuery plugin")

[**Demo**](http://www.htmldrive.net/items/show/1276/Fullscreen-Image-Slider-with-jQuery-plugin "Fullscreen Image Slider with jQuery plugin")

##Features

*Realtime window resize responsive
*Optimization for tablet and smartphone
*Easy to installation configuration
*Support touch gestures
*Support left/right arrow keys
*Image loading

##Usage
**Include js and css files.**

    <link rel="stylesheet" type="text/css" media="screen" href="css/style.css" />
    <link rel="stylesheet" type="text/css" media="screen" href="css/fullscreen_slider.css" />
    <script type="text/javascript" src="http://code.jquery.com/jquery-1.9.1.js"></script>
    <script type="text/javascript" src="http://code.jquery.com/ui/1.10.2/jquery-ui.js"></script>
    <script type="text/javascript" src="js/jquery.touchswipe.js"></script>
    <script type="text/javascript" src="js/fullscreen_slider.js"></script>

  
**Add html.**

    <div id="slider" class="fullscreen_slider">
        <div class="fullscreen_slider_child">
            <div class="fullscreen_slider_image">
                <img src="800x600.gif"  />
            </div>
            <div class="fullscreen_slider_caption">Description</div>
        </div>
        <div class="fullscreen_slider_child">
            <div class="fullscreen_slider_image">
                <img src="800x600.gif" />
            </div>
            <div class="fullscreen_slider_caption">Description</div>
        </div>
        <div class="fullscreen_slider_child">
            <div class="fullscreen_slider_image">
                <img src="800x600.gif" />
            </div>
            <div class="fullscreen_slider_caption">Description</div>
        </div>
    </div>

        
**Add startup script.**

    $(document).ready(function (){
        $('#slider').fullscreen_slider({
          easing: 'easeOutQuad',
          handle_width: 60, //Prev next show width
          speed: 'slow'
        });
    });
    $(window).resize(function() {
        $('#slider').fullscreen_slider('resize');
    });
