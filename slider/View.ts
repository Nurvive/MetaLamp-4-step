import {Observer} from "./observer";
import viewHead from './subView/viewHead';
import Scale from "./subView/Scale";
import Line from "./subView/Line"

export class View extends Observer {
    elem: HTMLElement;
    state: any
    head: viewHead
    scale: Scale
    line: Line

    constructor(elem: HTMLElement) {
        super()
        this.elem = elem
        this.state = {};
    }

    init(options: object) {
        Object.assign(this.state, options);
        this.line = new Line(this.elem, this.state.direction)
        this.line.init()
        this.scale = new Scale(this.line.element, this.state.direction);
        this.scale.init(this.state.min, this.state.max)
        this.head = new viewHead(this.line.element, this.state.direction, this.state.type, this.state.bubble);
        this.head.init(this.state.min);
        this.setup();
    }

    protected setup(): void {
        this.head.element.addEventListener('mousedown', this.swipeStart)
        this.head.element.addEventListener('touchstart', this.swipeStart);
        this.scale.element.addEventListener('click', this.swipeAction.bind(this))
    }

    private isInsideX(pos: number): boolean {
        return pos >= 0 && pos < this.elem.offsetWidth;
    }

    private isInsideY(pos: number): boolean {
        return pos >= 0 && pos < this.elem.offsetHeight;
    }

    getEvent(event: any): MouseEvent {
        return (event.type.search('touch') !== -1) ? event.touches[0] : event;
    }


    swipeStart = (): void => {
        if (this.state.bubble)
            this.head.showBubble();
        document.addEventListener('touchmove', this.swipeAction, {passive: false});
        document.addEventListener('mousemove', this.swipeAction);
        document.addEventListener('touchend', this.swipeEnd);
        document.addEventListener('mouseup', this.swipeEnd);
    }

    swipeAction = (event: Event): void => {
        event.preventDefault()
        const evt = this.getEvent(event);
        if (this.state.direction === 'horizontal') {
            const xPos = evt.clientX - this.elem.offsetLeft;
            if (this.isInsideX(xPos)) {
                this.notify({Pos: xPos, elemSize: this.elem.getBoundingClientRect().width})
            }
        } else {
            const yPos = evt.clientY - this.elem.offsetTop;
            if (this.isInsideY(yPos)) {
                this.notify({Pos: yPos, elemSize: this.elem.getBoundingClientRect().height})
            }
        }
    }
    swipeEnd = (): void => {
        document.removeEventListener('touchmove', this.swipeAction,);
        document.removeEventListener('mousemove', this.swipeAction);
        document.removeEventListener('touchend', this.swipeEnd);
        document.removeEventListener('mouseup', this.swipeEnd);
        if (this.state.bubble)
            this.head.hideBubble();
    }

    changePosition(data): void {
        this.head.updateBubble(Math.round(data.position))
        let newPos;
        if (this.state.direction === 'horizontal')
            newPos = (this.elem.getBoundingClientRect().width - this.head.getWidth) / 100 * data.percentage
        else
            newPos = (this.elem.getBoundingClientRect().height - this.head.getHeight) / 100 * data.percentage
        this.head.updatePosition(newPos)
    }

}
