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

    init(value: number) {
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
        this.updatePosition(0);
        this.updateBubble(value);
    }

    updatePosition(newPos: number) {
        this.element.style.transform = `translate(${newPos}px, 0px)`;
    }

    updateBubble(value: number) {
        if (this.bubble)
            this.bubble.innerHTML = String(value);
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
}
