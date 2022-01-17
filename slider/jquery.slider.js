import {Slider} from './Slider';

(function ($) {
    const sliders : Slider[] = [];
    const methods = {
        init: function (options) {
            const settings = $.extend({
                bubble: true,
                max: 100,
                min: 0,
                step: 1,
                type: 'single',
                valueTo: 100,
                valueFrom: 5,
                direction: 'horizontal',
                // eslint-disable-next-line
                onChangeTo: function () {
                },
                // eslint-disable-next-line
                onChangeFrom: function () {
                }
            }, options);

            return this.each(() => {
                const ths = $(this);
                if (settings.step > settings.max - settings.min) throw new Error('Шаг не может быть больше разницы максимума и минимума');
                if (settings.valueTo > settings.max) throw new Error('Текущее значение не может быть больше максимума');
                if (settings.valueFrom < settings.min) throw new Error('Текущее значение не может быть меньше минимума');
                console.log(ths);
                console.log(ths[0]);
                console.log(this);
                sliders.push(new Slider(this, settings));
            });
        },
        hideBubble: function () {
            let slider;
            sliders.forEach((x) => {
                if (x.elem === this[0]) {
                    slider = x;
                }
            });
            slider.hideBubble();
        },
        showBubble: function () {
            let slider;
            sliders.forEach((x) => {
                if (x.elem === this[0]) {
                    slider = x;
                }
            });
            slider.showBubble();
        },
        changeOrientation: function (value) {
            let slider;
            sliders.forEach((x) => {
                if (x.elem === this[0]) {
                    slider = x;
                }
            });
            slider.changeOrientation(value);
        },
        changeType: function (value) {
            let slider;
            sliders.forEach((x) => {
                if (x.elem === this[0]) {
                    slider = x;
                }
            });
            slider.changeType(value);
        },
        changeStep: function (value) {
            let slider;
            sliders.forEach((x) => {
                if (x.elem === this[0]) {
                    slider = x;
                }
            });
            if (value.isNan) throw new Error('step должно быть числом');
            slider.changeStep(value);
        },
        changeTo: function (value) {
            let slider;
            sliders.forEach((x) => {
                if (x.elem === this[0]) {
                    slider = x;
                }
            });
            if (value.isNan) throw new Error('valueTo должно быть числом');
            slider.changeTo(value);
        },
        changeFrom: function (value) {
            let slider;
            sliders.forEach((x) => {
                if (x.elem === this[0]) {
                    slider = x;
                }
            });
            if (value.isNan) throw new Error('valueFrom должно быть числом');
            slider.changeFrom(value);
        },
        changeMax: function (value) {
            let slider;
            sliders.forEach((x) => {
                if (x.elem === this[0]) {
                    slider = x;
                }
            });
            if (value.isNan) throw new Error('valueFrom должно быть числом');
            slider.changeMax(value);
        },
        changeMin: function (value) {
            let slider;
            sliders.forEach((x) => {
                if (x.elem === this[0]) {
                    slider = x;
                }
            });
            if (value.isNan) throw new Error('valueFrom должно быть числом');
            slider.changeMin(value);
        }

    };
    // eslint-disable-next-line
    $.fn.Slider = function (method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        }
        if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        }
        $.error('Метод с именем ' + method + ' не существует для jQuery.slider');
        return null;
    };
}(jQuery));
