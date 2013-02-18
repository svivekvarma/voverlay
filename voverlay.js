﻿/*
==================================================================================================
Author : Vivek Siruvuri
 
Plugin Name : voverlay

License : Creative Commons Attribution 3.0 Unported License

GitHub Repository: https://github.com/svivekvarma/voverlay

Contact Url : https://github.com/svivekvarma
==================================================================================================
*/


(function ($) {
    var methods = {
        show: function (options) {
            this.each(function () {
                var $this = $(this);
                var uniqueid = methods.getnewoverlayid();
                $('<div class=\"window\" data-uniqueid=\"' + uniqueid + '\"></div>').appendTo('body').css("z-index", uniqueid + 100);
                if (options.title) {
                    $('<h2>' + options.title + '</h2>').appendTo('div.window[data-uniqueid=' + uniqueid + ']');
                }
                $(this).show();
                $(this).addClass('voverlaycontent');
                $(this).appendTo('div.window[data-uniqueid=' + uniqueid + ']');
                methods.centerelement(uniqueid);
                $(window).resize(function () { methods.centerelement(uniqueid); });
                $('<div class=\"mask\" data-uniqueid=\"' + uniqueid + '\"></div>').css("height", $(document).height()).appendTo('body').css("z-index", uniqueid);
                $('div.mask[data-uniqueid=' + uniqueid + ']').click(function () {
                    $($this).voverlay('hide');
                });
                

                $('div.window[data-uniqueid=' + uniqueid + ']').attr("tabindex", -1).focus();
                
                //$('div.window[data-uniqueid=' + uniqueid + ']').attr("tabindex", -1).mouseover(function () { $(this).focus(); });
                //$('div.window[data-uniqueid=' + uniqueid + ']').mouseleave(function () { $(this).blur(); });

                $('div.window[data-uniqueid=' + uniqueid + ']').keyup(function (e) {
                    if (e.keyCode == 27) {
                        var topoverlayid = methods.gettopmostoverlayid();
                        if (topoverlayid > -1) {
                            $('div.window[data-uniqueid=' + topoverlayid + '] > .voverlaycontent').voverlay('hide');

                            // Now set focus on new topmost overlay if there is one

                            var newtopmostid = methods.gettopmostoverlayid();
                            if (newtopmostid > -1) {
                                $('div.window[data-uniqueid=' + newtopmostid + ']').focus();
                            }
                            e.preventDefault();
                        }
                    }
                });
            });
            options.onOpen();
            return this;
        },
        hide: function () {
            return this.each(function () {
                var uniqueid = $(this).parent('div.window').attr('data-uniqueid');
                $(this).siblings('h2').remove();
                $(this).unwrap().hide();
                $(this).removeClass('voverlaycontent');
                $('div.mask[data-uniqueid=' + uniqueid + ']').remove();
            });
        },
        update: function (content) { },
        centerelement: function (uniqueid) {
            $('div.window[data-uniqueid=' + uniqueid + ']').css({ 'overflow-y': 'none' });
            $('div.window[data-uniqueid=' + uniqueid + ']').css({ 'overflow-x': 'none' });
            $('div.window[data-uniqueid=' + uniqueid + ']').width('auto');
            $('div.window[data-uniqueid=' + uniqueid + ']').height('auto');
            var elemheight = $('div.window[data-uniqueid=' + uniqueid + ']').height();
            var elemwidth = $('div.window[data-uniqueid=' + uniqueid + ']').width();
            var calculatedwidth = ($(window).width() - elemwidth) / 2;
            var calculatedheight = ($(window).height() - elemheight) / 2;
            console.log(calculatedwidth);
            console.log(calculatedheight);
            if (calculatedwidth > 40) {
                $('div.window[data-uniqueid=' + uniqueid + ']').css("left", ($(window).width() - elemwidth) / 2 + 'px');

            } else {
                $('div.window[data-uniqueid=' + uniqueid + ']').width($(window).width() - 60)
                $('div.window[data-uniqueid=' + uniqueid + ']').css("left", ($(window).width() - ($(window).width() - 40)) / 2 + 'px');

                $('div.window[data-uniqueid=' + uniqueid + ']').width($(window).width() - 60);
                $('div.window[data-uniqueid=' + uniqueid + ']').css({ 'overflow-x': 'scroll' });
            }

            if (calculatedheight > 40) {
                $('div.window[data-uniqueid=' + uniqueid + ']').css("top", ($(window).height() - elemheight) / 2 + 'px');

            } else {
                $('div.window[data-uniqueid=' + uniqueid + ']').css("top", ($(window).height() - ($(window).height() - 40)) / 2 + 'px');

                $('div.window[data-uniqueid=' + uniqueid + ']').height($(window).height() - 60);
                $('div.window[data-uniqueid=' + uniqueid + ']').css({ 'overflow-y': 'scroll' });
            }

        },
        getnewoverlayid: function () {
            var startnum = 1000;
            $('.window').each(function () {
                if (parseInt($(this).attr('data-uniqueid'), 10) > startnum) {
                    startnum = parseInt($(this).attr('data-uniqueid'), 10);
                }
            });
            return startnum + 1000;
        },
        gettopmostoverlayid: function () {
            var startnum = -1;
            $('.window').each(function () {
                if (parseInt($(this).attr('data-uniqueid'), 10) > startnum) {
                    startnum = parseInt($(this).attr('data-uniqueid'), 10);
                }
            });
            return startnum;
        }
    };
    $.fn.voverlay = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.voverlay');
        }
    };

})(jQuery);
