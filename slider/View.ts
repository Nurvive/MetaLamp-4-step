import {Observer} from "./observer";
import viewHead from './subView/viewHead';

export class View extends Observer {
    elem: HTMLElement;
    state: any
    head: viewHead

    constructor(elem: HTMLElement) {
        super()
        this.elem = elem
        this.state = {};
    }

    init(options) {
        Object.assign(this.state, options);
        this.render();
        this.head = new viewHead(this.elem, this.state.direction, this.state.type,this.state.bubble);
        this.head.init(this.state.min);
        this.setup();
    }

    protected getTemplate(): string {
        return `
    <ul class="slider__steps">
        <li class="slider__step">0</li>
        <li class="slider__step">25</li>
        <li class="slider__step">50</li>
        <li class="slider__step">75</li>
        <li class="slider__step">100</li>
    </ul>
        `
    }

    protected render(): void {
        this.elem.innerHTML = this.getTemplate();
    }

    protected setup(): void {
        this.head.element.addEventListener('mousedown', this.swipeStart)
        this.head.element.addEventListener('touchstart', this.swipeStart);
    }

    private isInside(pos: number): boolean {
        return pos >= 0 && pos < this.elem.offsetWidth;
    }

    getEvent(event: any): MouseEvent {
        return (event.type.search('touch') !== -1) ? event.touches[0] : event;
    }

    swipeStart = (): void => {
        if(this.state.bubble)
            this.head.showBubble();
        document.addEventListener('touchmove', this.swipeAction, {passive: false});
        document.addEventListener('mousemove', this.swipeAction);
        document.addEventListener('touchend', this.swipeEnd);
        document.addEventListener('mouseup', this.swipeEnd);
    }

    swipeAction = (event: Event): void => {
        event.preventDefault()
        const evt = this.getEvent(event);
        let xPos = evt.clientX - this.elem.offsetLeft;
        if (this.isInside(xPos)) {
            this.notify({xPos: xPos, elemWidth: this.elem.getBoundingClientRect().width})
        }
    }
    swipeEnd = (): void => {
        document.removeEventListener('touchmove', this.swipeAction,);
        document.removeEventListener('mousemove', this.swipeAction);
        document.removeEventListener('touchend', this.swipeEnd);
        document.removeEventListener('mouseup', this.swipeEnd);
        if(this.state.bubble)
            this.head.hideBubble();
    }

    changePosition(data): void {
        this.head.updateBubble(Math.round(data.position))
        const newPos = (this.elem.getBoundingClientRect().width - this.head.getWidth) / 100 * data.percentage
        this.head.updatePosition(newPos)
    }

}
