import {View} from '../src/slider/View';
/* eslint-disable dot-notation */

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
        onChangeTo: function () {
        },
        onChangeFrom: function () {
        }
    };
    const node = document.createElement('div');
    let view;
    beforeEach(() => {
        view = new View(node, settings);
        view.init();
    });
    test('should be', () => {
        expect(view)
            .toBeDefined();
    });
    test('func setup is OK', () => {
        expect(view['setup'])
            .toBeDefined();
    });
    test('func calcHeadStartPosition is OK', () => {
        expect(view['calcHeadStartPosition'](0))
            .toBe(0);
        expect(view['calcHeadStartPosition'](100))
            .toBe(1);
        view.state.max = 90;
        view.state.min = 5;
        expect(view['calcHeadStartPosition'](50))
            .toBe(0.5294117647058824);
    });
    test('func getEvent is OK', () => {
        let evt = new MouseEvent('mousedown');
        expect(View['getEvent'](evt))
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
        expect(View['getEvent'](evt))
            .toBeTruthy();
    });
    test('func swipeStart is OK', () => {
        let evt = new MouseEvent('mousedown');
        Object.defineProperty(evt, 'target', {
            value: view.head.element,
            enumerable: true
        });
        let customEvt = new CustomEvent('start', {
            detail: {
                data: {
                    data: evt
                }
            }
        });
        let array = [view.head.element.getBoundingClientRect().left, evt.clientX];
        expect(view['handleHeadStart'](customEvt))
            .toEqual(array);
        evt = new MouseEvent('mousedown');
        Object.defineProperty(evt, 'target', {
            value: view.head2.element,
            enumerable: true
        });
        customEvt = new CustomEvent('start', {
            detail: {
                data: {
                    data: evt
                }
            }
        });
        array = [view.head.element.getBoundingClientRect().left, evt.clientX];
        expect(view['handleHeadStart'](customEvt))
            .toEqual(array);
        view.state.direction = 'vertical';
        array = [view.head.element.getBoundingClientRect().top, evt.clientY];
        expect(view['handleHeadStart'](customEvt))
            .toEqual(array);
    });
    test('func swipeAction is OK', () => {
        let evt = new MouseEvent('mousedown');
        Object.defineProperty(evt, 'target', {
            value: view.head.element,
            enumerable: true
        });
        let array = [view.head.element.getBoundingClientRect().left, evt.clientX];
        expect(view['swipeAction'](evt, array, 'valueTo'))
            .toEqual(array);
        view.state.direction = 'vertical';
        array = [view.head.element.getBoundingClientRect().top, evt.clientY];
        expect(view['swipeAction'](evt, array, 'valueTo'))
            .toEqual(array);
    });
    test('func swipeHandler is OK', () => {
        let evt = new MouseEvent('mousedown');
        expect(view['handleSwipe'](evt))
            .toEqual([]);
    });
    test('func swipeEnd is OK', () => {
        expect(view['handleSwipeEnd']())
            .toBeTruthy();
    });
    test('func lineClickData is OK', () => {
        let evt = new MouseEvent('mousedown');
        let customEvt = new CustomEvent('start', {
            detail: {
                data: {
                    event: evt
                }
            }
        });
        let array = [view.line.width, view.line.leftCoordinate, evt.clientX];
        expect(view['scaleClickData'](customEvt))
            .toEqual(array);
        view.state.direction = 'vertical';
        array = [view.line.height, view.line.topCoordinate, evt.clientY];
        expect(view['scaleClickData'](customEvt))
            .toEqual(array);
    });
    test('func changePosition is OK', () => {
        let data = {
            target: 'valueTo',
            valueNumber: 0.93
        };
        view.changePosition(data);
        expect(view.head.element.style.left)
            .toBe('93%');
        data = {
            target: 'valueFrom',
            valueNumber: 0.18
        };
        view.changePosition(data);
        expect(view.head2.element.style.left)
            .toBe('18%');
        data = {
            target: 'valueFrom',
            valueNumber: undefined
        };
        expect(() => {
            view.changePosition(data);
        })
            .toThrow('Новое значение не определено');
        data = {
            target: 'valueFrom',
            valueNumber: 0.18
        };
        delete view.head2;
        expect(() => {
            view.changePosition(data);
        })
            .toThrow('Head2 не существует');
    });
    test('func changeMax is OK', () => {
        let data = {
            target: 'max',
            valueNumber: 50
        };
        view.changeMaxMin(data);
        expect(view.state.max)
            .toBe(50);
        data = {
            target: 'max',
            valueNumber: 150
        };
        view.changeMaxMin(data);
        expect(view.state.max)
            .toBe(150);
        data = {
            target: 'min',
            valueNumber: 50
        };
        view.changeMaxMin(data);
        expect(view.state.min)
            .toBe(50);
        data = {
            target: 'min',
            valueNumber: -1
        };
        view.changeMaxMin(data);
        expect(view.state.min)
            .toBe(-1);
    });
    test('func hideBubble is OK', () => {
        let data = {
            target: 'bubble',
            valueBoolean: false
        };
        view.hideBubble(data);
        expect(view.state.bubble)
            .toBeFalsy();
    });
    test('func showBubble is OK', () => {
        let data = {
            target: 'bubble',
            valueBoolean: false
        };
        view.hideBubble(data);
        data = {
            target: 'bubble',
            valueBoolean: true
        };
        view.showBubble(data);
        expect(view.state.bubble)
            .toBeTruthy();
    });
    test('func changeDirection is OK', () => {
        let data = {
            target: 'direction',
            valueString: 'vertical'
        };
        view.changeDirection(data);
        expect(view.state.direction)
            .toBe('vertical');
    });
    test('func changeType is OK', () => {
        let data = {
            target: 'type',
            valueString: 'double'
        };
        view.changeType(data);
        expect(view.state.type)
            .toBe('double');
    });
    test('func changeStep is OK', () => {
        let data = {
            target: 'step',
            valueNumber: 2
        };
        view.changeStep(data);
        expect(view.state.step)
            .toBe(2);
    });
    test('func updateState is OK', () => {
        let data = {
            target: 'min',
            valueNumber: 10
        };
        view.updateState(data);
        expect(view.state.min)
            .toBe(10);
        data = {
            target: 'bubble',
            valueBoolean: false
        };
        view.updateState(data);
        expect(view.state.bubble)
            .toBe(false);
        data = {
            target: 'direction',
            valueString: 'vertical'
        };
        view.updateState(data);
        expect(view.state.direction)
            .toBe('vertical');
        data = {
            target: 'direction',
            valueString: 'horizontal'
        };
        view.updateState(data);
        expect(view.state.direction)
            .toBe('horizontal');
    });
});
