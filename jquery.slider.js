import {Slider} from "./slider/slider"

(function ($) {
    const methods = {
       init : function (options) {

            let settings = $.extend({
                bubble: true,
                max: 100,
                min: 0,
                step: 1,
                initValue: 0,
                type: 'single',
                valueTo: 100,
                valueFrom: 0
            }, options)

            return this.each(function () {
                let ths = $(this);
                if (settings.step > settings.max - settings.min)
                    throw "Шаг не может быть больше разницы максимума и минимума";
                let slider = new Slider(ths[0], settings);
            })
        },
        update : function( content ) {
            console.log(content);

        }
    }

    $.fn.Slider = function (method) {
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Метод с именем ' +  method + ' не существует для jQuery.slider' );
        }
    };
})(jQuery)
