import {View} from '../slider/View';

describe('Class View: ', () => {
    const settings = {
        bubble: true,
        max: 100,
        min: 0,
        step: 1,
        type: 'double',
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
    const view = new View(node);
    beforeEach(() => {
        view.init(settings);
    });
    test('should be', () => {
        expect(view)
            .toBeDefined();
    });
    // test('func init is OK', () => {
    //     view.init(settings);
    // });
    test('func setup is OK', () => {
        delete view.head2;
        expect(() => {
            view
                .setup();
        })
            .toThrow('Head2 не существует');
    });
    test('func calcHeadStartPosition is OK', () => {
        expect(view.calcHeadStartPosition(0))
            .toBe(0);
        expect(view.calcHeadStartPosition(100))
            .toBe(1);
        view.state.max = 90;
        view.state.min = 5;
        expect(view.calcHeadStartPosition(50))
            .toBe(0.5294117647058824);
    });
    test('func getEvent is OK', () => {
        let evt = new MouseEvent('mousedown');
        expect(View.getEvent(evt))
            .toEqual(evt);
        const touchObj = {
            identifier: Date.now(),
            target: view.head.element,
            clientX: 797,
            clientY: 212,
            radiusX: 2.5,
            radiusY: 2.5,
            rotationAngle: 10,
            force: 1
        };
        evt = new TouchEvent('touchstart', {
            cancelable: true,
            bubbles: true,
            touches: [touchObj],
            targetTouches: [],
            changedTouches: [touchObj],
            shiftKey: true
        });
        expect(View.getEvent(evt))
            .toBeTruthy();
    });
    test('func swipeStart is OK', () => {
        let evt = new MouseEvent('mousedown');
        Object.defineProperty(evt, 'target', {
            value: view.head.element,
            enumerable: true
        });
        let array = [view.head.element.getBoundingClientRect().left, evt.clientX];
        expect(view.swipeStart(evt))
            .toEqual(array);
        evt = new MouseEvent('mousedown');
        Object.defineProperty(evt, 'target', {
            value: view.head2.element,
            enumerable: true
        });
        array = [view.head.element.getBoundingClientRect().left, evt.clientX];
        expect(view.swipeStart(evt))
            .toEqual(array);
        view.state.direction = 'vertical';
        array = [view.head.element.getBoundingClientRect().top, evt.clientY];
        expect(view.swipeStart(evt))
            .toEqual(array);
    });
    test('func swipeAction is OK', () => {
        let evt = new MouseEvent('mousedown');
        Object.defineProperty(evt, 'target', {
            value: view.head.element,
            enumerable: true
        });
        let array = [view.head.element.getBoundingClientRect().left, evt.clientX];
        expect(view.swipeAction(evt, array, 'valueTo'))
            .toEqual(array);
        view.state.direction = 'vertical';
        array = [view.head.element.getBoundingClientRect().top, evt.clientY];
        expect(view.swipeAction(evt, array, 'valueTo'))
            .toEqual(array);
    });
    test('func swipeHandler is OK', () => {
        let evt = new MouseEvent('mousedown');
        let array = [view.head.element.getBoundingClientRect().left, evt.clientX];
        expect(view.swipeHandler(evt))
            .toEqual(array);
    });
    test('func swipeEnd is OK', () => {
        expect(view.swipeEnd())
            .toBeTruthy();
    });
    test('func onLineClick is OK', () => {
        let evt = new MouseEvent('mousedown');
        let array = [view.line.getWidth, view.line.getLeftCoordinate, evt.clientX];
        expect(view.onLineClick(evt))
            .toEqual(array);
        view.state.direction = 'vertical';
        array = [view.line.getHeight, view.line.getTopCoordinate, evt.clientY];
        expect(view.onLineClick(evt))
            .toEqual(array);
    });
    test('func lineClickData is OK', () => {
        let evt = new MouseEvent('mousedown');
        let array = [view.line.getWidth, view.line.getLeftCoordinate, evt.clientX];
        expect(view.lineClickData(evt))
            .toEqual(array);
        view.state.direction = 'vertical';
        array = [view.line.getHeight, view.line.getTopCoordinate, evt.clientY];
        expect(view.lineClickData(evt))
            .toEqual(array);
    });
    test('func changePosition is OK', () => {
        let data = {
            onlyState: false,
            target: 'valueTo',
            valueN: 0.93
        };
        view.changePosition(data);
        expect(view.head.element.style.left)
            .toBe('93%');
        data = {
            onlyState: false,
            target: 'valueFrom',
            valueN: 0.18
        };
        view.changePosition(data);
        expect(view.head2.element.style.left)
            .toBe('18%');
        data = {
            onlyState: false,
            target: 'valueFrom',
            valueN: undefined
        };
        expect(() => {
            view.changePosition(data);
        })
            .toThrow('Новое значение не определено');
        data = {
            onlyState: false,
            target: 'valueFrom',
            valueN: 0.18
        };
        delete view.head2;
        expect(() => {
            view.changePosition(data);
        })
            .toThrow('Head2 не существует');
    });
    test('func changeMax is OK', () => {
        view.changeMax(50);
        expect(view.state.max)
            .toBe(50);
        view.changeMax(150);
        expect(view.state.max)
            .toBe(150);
        expect(() => {
            view
                .changeMax(-1);
        })
            .toThrow('Максимум не может быть меньше минимума');
    });
    test('func changeMin is OK', () => {
        view.changeMin(50);
        expect(view.state.min)
            .toBe(50);
        view.changeMin(-1);
        expect(view.state.min)
            .toBe(-1);
        expect(() => {
            view
                .changeMin(150);
        })
            .toThrow('Минимум не может быть больше максимума');
    });
    test('func hideBubble is OK', () => {
        view.hideBubble();
        expect(view.state.bubble)
            .toBeFalsy();
    });
    test('func hideBubble is OK', () => {
        view.hideBubble();
        view.showBubble();
        expect(view.state.bubble)
            .toBeTruthy();
    });
    test('func changeOrientation is OK', () => {
        view.changeOrientation('vertical');
        expect(view.state.direction)
            .toBe('vertical');
    });
    test('func changeType is OK', () => {
        view.changeType('double');
        expect(view.state.type)
            .toBe('double');
    });
    test('func changeStep is OK', () => {
        view.changeStep = 2;
        expect(view.state.step)
            .toBe(2);
        expect(() => {
            view.changeStep = 1000;
        })
            .toThrow('Шаг не может быть больше разницы максимума и минимума');
    });
    test('func updateState is OK', () => {
        let data = {
            target: 'min',
            valueN: 10,
            onlyState: true
        };
        view.updateState(data);
        expect(view.state.min)
            .toBe(10);
        data = {
            target: 'bubble',
            valueB: false,
            onlyState: true
        };
        view.updateState(data);
        expect(view.state.bubble)
            .toBe(false);
        data = {
            target: 'direction',
            valueS: 'vertical',
            onlyState: true
        };
        view.updateState(data);
        expect(view.state.direction)
            .toBe('vertical');
        data = {
            onlyState: false,
            target: 'direction',
            valueS: 'horizontal'
        };
        view.updateState(data);
        expect(view.state.direction)
            .toBe('vertical');
    });
});
