import {Presenter} from '../slider/Presenter';
import {Model} from '../slider/Model';
import {View} from '../slider/View';

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
        // eslint-disable-next-line
        onChangeTo: function () {
        },
        // eslint-disable-next-line
        onChangeFrom: function () {
        }
    };
    const node = document.createElement('div');
    const model = new Model(node);
    model.init(settings);
    const view = new View(node);
    view.init(settings);
    const presenter = new Presenter(node, model, view);
    test('should be', () => {
        expect(presenter)
            .toBeDefined();
    });
});
