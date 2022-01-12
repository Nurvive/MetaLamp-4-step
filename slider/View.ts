import {Observer} from './Observer';
import ViewHead from './subView/ViewHead';
import Scale from './subView/Scale';
import Line from './subView/Line';
import {notifyData} from './Model';

interface state {
    min: number;
    max: number;
    step: number;
    direction: string;
    type: string;
    valueFrom: number;
    valueTo: number;
    bubble: boolean;
    onChangeTo: (value: number) => void;
    onChangeFrom: (value: number) => void;

    [key: string]: string | number | boolean | undefined | ((value: number) => void);
}

export class View extends Observer {
    elem: HTMLElement;

    state: state;

    head: ViewHead;

    scale: Scale;

    line: Line;

    head2?: ViewHead;

    swipeHandler: (event: (MouseEvent | TouchEvent)) => Array<number>;

    constructor(elem: HTMLElement) {
        super();
        this.elem = elem;
        this.swipeHandler = () => [];
        this.state = {
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
        this.head = null as unknown as ViewHead;
        this.scale = null as unknown as Scale;
        this.line = null as unknown as Line;
    }

    init(options: Record<string, unknown>): void {
        Object.assign(this.state, options);
        this.line = new Line(this.elem, this.state.direction, this.state.type);
        this.scale = new Scale(this.line.element,
            this.state.direction, this.state.min, this.state.max);
        if (this.state.type === 'double') {
            const head2StartPos: number = this.calcHeadStartPosition(this.state.valueFrom);
            this.head2 = new ViewHead(this.line.element,
                this.state.direction, head2StartPos, this.state.valueFrom);
            this.head2.element.setAttribute('data-valueFrom', 'true');
        }
        const headStartPos = this.calcHeadStartPosition(this.state.valueTo);
        this.head = new ViewHead(this.line.element,
            this.state.direction, headStartPos, this.state.valueTo);
        if (this.state.bubble) {
            this.head.showBubble();
            if (this.state.type === 'double') {
                if (this.head2 !== undefined) {
                    this.head2.showBubble();
                }
            }
        }
        this.line.progressValue(this.head.element, this.head2?.element);
        this.setup();
    }

    changePosition(data: notifyData): void {
        if (data.onlyState) return;
        let position = 0;
        if (data.valueN !== undefined) {
            position = data.valueN;
        } else {
            throw new Error('Новое значение не определено');
        }
        if (data.target === 'valueTo') {
            this.head.updatePosition(position);
            this.head.updateBubble(this.state.valueTo);
            this.state.onChangeTo(this.state.valueTo);
            this.line.progressValue(this.head.element, this.head2?.element);
        } else if (data.target === 'valueFrom') {
            if (this.head2 !== undefined) {
                this.head2.updatePosition(position);
                this.head2.updateBubble(this.state.valueFrom);
                this.state.onChangeFrom(this.state.valueFrom);
                this.line.progressValue(this.head.element, this.head2.element);
            } else {
                throw new Error('Head2 не существует');
            }
        }
    }

    hideBubble(): void {
        this.updateState({
            target: 'bubble',
            valueB: false,
            onlyState: true
        });
        this.head.hideBubble();
        this.head2?.hideBubble();
        this.notify({
            target: 'bubble',
            valueB: false,
            onlyState: true
        });
    }

    showBubble(): void {
        this.updateState({
            target: 'bubble',
            valueB: true,
            onlyState: true
        });
        this.head.showBubble();
        this.head2?.showBubble();
        this.notify({
            target: 'bubble',
            valueB: true,
            onlyState: true
        });
    }

    set changeOrientation(value: string) {
        this.updateState({
            target: 'direction',
            valueS: value,
            onlyState: true
        });
        this.head.removeHead();
        this.head2?.removeHead();
        this.scale.removeScale();
        this.line.removeLine();
        this.init({});
        this.notify({
            target: 'direction',
            valueS: value,
            onlyState: true
        });
    }

    set changeType(value: string) {
        this.updateState({
            target: 'type',
            valueS: value,
            onlyState: true
        });
        this.head.removeHead();
        this.head2?.removeHead();
        delete this.head2;
        this.scale.removeScale();
        this.line.removeLine();
        this.init({});
        this.notify({
            target: 'type',
            valueS: value,
            onlyState: true
        });
    }

    set changeStep(value: number) {
        if (value > this.state.max - this.state.min) throw new Error('Шаг не может быть больше разницы максимума и минимума');
        this.state.step = value;
    }

    set changeMax(value: number) {
        if (value < this.state.min || value <= this.state.valueFrom) {
            throw new Error('Максимум не может быть меньше минимума');
        }
        this.updateState({
            target: 'max',
            valueN: value,
            onlyState: true
        });
        this.head.removeHead();
        this.head2?.removeHead();
        this.scale.removeScale();
        this.line.removeLine();
        this.init({});
    }

    set changeMin(value: number) {
        if (value > this.state.max || value >= this.state.valueTo) {
            throw new Error('Минимум не может быть больше максимума');
        }
        this.updateState({
            target: 'min',
            valueN: value,
            onlyState: true
        });
        this.head.removeHead();
        this.head2?.removeHead();
        this.scale.removeScale();
        this.line.removeLine();
        this.init({});
    }

    updateState(data: notifyData): void {
        if (!data.onlyState) return;
        if (typeof this.state[data.target] === 'string') {
            this.state[data.target] = data.valueS;
        } else if (typeof this.state[data.target] === 'number') {
            this.state[data.target] = data.valueN;
        } else {
            this.state[data.target] = data.valueB;
        }
    }

    private setup(): void {
        if (this.state.type === 'double') {
            if (this.head2 !== undefined) {
                this.head2.element.addEventListener('mousedown', this.swipeStart);
                this.head2.element.addEventListener('touchstart', this.swipeStart);
            } else {
                throw new Error('Head2 не существует');
            }
        }
        this.head.element.addEventListener('mousedown', this.swipeStart);
        this.head.element.addEventListener('touchstart', this.swipeStart);
        this.scale.element.addEventListener('click', this.onLineClick.bind(this));
    }

    private calcHeadStartPosition(value: number): number {
        return (value - this.state.min) / (this.state.max - this.state.min);
    }

    private static getEvent(event: MouseEvent | TouchEvent): Touch | MouseEvent {
        if (event instanceof TouchEvent) {
            return event.touches[0];
        }
        return event;
    }

    private swipeStart = (e: MouseEvent | TouchEvent): Array<number> => {
        const evt: MouseEvent | Touch = View.getEvent(e);
        const target = evt.target as Element;
        const updatedHead: string = target.hasAttribute('data-valueFrom') ? 'valueFrom' : 'valueTo';
        const dataArray: Array<number> = [];
        if (this.state.direction === 'horizontal') {
            dataArray.push(target.getBoundingClientRect().left);
            dataArray.push(evt.clientX);
        } else {
            dataArray.push(target.getBoundingClientRect().top);
            dataArray.push(evt.clientY);
        }
        this.swipeHandler = (event: MouseEvent | TouchEvent): Array<number> => {
            return this.swipeAction(event, dataArray, updatedHead);
        };
        document.addEventListener('touchmove', this.swipeHandler, {passive: false});
        document.addEventListener('mousemove', this.swipeHandler);
        document.addEventListener('touchend', this.swipeEnd);
        document.addEventListener('mouseup', this.swipeEnd);
        return dataArray;
    };

    private swipeAction = (event: MouseEvent | TouchEvent, dataArray: Array<number>,
        updatedHead: string):
        Array<number> => {
        event.preventDefault();
        const evtSwipe: MouseEvent | Touch = View.getEvent(event);
        if (this.state.direction === 'horizontal') {
            dataArray.push(this.line.getWidth);
            dataArray.push(this.line.getLeftCoordinate);
            dataArray.push(evtSwipe.clientX);
        } else {
            dataArray.push(this.line.getHeight);
            dataArray.push(this.line.getTopCoordinate);
            dataArray.push(evtSwipe.clientY);
        }
        dataArray.push(this.head.getWidth / 2);
        this.notify({
            valueArr: dataArray.slice(),
            target: updatedHead,
            onlyState: false
        });
        dataArray.splice(2, dataArray.length - 2);
        return dataArray;
    };

    private swipeEnd = (): boolean => {
        document.removeEventListener('touchmove', this.swipeHandler);
        document.removeEventListener('mousemove', this.swipeHandler);
        document.removeEventListener('touchend', this.swipeEnd);
        document.removeEventListener('mouseup', this.swipeEnd);
        return true;
    };

    private onLineClick(event: MouseEvent): Array<number> {
        const dataArray: Array<number> = this.lineClickData(event);

        this.notify({
            target: 'value',
            valueArr: dataArray.slice(),
            onlyState: false
        });
        return dataArray;
    }

    private lineClickData(event: MouseEvent | TouchEvent): Array<number> {
        const evt: MouseEvent | Touch = View.getEvent(event);
        const dataArray: Array<number> = [];
        if (this.state.direction === 'horizontal') {
            dataArray.push(this.line.getWidth);
            dataArray.push(this.line.getLeftCoordinate);
            dataArray.push(evt.clientX);
        } else {
            dataArray.push(this.line.getHeight);
            dataArray.push(this.line.getTopCoordinate);
            dataArray.push(evt.clientY);
        }
        return dataArray;
    }
}
