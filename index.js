// import 'jquery/dist/jquery.min'
import './styles.scss'
import './jquery.slider'

$().ready(function () {
    $('#slider').Slider({
        bubble: true,
        direction: 'horizontal',
        max: 100,
        min: 0,
        step: 2,
        initValue: 0,
        type:'double'
    });
})
// import {Slider} from "./slider"
// let slider = new Slider('slider')
