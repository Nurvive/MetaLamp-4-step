import {Observer} from './Observer';
import ViewHead from './subView/ViewHead';
import Scale from './subView/Scale';
import Line from './subView/Line';
import {
    State, TargetType, ViewEvents
} from './types/types';
import {NotifyData} from './types/types';

class View extends Observer<ViewEvents> {
    private readonly elem: HTMLElement;

    private state: State;

    private head: ViewHead;

    private scale: Scale;

    private line: Line;

    private head2?: ViewHead;

    private handleSwipe: (event: (MouseEvent | TouchEvent)) => Array<number>;

    constructor(elem: HTMLElement, options: State) {
        super();
        this.elem = elem;
        this.handleSwipe = () => [];
        this.state = Object.assign({}, options);
        this.line = new Line({
            parent: this.elem,
            direction: this.state.direction,
            type: this.state.type
        });
        this.scale = new Scale({
            parent: this.line.element,
            direction: this.state.direction,
            min: this.state.min,
            max: this.state.max
        });
        const headStartPos = this.calcHeadStartPosition(this.state.valueTo);
        this.head = new ViewHead({
            parent: this.line.element,
            direction: this.state.direction,
            value: headStartPos,
            bubbleValue: this.state.valueTo,
            type: 'to'
        });
    }

    init(): void {
        if (this.state.type === 'double') {
            const head2StartPos: number = this.calcHeadStartPosition(this.state.valueFrom);
            this.head2 = new ViewHead({
                parent: this.line.element,
                direction: this.state.direction,
                value: head2StartPos,
                bubbleValue: this.state.valueFrom,
                type: 'from'
            });
        }
        if (this.state.bubble) {
            this.head.showBubble();
            if (this.state.type === 'double' && this.head2 !== undefined) {
                this.head2.showBubble();
            }
        }
        this.line.progressValue(this.head.element, this.head2?.element);
        this.changeZIndex();
        this.setup();
    }

    changePosition(data: NotifyData): void {
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
        } else if (data.target === 'valueFrom' && this.head2 !== undefined) {
            this.head2.updatePosition(position);
            this.head2.updateBubble(this.state.valueFrom);
            this.state.onChangeFrom(this.state.valueFrom);
            this.line.progressValue(this.head.element, this.head2.element);
        } else {
            throw new Error('Head2 не существует');
        }
    }

    hideBubble(data: NotifyData): void {
        this.updateState({
            target: data.target,
            valueBoolean: data.valueBoolean
        });
        this.head.hideBubble();
        this.head2?.hideBubble();
    }

    showBubble(data: NotifyData): void {
        this.updateState({
            target: data.target,
            valueBoolean: data.valueBoolean
        });
        this.head.showBubble();
        this.head2?.showBubble();
    }

    changeDirection(data: NotifyData): void {
        this.updateState({
            target: data.target,
            valueString: data.valueString
        });
        this.head.removeHead();
        this.head2?.removeHead();
        this.scale.removeScale();
        this.line.removeLine();
        this.reInit();
    }

    changeType(data: NotifyData): void {
        this.updateState({
            target: data.target,
            valueString: data.valueString
        });
        this.head.removeHead();
        this.head2?.removeHead();
        delete this.head2;
        this.scale.removeScale();
        this.line.removeLine();
        this.reInit();
    }

    changeStep(data: NotifyData): void {
        this.updateState({
            target: data.target,
            valueNumber: data.valueNumber
        });
    }

    changeMaxMin(data: NotifyData): void {
        this.updateState({
            target: data.target,
            valueNumber: data.valueNumber
        });
        this.head.removeHead();
        this.head2?.removeHead();
        this.scale.removeScale();
        this.line.removeLine();
        this.reInit();
    }

    updateState(data: NotifyData): void {
        const target = data.target;
        const value = View.getValueFromData(data);
        this.state = {
            ...this.state,
            [target]: value
        };
    }

    private reInit(): void {
        this.line = new Line({
            parent: this.elem,
            direction: this.state.direction,
            type: this.state.type
        });
        this.scale = new Scale({
            parent: this.line.element,
            direction: this.state.direction,
            min: this.state.min,
            max: this.state.max
        });
        const headStartPos = this.calcHeadStartPosition(this.state.valueTo);
        this.head = new ViewHead({
            parent: this.line.element,
            direction: this.state.direction,
            value: headStartPos,
            bubbleValue: this.state.valueTo,
            type: 'to'
        });
        this.init();
    }

    private setup(): void {
        this.elem.addEventListener('headStart', this.handleHeadStart);
        this.elem.addEventListener('scaleClick', this.handleScaleClick);
        this.elem.addEventListener('lineClick', this.handleLineClick);
    }

    private static getValueFromData(data: NotifyData) {
        let value;
        Object.entries(data)
            .forEach((key) => {
                if (key[0] !== 'target') {
                    value = key[1];
                }
            });
        return value;
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

    private handleHeadStart = (e: CustomEvent): Array<number> => {
        const evt: MouseEvent | Touch = View.getEvent(e.detail.data.data);
        const target = evt.target;
        if (!(target instanceof HTMLElement)) return [];
        const updatedHead: TargetType = target
            .hasAttribute('data-valueFrom') ? 'valueFrom' : 'valueTo';
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
    };

    private swipeAction = (event: MouseEvent | TouchEvent, dataArray: Array<number>,
        updatedHead: TargetType):
        Array<number> => {
        event.preventDefault();
        const evtSwipe: MouseEvent | Touch = View.getEvent(event);
        if (this.state.direction === 'horizontal') {
            dataArray.push(this.line.width);
            dataArray.push(this.line.leftCoordinate);
            dataArray.push(evtSwipe.clientX);
        } else {
            dataArray.push(this.line.height);
            dataArray.push(this.line.topCoordinate);
            dataArray.push(evtSwipe.clientY);
        }
        dataArray.push(this.head.width / 2);
        this.notify('calcPosition', {
            valueArray: dataArray.slice(),
            target: updatedHead
        });
        dataArray.splice(2, dataArray.length - 2);
        return dataArray;
    };

    private handleSwipeEnd = (): boolean => {
        this.onEndWork();
        document.removeEventListener('touchmove', this.handleSwipe);
        document.removeEventListener('mousemove', this.handleSwipe);
        document.removeEventListener('touchend', this.handleSwipeEnd);
        document.removeEventListener('mouseup', this.handleSwipeEnd);
        return true;
    };

    private onEndWork(): void {
        this.head.offActive();
        this.head2?.offActive();
        this.changeZIndex();
    }

    private changeZIndex() {
        const isInCorner = (): boolean => {
            return this.state.valueTo >= (this.state.max - this.state.step * 2);
        };
        if (this.head2 && isInCorner()) {
            this.head2.high();
        } else if (this.head2) {
            this.head2.down();
        }
    }

    private handleScaleClick = (event: CustomEvent): void => {
        const dataArray: number[] = this.scaleClickData(event);
        dataArray.push(event.detail.data.value);
        this.notify('calcPosition', {
            target: 'value',
            valueArray: dataArray
        });
        this.changeZIndex();
    };

    private handleLineClick = (event: CustomEvent): void => {
        const dataArray: number[] = this.scaleClickData(event);
        this.notify('calcPosition', {
            target: 'valueClick',
            valueArray: dataArray
        });
        this.changeZIndex();
    };

    private scaleClickData(event: CustomEvent): Array<number> {
        const evt: MouseEvent | Touch = View.getEvent(event.detail.data.event);
        const dataArray: Array<number> = [];
        if (this.state.direction === 'horizontal') {
            dataArray.push(this.line.width);
            dataArray.push(this.line.leftCoordinate);
            dataArray.push(evt.clientX);
        } else {
            dataArray.push(this.line.height);
            dataArray.push(this.line.topCoordinate);
            dataArray.push(evt.clientY);
        }
        return dataArray;
    }
}

export {View};
