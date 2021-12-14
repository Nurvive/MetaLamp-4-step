import {Observer} from './observer';
import viewHead from './subView/viewHead';
import Scale from './subView/Scale';
import Line from './subView/Line';

export class View extends Observer {
    elem: HTMLElement;

    state: any;

    head: viewHead;

    scale: Scale;

    line: Line;

    head2: viewHead;

    constructor(elem: HTMLElement) {
        super();
        this.elem = elem;
        this.state = {};
    }

    init(options: object) {
        Object.assign(this.state, options);
        this.line = new Line(this.elem, this.state.direction, this.state.type);
        this.line.init();
        this.scale = new Scale(this.line.element, this.state.direction);
        this.scale.init(this.state.min, this.state.max);
        if (this.state.type === 'double') {
            this.head2 = new viewHead(this.line.element, this.state.direction, this.state.type, this.state.bubble);
            const head2StartPos = this.calcHandleStartPosition(this.state.valueFrom);
            this.head2.init(head2StartPos);
            this.head2.element.setAttribute('data-valueFrom', 'true');
        }
        this.head = new viewHead(this.line.element, this.state.direction, this.state.type, this.state.bubble);
        const headStartPos = this.calcHandleStartPosition(this.state.valueTo);
        this.head.init(headStartPos);
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

        const evt = this.getEvent(e);
        const target = evt.target as Element;
        const updatedHead = target.hasAttribute('data-valueFrom') ? 'valueFrom' : 'valueTo';
        const halfHandleWidth = this.head.getWidth / 2;
        let lineWidth;
        let lineHeight;
        let lineLeftCoordinate;
        let lineTopCoordinate;
        let handleLeftCoordinate;
        let handleTopCoordinate;
        let shift;
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
            const evt = this.getEvent(event);
            let newPosition;
            if (this.state.direction === 'horizontal') {
                newPosition = (evt.clientX - shift - lineLeftCoordinate + halfHandleWidth) / lineWidth;
            } else {
                newPosition = (evt.clientY - shift - lineTopCoordinate + halfHandleWidth) / lineHeight;
            }
            newPosition = newPosition > 1 ? 1 : newPosition;
            newPosition = newPosition < 0 ? 0 : newPosition;
            this.notify({Pos: newPosition, target: updatedHead});
        };
        const swipeEnd = (): void => {
            document.removeEventListener('touchmove', swipeAction);
            document.removeEventListener('mousemove', swipeAction);
            document.removeEventListener('touchend', swipeEnd);
            document.removeEventListener('mouseup', swipeEnd);
            // if (this.state.bubble) {
            //   this.head.hideBubble();
            //   if (this.state.type == 'double') { this.head2.hideBubble(); }
            // }
        };
        document.addEventListener('touchmove', swipeAction, {passive: false});
        document.addEventListener('mousemove', swipeAction);
        document.addEventListener('touchend', swipeEnd);
        document.addEventListener('mouseup', swipeEnd);
    }

    onLineClick(event) {
        const newPositionRelative = this.calcLineClickPositionRelative(event);

        this.notify({
            target: 'value',
            Pos: newPositionRelative,
        });
    }

    changePosition(data) {
        if (data.target === 'valueTo') {
            let position = this.getValueRelative(data.value, this.state.min, this.state.max);
            if (position < 0) {
                position = 0;
            }
            if (position > 1) {
                position = 1;
            }
            this.head.updatePosition(position);
            this.head.updateBubble(position);
            this.line.progressValue(this.head.element, this.head2?.element);
        } else {
            let position = this.getValueRelative(data.value, this.state.min, this.state.max);
            if (position < 0) {
                position = 0;
            }
            if (position > 1) {
                position = 1;
            }
            this.head2.updatePosition(position);
            this.head2.updateBubble(position);
            this.line.progressValue(this.head.element, this.head2?.element);
        }
    }

    getValueRelative(value, min, max) {
        return (value - min) / (max - min);
    }

    calcLineClickPositionRelative(event: Event): number {
        const evt = this.getEvent(event);

        let lineWidth;
        let lineLeftCoordinate;
        let newPositionRelative;
        let lineHeight;
        let
            lineTopCoordinate;
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
}
