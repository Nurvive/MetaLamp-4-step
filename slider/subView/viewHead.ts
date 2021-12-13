import headBubble from "./headBubble";

export default class viewHead {
    parent: HTMLElement
    direction: string
    type: string
    template: string
    element: HTMLElement
    bubble: any

    constructor(parent: HTMLElement, direction: string, type: string, bubble: boolean) {
        this.parent = parent
        this.direction = direction
        this.type = type
        if (bubble) {
            this.bubble = new headBubble()
        }
    }

    init(value: number): void {
        this.template = this.direction === 'horizontal' ?
            `<div class='slider__head'>
            </div>` :
            `<div class='slider__head slider__head_vertical'>
            </div>`;
        this.parent.insertAdjacentHTML('afterbegin', this.template);
        this.element = this.parent.querySelector('.slider__head');
        if (this.bubble) {
            this.element.append(this.bubble)
        }
        this.updatePosition(value);
        this.updateBubble(value);
    }

    updatePosition(newPos: number) {
        if (this.direction === 'horizontal')
            this.element.style.left = newPos * 100 + '%';
        else
            this.element.style.top = newPos * 100 + '%';
    }

    updateBubble(value: number) {
        if (this.bubble)
            this.bubble.innerHTML = String(Math.round(value * 100));
    }

    showBubble() {
        this.bubble.style.display = 'block'
    }

    hideBubble() {
        this.bubble.style.display = 'none'
    }

    get getWidth() {
        return this.element.getBoundingClientRect().width
    }

    get getHeight() {
        return this.element.getBoundingClientRect().height
    }
}
