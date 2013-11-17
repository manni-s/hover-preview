/*
 * @Name : Hover Preview - Jquery Plugin For Image Expand Preview
 *
 * @Author: Manish Singh
 *
 * @Copyright (c) 2013 Manish
 *
 * @Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * @Project home:
 *   http://manni-s.github.io/hover-preview
 *
 * @Demo:
 *   http://demo.pixelsurgelabs.com/hover-preview
 */
 
(function ($) {
    $.fn.hoverPreview = function (el) {

        $("<div id='overlay'></div>").prependTo($(this));

        var $this = $(this).find('.slide-item'),
            $imgWidth = $this.find('img').height(),
            $wrapWidth = $(this).width(),
            $wrapHeight = $(this).height(),
            $totalItemHori = $wrapWidth / $imgWidth,
            $totalItemVert = $wrapHeight / $imgWidth,
            $totalItems = $totalItemHori * $totalItemVert;


        var counterHori = 0,
            counterVerti = 0,
            counter = 1;


        $this.each(function () {
            var href = $(this).attr('href'),
                $par = $(this).parent(),
                $ths = $(this);

            if (counterHori === $wrapWidth) {
                counterHori = 0;
                counterVerti = counterVerti + $imgWidth;
                $ths.css('left', counterHori).css('top', counterVerti);
                var app = $('<a href="' + href + '" class="pic-link"></a>').appendTo($par);
                app.css('left', counterHori).css('top', counterVerti);

            } else if (counterVerti > 0) {
                $ths.css('left', counterHori).css('top', counterVerti);
                var app = $('<a href="' + href + '" class="pic-link"></a>').appendTo($par);
                app.css('left', counterHori).css('top', counterVerti);

            } else {
                var initial = $wrapWidth - $imgWidth;
                $ths.css('left', counterHori).css('right', initial + 'px');
                var app = $('<a href="' + href + '" class="pic-link"></a>').appendTo($par);
                app.css('left', counterHori).css('right', initial + 'px');

            }

            $ths.attr('data-num', counter).attr('id', 'item' + counter);
            app.attr('data-num', counter);


            if (counterVerti == 0)
                $ths.find('.slide-text').css('margin-top', $imgWidth * 2 + 'px');

            else if (counterVerti >= 1)
                $ths.find('.slide-text').css('margin-top', '-' + $imgWidth + 'px');


            if (counterHori == ($wrapWidth - $imgWidth) || counterHori == ($wrapWidth - 2 * $imgWidth))
                $ths.attr('data-pos', 'last');



            if (counterVerti == ($wrapHeight - $imgWidth)) {
                $ths.attr('data-pos', 'lastrow');
                $ths.find('.slide-text').css('margin-top', '-' + $imgWidth * 2 + 'px');
            }



            counterHori += $imgWidth;
            counter++;

        });



        $(this).on('mouseover', '.pic-link', function () {
            var xnum = $(this).attr('data-num');

            var $newt = $(this).parent().find('#item' + xnum);
            $img = $newt.find('img'),
            $txt = $newt.find('.slide-text'),
            $num = $newt.attr('data-num'),
            $pos = $newt.attr('data-pos'),
            $left = $newt.css('left'),
            $right = $newt.css('right'),
            $top = $newt.css('top');

            //alert($totalItems);

            if ($pos == 'lastrow' && ($num != $totalItems && $num != $totalItems - 1)) {
                var $imageAnimate = {
                    'bottom': '0px'
                };
                $textAnimate = '';;
            } else if ($pos == 'last') {
                var $imageAnimate = {
                    'right': '0px'
                };
                $textAnimate = $imageAnimate;
            } else if ($num == $totalItems || $num == $totalItems - 1) {
                var $imageAnimate = {
                    'bottom': '0px',
                    'right': '0px'
                };
                $textAnimate = {
                    'right': '0px'
                };
            } else {
                var $imageAnimate = {
                    'left': '0px'
                };
                $textAnimate = $imageAnimate;
            }


            $('#overlay').show();
            $('.slide-item img').css('z-index', 9999);
            $img.css('z-index', 999999);
            $(this).parent('.slide-text').hide();

            $img.stop().animate(
                $imageAnimate, {
                    duration: 500,
                    queue: false
                });
            $img.stop().animate({
                'height': $imgWidth * 2 + 'px',
                'width': $imgWidth * 3 + 'px'
            }, 500);


            $('.slide-item span').css('z-index', 9999);
            $txt.css('z-index', 999999).show();
            $txt.stop().animate(
                $textAnimate, {
                    duration: 500,
                });

        });


        $(this).find('.pic-link').on('mouseleave', function () {
            $('#overlay').hide();
            var xnum = $(this).attr('data-num');

            var $newt = $(this).parent().find('#item' + xnum);
            $img = $newt.find('img'),
            $txt = $newt.find('.slide-text');
            $img.stop().animate({
                'height': $imgWidth + 'px',
                'width': $imgWidth + 'px'
            }, 500);

            $img.css('z-index', 99999);
            $('.slide-text').css('z-index', 99999).hide();

        });

        return this.each(function () {


        });



    };
})(jQuery);