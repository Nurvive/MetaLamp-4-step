import {Slider} from "./slider/slider"

(function ($) {
    $.fn.Slider=function () {
        return this.each(function () {
            let ths = $(this);
            let slider = new Slider(ths[0])
        })
    }
})(jQuery)
