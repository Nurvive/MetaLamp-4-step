import {Observer} from './observer';
import viewHead from './subView/viewHead';
import Scale from './subView/Scale';
import Line from './subView/Line';

interface state {
    min?: number
    max?: number
    position?: number
    step?: number
    direction?: string
    type?: string
    valueFrom?: number
    valueTo?: number
    bubble?: boolean
    onChangeTo?: Function

}

export class View extends Observer {
    elem: HTMLElement;

    state: state;

    head: viewHead;

    scale: Scale;

    line: Line;

    head2: viewHead;

    constructor(elem: HTMLElement) {
        super();
        this.elem = elem;
        this.state = {};
    }

    init(options: object): void {
        Object.assign(this.state, options);
        this.line = new Line(this.elem, this.state.direction, this.state.type);
        this.line.init();
        this.scale = new Scale(this.line.element, this.state.direction);
        this.scale.init(this.state.min, this.state.max);
        if (this.state.type === 'double') {
            this.head2 = new viewHead(this.line.element, this.state.direction, this.state.type, this.state.bubble);
            const head2StartPos: number = this.calcHandleStartPosition(this.state.valueFrom);
            this.head2.init(head2StartPos, this.state.valueFrom);
            this.head2.element.setAttribute('data-valueFrom', 'true');
        }
        this.head = new viewHead(this.line.element, this.state.direction, this.state.type, this.state.bubble);
        const headStartPos = this.calcHandleStartPosition(this.state.valueTo);
        this.head.init(headStartPos, this.state.valueTo);
        if (this.state.bubble) {
            this.head.showBubble();
            if (this.state.type === 'double') {
                this.head2.showBubble();
            }
        }
        this.line.progressValue(this.head.element, this.head2?.element);
        this.setup();
    }

    protected setup(): void {
        if (this.state.type === 'double') {
            this.head2.element.addEventListener('mousedown', this.swipeStart);
            this.head2.element.addEventListener('touchstart', this.swipeStart);
        }
        this.head.element.addEventListener('mousedown', this.swipeStart);
        this.head.element.addEventListener('touchstart', this.swipeStart);
        this.scale.element.addEventListener('click', this.onLineClick.bind(this));
    }


    calcHandleStartPosition(value: number): number {
        return (value - this.state.min) / (this.state.max - this.state.min);
    }

    getEvent(event: any): MouseEvent {
        return (event.type.search('touch') !== -1) ? event.touches[0] : event;
    }

    swipeStart = (e: Event): void => {
        const evt: MouseEvent = this.getEvent(e);
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
        const swipeAction = (event: Event): void => {
            event.preventDefault();
            const evt: MouseEvent = this.getEvent(event);
            let newPosition: number;
            if (this.state.direction === 'horizontal') {
                newPosition = (evt.clientX - shift - lineLeftCoordinate + halfHandleWidth) / lineWidth;
            } else {
                newPosition = (evt.clientY - shift - lineTopCoordinate + halfHandleWidth) / lineHeight;
            }
            newPosition = newPosition > 1 ? 1 : newPosition;
            newPosition = newPosition < 0 ? 0 : newPosition;
            this.notify({value: newPosition, target: updatedHead, onlyState: false});
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

    onLineClick(event): void {
        const newPositionRelative: number = this.calcLineClickPositionRelative(event);

        this.notify({
            target: 'value',
            value: newPositionRelative,
            onlyState: false
        });
    }

    changePosition(data): void {
        if (data.target === 'valueTo') {
            let position: number = this.getValueRelative(data.value, this.state.min, this.state.max);
            if (position < 0) {
                position = 0;
            }
            if (position > 1) {
                position = 1;
            }
            this.head.updatePosition(position);
            this.head.updateBubble(this.state.valueTo);
            this.state.onChangeTo(this.state.valueTo)
            this.line.progressValue(this.head.element, this.head2?.element);
        } else if (data.target === "valueFrom") {
            let position = this.getValueRelative(data.value, this.state.min, this.state.max);
            if (position < 0) {
                position = 0;
            }
            if (position > 1) {
                position = 1;
            }
            this.head2.updatePosition(position);
            this.head2.updateBubble(this.state.valueFrom);
            this.line.progressValue(this.head.element, this.head2?.element);
        }
    }


    getValueRelative(value: number, min: number, max: number): number {
        return (value - min) / (max - min);
    }

    calcLineClickPositionRelative(event: Event): number {
        const evt: MouseEvent = this.getEvent(event);

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
        this.updateState({target: 'bubble', value: false})
        this.head.hideBubble()
        this.head2?.hideBubble()
        this.notify({target: 'bubble', value: false, onlyState: true})
    }

    showBubble(): void {
        this.updateState({target: 'bubble', value: true})
        this.head.showBubble()
        this.head2?.showBubble()
        this.notify({target: 'bubble', value: true, onlyState: true})
    }

    changeOrientation(value: string): void {
        this.updateState({target: 'direction', value: value})
        this.head.removeHead();
        this.head2?.removeHead();
        this.scale.removeScale();
        this.line.removeLine();
        this.init({})
        this.notify({target: 'direction', value: value, onlyState: true})
    }

    changeType(value: string): void {
        this.updateState({target: 'type', value: value})
        this.head.removeHead();
        this.head2?.removeHead();
        this.head2 = null
        this.scale.removeScale();
        this.line.removeLine();
        this.init({})
        this.notify({target: 'type', value: value, onlyState: true})
    }

    set changeStep(value: number) {
        if (value > this.state.max - this.state.min)
            throw "Шаг не может быть больше разницы максимума и минимума"
        this.state.step = value
    }

    changeMax(value: number): void {
        if (value < this.state.min || value <= this.state.valueFrom) {
            throw "Максимум не может быть меньше минимума"
        }
        this.updateState({target: 'max', value: value})
        this.head.removeHead();
        this.head2?.removeHead();
        this.scale.removeScale();
        this.line.removeLine();
        this.init({})
    }
    changeMin(value: number): void {
        if (value > this.state.max || value >= this.state.valueTo) {
            throw "Минимум не может быть больше максимума"
        }
        this.updateState({target: 'min', value: value})
        this.head.removeHead();
        this.head2?.removeHead();
        this.scale.removeScale();
        this.line.removeLine();
        this.init({})
    }

    updateState(data): void {
        this.state[data.target] = data.value
    }


}
