import './index.scss';
import '../blocks/slider/slider.scss';
import '../blocks/slider-template/slider-template.scss';
import '../slider/jquery.slider';

$(function () {
    const $bubbleButton = $('input[data-type="bubble"]');
    const $verticalButton = $('input[data-type="vertical"]');
    const $rangeButton = $('input[data-type="range"]');
    const $stepInput = $('input[data-type="step"]');
    const $toInput = $('input[data-type="to"]');
    const $fromInput = $('input[data-type="from"]');
    const $maxInput = $('input[data-type="max"]');
    const $minInput = $('input[data-type="min"]');
    const slider1 = $('#slider').Slider({
        bubble: true,
        direction: 'horizontal',
        max: 100,
        min: 0,
        step: 1,
        type: 'double',
        valueTo: 100,
        valueFrom: 0,
        onChangeTo: function (value: number) {
            $toInput.val(value);
        },
        onChangeFrom: function (value: number) {
            $fromInput.val(value);
        }
    });

    $bubbleButton.on('click', function () {
        (this as HTMLInputElement).checked ? slider1.Slider('showBubble') : slider1.Slider('hideBubble');
    });
    $verticalButton.on('click', function () {
        (this as HTMLInputElement).checked ? slider1.Slider('changeOrientation', 'vertical') : slider1.Slider('changeOrientation', 'horizontal');
    });
    $rangeButton.on('click', function () {
        (this as HTMLInputElement).checked ? slider1.Slider('changeType', 'double') : slider1.Slider('changeType', 'single');
    });
    $stepInput.on('input', function () {
        slider1.Slider('changeStep', parseFloat((this as HTMLInputElement).value));
    });
    $toInput.on('input', function () {
        slider1.Slider('changeTo', parseFloat((this as HTMLInputElement).value));
    });
    $fromInput.on('input', function () {
        slider1.Slider('changeFrom', parseFloat((this as HTMLInputElement).value));
    });
    $maxInput.on('input', function () {
        slider1.Slider('changeMax', parseFloat((this as HTMLInputElement).value));
    });
    $minInput.on('input', function () {
        slider1.Slider('changeMin', parseFloat((this as HTMLInputElement).value));
    });
    const $bubbleButton2 = $('input[data-type="bubble2"]');
    const $verticalButton2 = $('input[data-type="vertical2"]');
    const $rangeButton2 = $('input[data-type="range2"]');
    const $stepInput2 = $('input[data-type="step2"]');
    const $toInput2 = $('input[data-type="to2"]');
    const $fromInput2 = $('input[data-type="from2"]');
    const $maxInput2 = $('input[data-type="max2"]');
    const $minInput2 = $('input[data-type="min2"]');
    const slider2 = $('#slider2').Slider({
        bubble: false,
        direction: 'vertical',
        max: 90,
        min: 5,
        step: 2,
        type: 'single',
        valueTo: 50,
        valueFrom: 15,
        onChangeTo: function (value: number) {
            $toInput2.val(value);
        },
        onChangeFrom: function (value: number) {
            $fromInput2.val(value);
        }
    });
    $bubbleButton2.on('click', function () {
        (this as HTMLInputElement).checked ? slider2.Slider('showBubble') : slider2.Slider('hideBubble');
    });
    $verticalButton2.on('click', function () {
        (this as HTMLInputElement).checked ? slider2.Slider('changeOrientation', 'vertical') : slider2.Slider('changeOrientation', 'horizontal');
    });
    $rangeButton2.on('click', function () {
        (this as HTMLInputElement).checked ? slider2.Slider('changeType', 'double') : slider2.Slider('changeType', 'single');
    });
    $stepInput2.on('input', function () {
        slider2.Slider('changeStep', parseInt((this as HTMLInputElement).value, 10));
    });
    $toInput2.on('input', function () {
        slider2.Slider('changeTo', parseInt((this as HTMLInputElement).value, 10));
    });
    $fromInput2.on('input', function () {
        slider2.Slider('changeFrom', parseInt((this as HTMLInputElement).value, 10));
    });
    $maxInput2.on('input', function () {
        slider2.Slider('changeMax', parseInt((this as HTMLInputElement).value, 10));
    });
    $minInput2.on('input', function () {
        slider2.Slider('changeMin', parseInt((this as HTMLInputElement).value, 10));
    });
    const $bubbleButton3 = $('input[data-type="bubble3"]');
    const $verticalButton3 = $('input[data-type="vertical3"]');
    const $rangeButton3 = $('input[data-type="range3"]');
    const $stepInput3 = $('input[data-type="step3"]');
    const $toInput3 = $('input[data-type="to3"]');
    const $fromInput3 = $('input[data-type="from3"]');
    const $maxInput3 = $('input[data-type="max3"]');
    const $minInput3 = $('input[data-type="min3"]');
    const slider3 = $('#slider3').Slider({
        bubble: true,
        direction: 'horizontal',
        max: 1000,
        min: -100,
        step: 30,
        type: 'single',
        valueTo: 780,
        valueFrom: -5,
        onChangeTo: function (value: number) {
            $toInput3.val(value);
        },
        onChangeFrom: function (value: number) {
            $fromInput3.val(value);
        }
    });

    $bubbleButton3.on('click', function () {
        (this as HTMLInputElement).checked ? slider3.Slider('showBubble') : slider3.Slider('hideBubble');
    });
    $verticalButton3.on('click', function () {
        (this as HTMLInputElement).checked ? slider3.Slider('changeOrientation', 'vertical') : slider3.Slider('changeOrientation', 'horizontal');
    });
    $rangeButton3.on('click', function () {
        (this as HTMLInputElement).checked ? slider3.Slider('changeType', 'double') : slider3.Slider('changeType', 'single');
    });
    $stepInput3.on('input', function () {
        slider3.Slider('changeStep', parseInt((this as HTMLInputElement).value, 10));
    });
    $toInput3.on('input', function () {
        slider3.Slider('changeTo', parseInt((this as HTMLInputElement).value, 10));
    });
    $fromInput3.on('input', function () {
        slider3.Slider('changeFrom', parseInt((this as HTMLInputElement).value, 10));
    });
    $maxInput3.on('input', function () {
        slider3.Slider('changeMax', parseInt((this as HTMLInputElement).value, 10));
    });
    $minInput3.on('input', function () {
        slider3.Slider('changeMin', parseInt((this as HTMLInputElement).value, 10));
    });
});
