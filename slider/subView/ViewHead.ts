import HeadBubble from './HeadBubble';

export default class ViewHead {
    parent: HTMLElement

    direction: string

    type: string

    template: string

    element: HTMLElement

    bubble: any

    constructor(parent: HTMLElement, direction: string, type: string, value: number, bubbleValue: number) {
        this.parent = parent;
        this.direction = direction;
        this.type = type;
        this.bubble = (new HeadBubble()).element;
        this.template = this.direction === 'horizontal'
            ? `<div class='slider__head'>
            </div>`
            : `<div class='slider__head slider__head_vertical'>
            </div>`;
        this.parent.insertAdjacentHTML('afterbegin', this.template);
        this.element = this.parent.querySelector('.slider__head') as HTMLElement;
        if (this.bubble) {
            this.element.append(this.bubble);
        }
        this.updatePosition(value);
        this.updateBubble(bubbleValue);
    }

    removeHead(): void {
        this.element.parentNode!.removeChild(this.element)
    }

    updatePosition(newPos: number): void {
        if (this.direction === 'horizontal') {
            this.element.style.left = `${newPos * 100}%`;
        } else {
            this.element.style.top = `${newPos * 100}%`;
        }
    }

    updateBubble(value: number): void {
        if (this.bubble) {
            this.bubble.innerHTML = String(value);
        }
    }

    showBubble(): void {
        this.bubble.style.display = 'block';
    }

    hideBubble(): void {
        this.bubble.style.display = 'none';
    }

    get getWidth(): number {
        return this.element.getBoundingClientRect().width;
    }

    get getHeight(): number {
        return this.element.getBoundingClientRect().height;
    }
}
