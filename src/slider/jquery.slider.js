import {Slider} from './Slider';

(($) => {
    const sliders = [];
    const methods = {
        init(options) {
            const settings = $.extend({
                bubble: true,
                max: 100,
                min: 0,
                step: 1,
                type: 'single',
                valueTo: 100,
                valueFrom: 5,
                direction: 'horizontal',
                onChangeTo() {},
                onChangeFrom() {}
            }, options);

            return this.each(() => {
                if (settings.step > settings.max - settings.min) {
                    throw new Error('Шаг не может быть больше разницы максимума и минимума');
                }
                if (settings.step <= 0) {
                    throw new Error('Шаг должен быть больше нуля');
                }
                if (settings.valueTo > settings.max) {
                    throw new Error('Текущее значение не может быть больше максимума');
                }
                if (settings.valueFrom < settings.min) {
                    throw new Error('Текущее значение не может быть меньше минимума');
                }
                sliders.push(new Slider(this[0], settings));
            });
        },
        hideBubble() {
            let slider;
            sliders.forEach((x) => {
                if (x.elem === this[0]) {
                    slider = x;
                }
            });
            slider.hideBubble();
        },
        showBubble() {
            let slider;
            sliders.forEach((x) => {
                if (x.elem === this[0]) {
                    slider = x;
                }
            });
            slider.showBubble();
        },
        changeDirection(value) {
            let slider;
            sliders.forEach((x) => {
                if (x.elem === this[0]) {
                    slider = x;
                }
            });
            slider.changeDirection(value);
        },
        changeType(value) {
            let slider;
            sliders.forEach((x) => {
                if (x.elem === this[0]) {
                    slider = x;
                }
            });
            slider.changeType(value);
        },
        changeStep(value) {
            let slider;
            sliders.forEach((x) => {
                if (x.elem === this[0]) {
                    slider = x;
                }
            });
            if (Number.isNaN(value)) throw new Error('step должно быть числом');
            slider.changeStep(value);
        },
        changeTo(value) {
            let slider;
            sliders.forEach((x) => {
                if (x.elem === this[0]) {
                    slider = x;
                }
            });
            if (Number.isNaN(value)) throw new Error('valueTo должно быть числом');
            slider.changeTo(value);
        },
        changeFrom(value) {
            let slider;
            sliders.forEach((x) => {
                if (x.elem === this[0]) {
                    slider = x;
                }
            });
            if (Number.isNaN(value)) throw new Error('valueFrom должно быть числом');
            slider.changeFrom(value);
        },
        changeMax(value) {
            let slider;
            sliders.forEach((x) => {
                if (x.elem === this[0]) {
                    slider = x;
                }
            });
            if (Number.isNaN(value)) throw new Error('valueFrom должно быть числом');
            slider.changeMax(value);
        },
        getMax() {
            let slider;
            sliders.forEach((x) => {
                if (x.elem === this[0]) {
                    slider = x;
                }
            });
            return slider.getMax();
        },
        getMin() {
            let slider;
            sliders.forEach((x) => {
                if (x.elem === this[0]) {
                    slider = x;
                }
            });
            return slider.getMin();
        },
        getValueTo() {
            let slider;
            sliders.forEach((x) => {
                if (x.elem === this[0]) {
                    slider = x;
                }
            });
            return slider.getValueTo();
        },
        getValueFrom() {
            let slider;
            sliders.forEach((x) => {
                if (x.elem === this[0]) {
                    slider = x;
                }
            });
            return slider.getValueFrom();
        },
        getStep() {
            let slider;
            sliders.forEach((x) => {
                if (x.elem === this[0]) {
                    slider = x;
                }
            });
            return slider.getStep();
        },
        changeMin(value) {
            let slider;
            sliders.forEach((x) => {
                if (x.elem === this[0]) {
                    slider = x;
                }
            });
            if (Number.isNaN(value)) throw new Error('valueFrom должно быть числом');
            slider.changeMin(value);
        }

    };
    // eslint-disable-next-line no-param-reassign
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
})(jQuery);
