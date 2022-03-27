import {Presenter} from '../src/slider/Presenter';
import {Model} from '../src/slider/Model';
import {View} from '../src/slider/View';

describe('Class Presenter: ', () => {
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
    const model = new Model(settings);
    const view = new View(node, settings);
    const presenter = new Presenter(model, view);
    test('should be', () => {
        expect(presenter)
            .toBeDefined();
    });
});
