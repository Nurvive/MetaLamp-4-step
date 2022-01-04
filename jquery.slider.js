import {Slider} from "./slider/slider"

(function ($) {
    let sliders=[];
    const methods = {
        init: function (options) {
            let settings = $.extend({
                bubble: true,
                max: 100,
                min: 0,
                step: 1,
                type: 'single',
                valueTo: 100,
                valueFrom: 5,
                direction: 'horizontal',
                onChangeTo: function () {
                },
                onChangeFrom: function () {
                }
            }, options)

            return this.each(function () {
                let ths = $(this);
                if (settings.step > settings.max - settings.min)
                    throw "Шаг не может быть больше разницы максимума и минимума";
                if (settings.valueTo > settings.max)
                    throw "Текущее значение не может быть больше максимума";
                if (settings.valueFrom < settings.min)
                    throw "Текущее значение не может быть меньше минимума";
                sliders.push(new Slider(ths[0], settings));
            })
        },
        hideBubble: function () {
            let slider;
            sliders.forEach((x)=> {
                x.elem === this[0] ? slider = x : null
            })
            slider.hideBubble()
        },
        showBubble: function () {
            let slider;
            sliders.forEach((x)=> {
                x.elem === this[0] ? slider = x : null
            })
            slider.showBubble()
        },
        changeOrientation: function (value) {
            let slider;
            sliders.forEach((x)=> {
                x.elem === this[0] ? slider = x : null
            })
            slider.changeOrientation(value)
        },
        changeType: function (value) {
            let slider;
            sliders.forEach((x)=> {
                x.elem === this[0] ? slider = x : null
            })
            slider.changeType(value)
        },
        changeStep: function (value) {
            let slider;
            sliders.forEach((x)=> {
                x.elem === this[0] ? slider = x : null
            })
            if (isNaN(value))
                throw 'step должно быть числом'
            slider.changeStep(value)
        },
        changeTo: function (value) {
            let slider;
            sliders.forEach((x)=> {
                x.elem === this[0] ? slider = x : null
            })
            if (isNaN(value))
                throw 'valueTo должно быть числом'
            slider.changeTo(value)
        },
        changeFrom: function (value) {
            let slider;
            sliders.forEach((x)=> {
                x.elem === this[0] ? slider = x : null
            })
            if (isNaN(value))
                throw 'valueFrom должно быть числом'
            slider.changeFrom(value)
        },
        changeMax: function (value) {
            let slider;
            sliders.forEach((x)=> {
                x.elem === this[0] ? slider = x : null
            })
            if (isNaN(value))
                throw 'valueFrom должно быть числом'
            slider.changeMax(value)
        },
        changeMin: function (value) {
            let slider;
            sliders.forEach((x)=> {
                x.elem === this[0] ? slider = x : null
            })
            if (isNaN(value))
                throw 'valueFrom должно быть числом'
            slider.changeMin(value)
        },


    }

    $.fn.Slider = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Метод с именем ' + method + ' не существует для jQuery.slider');
        }
    };
})(jQuery)
