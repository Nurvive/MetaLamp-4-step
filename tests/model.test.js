import {Model} from '../src/slider/Model';
/* eslint-disable dot-notation */
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
        onChangeTo: function () {
        },
        onChangeFrom: function () {
        }
    };
    let model = new Model(settings);
    beforeEach(() => {
        model = new Model(settings);
    });
    test('should be', () => {
        expect(model)
            .toBeDefined();
    });
    test('func moreThan0LessThan1 is OK', () => {
        expect(Model['moreThan0LessThan1'](1))
            .toBe(1);
        expect(Model['moreThan0LessThan1'](0))
            .toBe(0);
        expect(Model['moreThan0LessThan1'](0.42))
            .toBe(0.42);
        expect(Model['moreThan0LessThan1'](2))
            .toBe(1);
        expect(Model['moreThan0LessThan1'](-1))
            .toBe(0);
    });
    test('func getValueRelative is OK', () => {
        expect(Model['getValueRelative']({
            value: 66,
            min: 0,
            max: 100
        }))
            .toBe(0.66);
        expect(Model['getValueRelative']({
            value: 100,
            min: 0,
            max: 100
        }))
            .toBe(1);
        expect(Model['getValueRelative']({
            value: 0,
            min: 0,
            max: 100
        }))
            .toBe(0);
    });
    test('func calcValueByStep is OK', () => {
        expect(model['calcValueByStep'](90.1697998046875))
            .toBe(90);
        expect(model['calcValueByStep'](0))
            .toBe(0);
        expect(model['calcValueByStep'](100))
            .toBe(100);
        expect(model['calcValueByStep'](43.852091471354164))
            .toBe(44);
        delete model.state.step;
        expect(() => model['calcValueByStep'](0))
            .toThrow('Значение step не определено');
        model.state.step = 1.5;
        expect(model['calcValueByStep'](91.64896647135417))
            .toBe(91.5);
        model.state.step = 9;
        expect(model['calcValueByStep'](100, 'valueTo'))
            .toBe(model.state.max);
    });
    test('func calcValue is OK', () => {
        expect(model['calcValue'](0))
            .toBe(0);
        expect(model['calcValue'](0.6867500813802083))
            .toBe(69);
        expect(model['calcValue'](0.22612508138020834))
            .toBe(23);
        expect(model['calcValue'](0.20977091471354167))
            .toBe(21);
    });
    test('func single validValueTo is OK', () => {
        expect(model['validValueTo'](91))
            .toBe(91);
        expect(model['validValueTo'](101))
            .toBe(100);
        expect(model['validValueTo'](-1))
            .toBe(0);
    });
    test('func double validValueTo is OK', () => {
        model.state.type = 'double';
        expect(model['validValueTo'](91))
            .toBe(91);
        expect(model['validValueTo'](101))
            .toBe(100);
        expect(model['validValueTo'](3))
            .toBe(6);
        expect(model['validValueTo'](5))
            .toBe(6);
    });
    test('func validValueFrom is OK', () => {
        model.state.type = 'double';
        expect(model['validValueFrom'](91))
            .toBe(91);
        expect(model['validValueFrom'](100))
            .toBe(99);
        expect(model['validValueFrom'](-1))
            .toBe(0);
    });
    test('setter direction is OK', () => {
        model.direction = 'vertical';
        expect(model.state.direction)
            .toBe('vertical');
    });
    test('setter type is OK', () => {
        model.type = 'double';
        expect(model.state.type)
            .toBe('double');
        model.state.min = 20;
        model.type = 'double';
        expect(model.state.valueFrom)
            .toBe(model.state.min);
        model.state.min = 0;
        model.state.valueTo = 2;
        model.type = 'double';
        expect(model.state.valueFrom)
            .toBe(model.state.valueTo - model.state.step);
    });
    test('setter step is OK', () => {
        model.step = 5;
        expect(model.state.step)
            .toBe(5);
        expect(() => {
            model.step = 1000;
        })
            .toThrow('Шаг не может быть больше разницы максимума и минимума');
    });
    test('setter max is OK', () => {
        model.max = 50;
        expect(model.state.max)
            .toBe(50);
        model.max = 150;
        expect(model.state.max)
            .toBe(150);
        expect(() => {
            model
                .max = -1;
        })
            .toThrow('Максимум не может быть меньше или равен минимуму');
    });
    test('setter min is OK', () => {
        model.min = 50;
        expect(model.state.min)
            .toBe(50);
        model.min = -1;
        expect(model.state.min)
            .toBe(-1);
        expect(() => {
            model
                .min = 150;
        })
            .toThrow('Минимум не может быть больше или равен максимуму');
        model.state.type = 'double';
        model.state.valueFrom = 15;
        model.min = 20;
        expect(model.state.valueFrom)
            .toBe(20);
    });
    test('func calcPosition is OK', () => {
        let data = {
            target: 'valueTo',
            valueArray: [874.4000244140625, 880, 300, 581, 874, 7]
        };
        model.calcPosition(data);
        expect(model.state.valueTo)
            .toBe(98);
        data = {
            target: 'value',
            valueArray: [300, 581, 870]
        };
        model.calcPosition(data);
        expect(model.state.valueTo)
            .toBe(96);
        model.type = 'double';
        data = {
            valueArray: [576.4000244140625, 580, 300, 581, 644, 7],
            target: 'valueFrom',
        };
        model.calcPosition(data);
        expect(model.state.valueFrom)
            .toBe(22);
        data = {
            target: 'value',
            valueArray: [300, 581, 695],
        };
        model.calcPosition(data);
        expect(model.state.valueFrom)
            .toBe(38);
        data = {
            target: 'value',
            valueArray: [300, 581, 855]
        };
        model.calcPosition(data);
        expect(model.state.valueTo)
            .toBe(91);
        data = {
            valueArray: [847.5718994140625, 852, 300, 581, 630, 7],
            target: 'valueTo'
        };
        model.calcPosition(data);
        expect(model.state.valueTo)
            .toBe(39);
        model.changeDirection = 'vertical';
        data = {
            target: 'valueTo',
            valueArray: [443.7749938964844, 451, 300, 207, 467, 7]
        };
        model.calcPosition(data);
        expect(model.state.valueTo)
            .toBe(87);
        data = {
            target: 'value',
            valueArray: [300, 207, 257]
        };
        model.calcPosition(data);
        expect(model.state.valueFrom)
            .toBe(17);
        data = {
            target: 'valueTo',
            valueArray: undefined
        };
        expect(() => model.calcPosition(data))
            .toThrow('Ожидался массив значений для Model');
    });
    test('func calcUpdatedValueRelative is OK', () => {
        expect(() => {
            model['calcUpdatedValueRelative']({valueArrayay: undefined});
        })
            .toThrow('Ожидался массив значений для Model');
    });
});
