import {Slider} from "./slider/slider"

(function ($) {
    $.fn.Slider = function (options) {
        let settings = $.extend({
            bubble: true,
            max: 100,
            min: 0,
            step: 1,
            initValue: 0,
            type: 'single',

        }, options)

        return this.each(function (e) {
            let ths = $(this);
            if (settings.step > settings.max - settings.min)
                throw "Шаг не может быть больше разницы максимума и минимума";
            let slider = new Slider(ths[0], settings);
        })
    }
})(jQuery)
