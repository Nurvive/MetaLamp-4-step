import './index.scss';
import '../blocks/slider-block/slider-block.scss';
import '../slider/jquery.slider';
import '../blocks/slider-template/slider-template';
import SliderTemplate from '../blocks/slider-template/slider-template';
import {State} from '../slider/types/types';

$(function () {
    const settings: State[] = [
        {
            bubble: true,
            direction: 'horizontal',
            max: 100,
            min: 0,
            step: 1,
            type: 'double',
            valueTo: 100,
            valueFrom: 0,
            onChangeTo: function () {
            },
            onChangeFrom: function () {
            }
        },
        {
            bubble: false,
            direction: 'vertical',
            max: 90,
            min: 5,
            step: 2,
            type: 'single',
            valueTo: 50,
            valueFrom: 15,
            onChangeTo: function () {
            },
            onChangeFrom: function () {
            }
        },
        {
            bubble: true,
            direction: 'horizontal',
            max: 1000,
            min: -100,
            step: 30,
            type: 'single',
            valueTo: 780,
            valueFrom: -5,
            onChangeTo: function () {
            },
            onChangeFrom: function () {
            }
        }
    ];
    $('.slider-template')
        .each((index, element) => {
            // eslint-disable-next-line no-new
            new SliderTemplate(element, settings[index]);
        });
});
