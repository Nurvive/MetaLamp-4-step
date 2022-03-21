import {Observer} from './Observer';
import ViewHead from './subView/ViewHead';
import Scale from './subView/Scale';
import Line from './subView/Line';
import {State} from './types/types';
import {NotifyData} from './types/types';

class View extends Observer {
    private readonly elem: HTMLElement;

    private readonly state: State;

    head: ViewHead;

    scale: Scale;

    line: Line;

    head2?: ViewHead;

    private handleSwipe: (event: (MouseEvent | TouchEvent)) => Array<number>;

    constructor(elem: HTMLElement, options: State) {
        super();
        this.elem = elem;
        this.handleSwipe = () => [];
        this.state = Object.assign({}, options);
        this.line = new Line(this.elem, this.state.direction, this.state.type);
        this.scale = new Scale(this.line.element,
            this.state.direction, this.state.min, this.state.max);
        const headStartPos = this.calcHeadStartPosition(this.state.valueTo);
        this.head = new ViewHead(this.line.element,
            this.state.direction, headStartPos, this.state.valueTo);
    }

    init(): void {
        if (this.state.type === 'double') {
            const head2StartPos: number = this.calcHeadStartPosition(this.state.valueFrom);
            this.head2 = new ViewHead(this.line.element,
                this.state.direction, head2StartPos, this.state.valueFrom);
            this.head2.element.setAttribute('data-valueFrom', 'true');
        }
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

    changePosition(data: NotifyData): void {
        if (data.onlyState) return;
        let position = 0;
        if (data.valueNumber !== undefined) {
            position = data.valueNumber;
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
            valueBoolean: false,
            onlyState: true
        });
        this.head.hideBubble();
        this.head2?.hideBubble();
        this.notify({
            target: 'bubble',
            valueBoolean: false,
            onlyState: true
        });
    }

    showBubble(): void {
        this.updateState({
            target: 'bubble',
            valueBoolean: true,
            onlyState: true
        });
        this.head.showBubble();
        this.head2?.showBubble();
        this.notify({
            target: 'bubble',
            valueBoolean: true,
            onlyState: true
        });
    }

    set changeOrientation(value: string) {
        this.updateState({
            target: 'direction',
            valueString: value,
            onlyState: true
        });
        this.head.removeHead();
        this.head2?.removeHead();
        this.scale.removeScale();
        this.line.removeLine();
        this.reInit();
    }

    set changeType(value: string) {
        this.updateState({
            target: 'type',
            valueString: value,
            onlyState: true
        });
        this.head.removeHead();
        this.head2?.removeHead();
        delete this.head2;
        this.scale.removeScale();
        this.line.removeLine();
        this.reInit();
    }

    set changeStep(value: number) {
        if (value > this.state.max - this.state.min) throw new Error('Шаг не может быть больше разницы максимума и минимума');
        this.state.step = value;
    }

    set changeMax(value: number) {
        if (value < this.state.min) {
            throw new Error('Максимум не может быть меньше минимума');
        }
        this.updateState({
            target: 'max',
            valueNumber: value,
            onlyState: true
        });
        this.head.removeHead();
        this.head2?.removeHead();
        this.scale.removeScale();
        this.line.removeLine();
        this.reInit();
    }

    set changeMin(value: number) {
        if (value > this.state.max || value >= this.state.valueTo) {
            throw new Error('Минимум не может быть больше максимума');
        }
        this.updateState({
            target: 'min',
            valueNumber: value,
            onlyState: true
        });
        this.head.removeHead();
        this.head2?.removeHead();
        this.scale.removeScale();
        this.line.removeLine();
        this.reInit();
    }

    updateState(data: NotifyData): void {
        if (!data.onlyState) return;
        if (typeof this.state[data.target] === 'string') {
            this.state[data.target] = data.valueString;
        } else if (typeof this.state[data.target] === 'number') {
            this.state[data.target] = data.valueNumber;
        } else {
            this.state[data.target] = data.valueBoolean;
        }
    }

    private reInit(): void {
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

    private setup(): void {
        if (this.state.type === 'double') {
            if (this.head2 !== undefined) {
                this.head2.element.addEventListener('mousedown', this.handleHeadStart);
                this.head2.element.addEventListener('touchstart', this.handleHeadStart);
            } else {
                throw new Error('Head2 не существует');
            }
        }
        this.head.element.addEventListener('mousedown', this.handleHeadStart);
        this.head.element.addEventListener('touchstart', this.handleHeadStart);
        this.scale.element.addEventListener('click', this.handleScaleClick);
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

    private handleHeadStart = (e: MouseEvent | TouchEvent): Array<number> => {
        const evt: MouseEvent | Touch = View.getEvent(e);
        // Здесь нужен каст через 'as', так как TS не знает, что target это html объект
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
        this.handleSwipe = (event: MouseEvent | TouchEvent): Array<number> => {
            return this.swipeAction(event, dataArray, updatedHead);
        };
        document.addEventListener('touchmove', this.handleSwipe, {passive: false});
        document.addEventListener('mousemove', this.handleSwipe);
        document.addEventListener('touchend', this.handleSwipeEnd);
        document.addEventListener('mouseup', this.handleSwipeEnd);
        return dataArray;
    }

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
            valueArray: dataArray.slice(),
            target: updatedHead,
            onlyState: false
        });
        dataArray.splice(2, dataArray.length - 2);
        return dataArray;
    };

    private handleSwipeEnd = (): boolean => {
        document.removeEventListener('touchmove', this.handleSwipe);
        document.removeEventListener('mousemove', this.handleSwipe);
        document.removeEventListener('touchend', this.handleSwipeEnd);
        document.removeEventListener('mouseup', this.handleSwipeEnd);
        return true;
    };

    private handleScaleClick = (event: MouseEvent): Array<number> => {
        const dataArray: Array<number> = this.scaleClickData(event);

        this.notify({
            target: 'value',
            valueArray: dataArray.slice(),
            onlyState: false
        });
        return dataArray;
    }

    private scaleClickData(event: MouseEvent | TouchEvent): Array<number> {
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

export {View};
