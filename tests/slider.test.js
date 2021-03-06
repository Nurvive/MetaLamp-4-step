import {Slider} from '../src/slider/Slider';

describe('Class Slider: ', () => {
    const settings = {
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
    };
    const node = document.createElement('div');
    let slider;
    beforeEach(() => {
        slider = new Slider(node, settings);
    });
    test('should be', () => {
        expect(slider)
            .toBeDefined();
    });
    test('functions should be', () => {
        expect(slider.hideBubble)
            .toBeDefined();
        expect(slider.showBubble)
            .toBeDefined();
        expect(slider.changeDirection)
            .toBeDefined();
        expect(slider.changeType)
            .toBeDefined();
        expect(slider.changeStep)
            .toBeDefined();
        expect(slider.changeTo)
            .toBeDefined();
        expect(slider.changeMax)
            .toBeDefined();
        expect(slider.changeMin)
            .toBeDefined();
        expect(slider.changeFrom)
            .toBeDefined();
        expect(slider.getMax)
            .toBeDefined();
        expect(slider.getMin)
            .toBeDefined();
        expect(slider.getValueTo)
            .toBeDefined();
        expect(slider.getValueFrom)
            .toBeDefined();
    });
    test('functions should return this', () => {
        expect(slider.hideBubble())
            .toEqual(slider);
        expect(slider.showBubble())
            .toEqual(slider);
        expect(slider.changeDirection('horizontal'))
            .toEqual(slider);
        expect(slider.changeType('double'))
            .toEqual(slider);
        expect(slider.changeStep(1))
            .toEqual(slider);
        expect(slider.changeTo(10))
            .toEqual(slider);
        expect(slider.changeMax(50))
            .toEqual(slider);
        expect(slider.changeMin(-1))
            .toEqual(slider);
        expect(slider.changeFrom(0))
            .toEqual(slider);
    });
    test('getters should return numbers', () => {
        expect(slider.getMax())
            .toBe(settings.max);
        expect(slider.getMin())
            .toBe(settings.min);
        expect(slider.getValueTo())
            .toBe(settings.valueTo);
        expect(slider.getValueFrom())
            .toBe(settings.valueFrom);
    });
});
