import {Slider} from "./slider/slider"

(function ($) {
    $.fn.Slider = function (options) {
        let settings = $.extend({
            bubble: true,
            max: 100,
            min: 0,
            step: 1,
            position: 0,
            type: 'single'
        }, options)

        return this.each(function (e) {
            let ths = $(this);
            let slider = new Slider(ths[0], settings)
        })
    }
})(jQuery)
