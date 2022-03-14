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
    const slider = new Slider(node, settings);
    test('should be', () => {
        expect(slider)
            .toBeDefined();
    });
    test('functions should be', () => {
        expect(slider.hideBubble)
            .toBeDefined();
        expect(slider.showBubble)
            .toBeDefined();
        expect(slider.changeOrientation)
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
    });
    test('functions should return true', () => {
        expect(slider.hideBubble())
            .toBeTruthy();
        expect(slider.showBubble())
            .toBeTruthy();
        expect(slider.changeOrientation('horizontal'))
            .toBeTruthy();
        expect(slider.changeType('double'))
            .toBeTruthy();
        expect(slider.changeStep(1))
            .toBeTruthy();
        expect(slider.changeTo(10))
            .toBeTruthy();
        expect(slider.changeMax(50))
            .toBeTruthy();
        expect(slider.changeMin(-1))
            .toBeTruthy();
        expect(slider.changeFrom(0))
            .toBeTruthy();
    });
});
