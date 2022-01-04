import {Observer} from './observer';
import ViewHead from './subView/ViewHead';
import Scale from './subView/Scale';
import Line from './subView/Line';
import {notifyData} from './Model';

interface state {
    min: number
    max: number
    step: number
    direction: string
    type: string
    valueFrom: number
    valueTo: number
    bubble: boolean
    onChangeTo: (value: number) => void
    onChangeFrom: (value: number) => void

    [key: string]: string | number | boolean | undefined | ((value: number) => void)
}

export class View extends Observer {
    elem: HTMLElement;

    state: state;

    head: ViewHead;

    scale: Scale;

    line: Line;

    head2?: ViewHead;

    constructor(elem: HTMLElement) {
        super();
        this.elem = elem;
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
            const head2StartPos: number = this.calcHandleStartPosition(this.state.valueFrom);
            this.head2 = new ViewHead(this.line.element,
                this.state.direction, this.state.type, head2StartPos, this.state.valueFrom);
            this.head2.element.setAttribute('data-valueFrom', 'true');
        }
        const headStartPos = this.calcHandleStartPosition(this.state.valueTo);
        this.head = new ViewHead(this.line.element,
            this.state.direction, this.state.type, headStartPos, this.state.valueTo);
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

    protected setup(): void {
        if (this.state.type === 'double') {
            if (this.head2 !== undefined) {
                this.head2.element.addEventListener('mousedown', this.swipeStart);
                this.head2.element.addEventListener('touchstart', this.swipeStart);
            }
        }
        this.head.element.addEventListener('mousedown', this.swipeStart);
        this.head.element.addEventListener('touchstart', this.swipeStart);
        this.scale.element.addEventListener('click', this.onLineClick.bind(this));
    }

    calcHandleStartPosition(value: number): number {
        return (value - this.state.min) / (this.state.max - this.state.min);
    }

    static getEvent(event: MouseEvent | TouchEvent): Touch | MouseEvent {
        if (event instanceof TouchEvent) {
            return event.touches[0];
        }
        return event;
    }

    swipeStart = (e: MouseEvent | TouchEvent): void => {
        const evt: MouseEvent | Touch = View.getEvent(e);
        const target = evt.target as Element;
        const updatedHead: string = target.hasAttribute('data-valueFrom') ? 'valueFrom' : 'valueTo';
        const halfHandleWidth: number = this.head.getWidth / 2;
        let lineWidth: number;
        let lineHeight: number;
        let lineLeftCoordinate: number;
        let lineTopCoordinate: number;
        let handleLeftCoordinate: number;
        let handleTopCoordinate: number;
        let shift: number;
        if (this.state.direction === 'horizontal') {
            lineWidth = this.line.getWidth;
            lineLeftCoordinate = this.line.getLeftCoordinate;
            handleLeftCoordinate = target.getBoundingClientRect().left;
            shift = evt.clientX - handleLeftCoordinate;
        } else {
            lineHeight = this.line.getHeight;
            lineTopCoordinate = this.line.getTopCoordinate;
            handleTopCoordinate = target.getBoundingClientRect().top;
            shift = evt.clientY - handleTopCoordinate;
        }
        const swipeAction = (event: MouseEvent | TouchEvent): void => {
            if ('preventDefault' in event) {
                event.preventDefault();
            }
            const evtSwipe: MouseEvent | Touch = View.getEvent(event);
            let newPosition: number;
            if (this.state.direction === 'horizontal') {
                newPosition = (evtSwipe.clientX - shift - lineLeftCoordinate + halfHandleWidth)
                    / lineWidth;
            } else {
                newPosition = (evtSwipe.clientY - shift - lineTopCoordinate + halfHandleWidth)
                    / lineHeight;
            }
            newPosition = newPosition > 1 ? 1 : newPosition;
            newPosition = newPosition < 0 ? 0 : newPosition;
            this.notify({valueN: newPosition, target: updatedHead, onlyState: false});
        };
        const swipeEnd = (): void => {
            document.removeEventListener('touchmove', swipeAction);
            document.removeEventListener('mousemove', swipeAction);
            document.removeEventListener('touchend', swipeEnd);
            document.removeEventListener('mouseup', swipeEnd);
        };
        document.addEventListener('touchmove', swipeAction, {passive: false});
        document.addEventListener('mousemove', swipeAction);
        document.addEventListener('touchend', swipeEnd);
        document.addEventListener('mouseup', swipeEnd);
    }

    onLineClick(event: MouseEvent): void {
        const newPositionRelative: number = this.calcLineClickPositionRelative(event);

        this.notify({
            target: 'value',
            valueN: newPositionRelative,
            onlyState: false
        });
    }

    changePosition(data: notifyData): void {
        let position = 0;
        if (data.valueN !== undefined) {
            position = View.getValueRelative(data.valueN, this.state.min, this.state.max);
        }
        if (position < 0) {
            position = 0;
        }
        if (position > 1) {
            position = 1;
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
            }
            this.state.onChangeFrom(this.state.valueFrom);
            this.line.progressValue(this.head.element, this.head2?.element);
        }
    }

    static getValueRelative(value: number, min: number, max: number): number {
        return (value - min) / (max - min);
    }

    calcLineClickPositionRelative(event: MouseEvent | TouchEvent): number {
        const evt: MouseEvent | Touch = View.getEvent(event);

        let lineWidth: number;
        let lineLeftCoordinate: number;
        let newPositionRelative: number;
        let lineHeight: number;
        let lineTopCoordinate: number;
        if (this.state.direction === 'horizontal') {
            lineWidth = this.line.getWidth;
            lineLeftCoordinate = this.line.getLeftCoordinate;
            newPositionRelative = (evt.clientX - lineLeftCoordinate) / lineWidth;
        } else {
            lineHeight = this.line.getHeight;
            lineTopCoordinate = this.line.getTopCoordinate;
            newPositionRelative = (evt.clientY - lineTopCoordinate) / lineHeight;
        }
        newPositionRelative = newPositionRelative > 1 ? 1 : newPositionRelative;
        newPositionRelative = newPositionRelative < 0 ? 0 : newPositionRelative;
        return newPositionRelative;
    }

    hideBubble(): void {
        this.updateState({target: 'bubble', valueB: false});
        this.head.hideBubble();
        this.head2?.hideBubble();
        this.notify({target: 'bubble', valueB: false, onlyState: true});
    }

    showBubble(): void {
        this.updateState({target: 'bubble', valueB: true});
        this.head.showBubble();
        this.head2?.showBubble();
        this.notify({target: 'bubble', valueB: true, onlyState: true});
    }

    changeOrientation(value: string): void {
        this.updateState({target: 'direction', valueS: value});
        this.head.removeHead();
        this.head2?.removeHead();
        this.scale.removeScale();
        this.line.removeLine();
        this.init({});
        this.notify({target: 'direction', valueS: value, onlyState: true});
    }

    changeType(value: string): void {
        this.updateState({target: 'type', valueS: value});
        this.head.removeHead();
        this.head2?.removeHead();
        delete this.head2;
        this.scale.removeScale();
        this.line.removeLine();
        this.init({});
        this.notify({target: 'type', valueS: value, onlyState: true});
    }

    set changeStep(value: number) {
        if (value > this.state.max - this.state.min) throw new Error('Шаг не может быть больше разницы максимума и минимума');
        this.state.step = value;
    }

    changeMax(value: number): void {
        if (value < this.state.min || value <= this.state.valueFrom) {
            throw new Error('Максимум не может быть меньше минимума');
        }
        this.updateState({target: 'max', valueN: value});
        this.head.removeHead();
        this.head2?.removeHead();
        this.scale.removeScale();
        this.line.removeLine();
        this.init({});
    }

    changeMin(value: number): void {
        if (value > this.state.max || value >= this.state.valueTo) {
            throw new Error('Минимум не может быть больше максимума');
        }
        this.updateState({target: 'min', valueN: value});
        this.head.removeHead();
        this.head2?.removeHead();
        this.scale.removeScale();
        this.line.removeLine();
        this.init({});
    }

    updateState(data: notifyData): void {
        if (typeof this.state[data.target] === 'string') {
            this.state[data.target] = data.valueS;
        } else if (typeof this.state[data.target] === 'number') {
            this.state[data.target] = data.valueN;
        } else {
            this.state[data.target] = data.valueB;
        }
    }
}
