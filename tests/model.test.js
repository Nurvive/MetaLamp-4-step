import {Model} from '../slider/Model';

describe('Class Model: ', () => {
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
    beforeEach(() => {
        model.init(settings);
    });
    test('should be', () => {
        expect(model)
            .toBeDefined();
    });
    test('func calcValueByStep is OK', () => {
        expect(model.calcValueByStep(90.1697998046875))
            .toBe(90);
        expect(model.calcValueByStep(0))
            .toBe(0);
        expect(model.calcValueByStep(100))
            .toBe(100);
        expect(model.calcValueByStep(43.852091471354164))
            .toBe(44);
    });
    test('func calcValue is OK', () => {
        expect(model.calcValue(0))
            .toBe(0);
        expect(model.calcValue(0.6867500813802083))
            .toBe(69);
        expect(model.calcValue(0.22612508138020834))
            .toBe(23);
        expect(model.calcValue(0.20977091471354167))
            .toBe(21);
    });
    test('func single validValueTo is OK', () => {
        expect(model.validValueTo(91))
            .toBe(91);
        expect(model.validValueTo(101))
            .toBe(100);
        expect(model.validValueTo(-1))
            .toBe(0);
    });
    test('func double validValueTo is OK', () => {
        model.state.type = 'double';
        expect(model.validValueTo(91))
            .toBe(91);
        expect(model.validValueTo(101))
            .toBe(100);
        expect(model.validValueTo(3))
            .toBe(6);
        expect(model.validValueTo(5))
            .toBe(6);
    });
    test('func validValueFrom is OK', () => {
        model.state.type = 'double';
        expect(model.validValueFrom(91))
            .toBe(91);
        expect(model.validValueFrom(100))
            .toBe(99);
        expect(model.validValueFrom(-1))
            .toBe(0);
    });
    test('setter changeOrientation is OK', () => {
        model.changeOrientation = 'vertical';
        expect(model.state.direction)
            .toBe('vertical');
    });
    test('setter changeType is OK', () => {
        model.changeType = 'double';
        expect(model.state.type)
            .toBe('double');
    });
    test('setter changeStep is OK', () => {
        model.changeStep = 5;
        expect(model.state.step)
            .toBe(5);
        expect(() => {
            model.changeStep = 1000;
        })
            .toThrow('Шаг не может быть больше разницы максимума и минимума');
    });
    test('func updateState is OK', () => {
        let data = {
            target: 'min',
            valueN: 10
        };
        model.updateState(data);
        expect(model.state.min)
            .toBe(10);
        data = {
            target: 'bubble',
            valueB: false
        };
        model.updateState(data);
        expect(model.state.bubble)
            .toBe(false);
        data = {
            target: 'direction',
            valueS: 'vertical'
        };
        model.updateState(data);
        expect(model.state.direction)
            .toBe('vertical');
    });
    test('func changeMax is OK', () => {
        model.changeMax(50);
        expect(model.state.max)
            .toBe(50);
        model.changeMax(150);
        expect(model.state.max)
            .toBe(150);
        expect(() => {
            model
                .changeMax(-1);
        })
            .toThrow('Максимум не может быть меньше минимума');
    });
    test('func changeMin is OK', () => {
        model.changeMin(50);
        expect(model.state.min)
            .toBe(50);
        model.changeMin(-1);
        expect(model.state.min)
            .toBe(-1);
        expect(() => {
            model
                .changeMin(150);
        })
            .toThrow('Минимум не может быть больше максимума');
    });
    test('func calcPosition is OK', () => {
        let data = {
            onlyState: false,
            target: 'valueTo',
            valueN: 0.9085209147135417
        };
        model.calcPosition(data);
        expect(model.state.valueTo)
            .toBe(91);
        model.changeType = 'double';
        data = {
            valueN: 0.12596883138020834,
            target: 'valueFrom',
            onlyState: false
        };
        model.calcPosition(data);
        expect(model.state.valueFrom)
            .toBe(13);
        data = {
            target: 'value',
            valueN: 0.34,
            onlyState: false
        };
        model.calcPosition(data);
        expect(model.state.valueFrom)
            .toBe(34);
        data = {
            target: 'value',
            valueN: 0.8366666666666667,
            onlyState: false
        };
        model.changeType = 'single';
        model.calcPosition(data);
        expect(model.state.valueTo)
            .toBe(84);
    });
});
