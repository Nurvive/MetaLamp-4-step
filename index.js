// import 'jquery/dist/jquery.min'
import './styles.scss'
import './jquery.slider'

$().ready(function () {
    const $bubbleButton = $('input[data-type="bubble"]')
    const $verticalButton = $('input[data-type="vertical"]')
    const $rangeButton = $('input[data-type="range"]')
    const $stepInput = $('input[data-type="step"]')
    const $toInput = $('input[data-type="to"]')
    const $fromInput = $('input[data-type="from"]')
    const $maxInput = $('input[data-type="max"]')
    const $minInput = $('input[data-type="min"]')
    const slider1 = $('#slider').Slider({
        bubble: true,
        direction: 'horizontal',
        max: 100,
        min: 0,
        step: 1,
        type: 'double',
        valueTo: 100,
        valueFrom: 4,
        onChangeTo: function (value) {
            $toInput.val(value)
        }
    });

    $bubbleButton.on('click', function () {
        this.checked ? slider1.Slider('showBubble') : slider1.Slider('hideBubble')
    })
    $verticalButton.on('click', function () {
        this.checked ? slider1.Slider('changeOrientation', 'vertical') : slider1.Slider('changeOrientation', 'horizontal')
    })
    $rangeButton.on('click', function () {
        this.checked ? slider1.Slider('changeType', 'double') : slider1.Slider('changeType', 'single')
    })
    $stepInput.on('input', function () {
        slider1.Slider('changeStep', parseInt(this.value))
    })
    $toInput.on('input', function () {
        slider1.Slider('changeTo', parseInt(this.value))
    })
    $fromInput.on('input', function () {
        slider1.Slider('changeFrom', parseInt(this.value))
    })
    $maxInput.on('input', function () {
        slider1.Slider('changeMax', parseInt(this.value))
    })
    $minInput.on('input', function () {
        slider1.Slider('changeMin', parseInt(this.value))
    })

})

