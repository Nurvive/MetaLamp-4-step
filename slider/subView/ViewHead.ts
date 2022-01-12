import HeadBubble from './HeadBubble';

export default class ViewHead {
    parent: HTMLElement;

    direction: string;

    template: string;

    element: HTMLElement;

    bubble: HTMLElement;

    constructor(parent: HTMLElement, direction: string,
        value: number, bubbleValue: number) {
        this.parent = parent;
        this.direction = direction;
        this.bubble = (new HeadBubble()).element;
        this.template = this.direction === 'horizontal'
            ? `<div class='slider__head'>
            </div>`
            : `<div class='slider__head slider__head_vertical'>
            </div>`;
        this.parent.insertAdjacentHTML('afterbegin', this.template);
        // Здесь приведение через "as" оправдано, так как элемент точно создается строчкой выше
        this.element = this.parent.querySelector('.slider__head') as HTMLElement;
        this.element.append(this.bubble);
        this.updatePosition(value);
        this.updateBubble(bubbleValue);
    }

    removeHead(): boolean {
        this.element.remove();
        return true;
    }

    updatePosition(newPos: number): void {
        if (this.direction === 'horizontal') {
            this.element.style.left = `${newPos * 100}%`;
        } else {
            this.element.style.top = `${newPos * 100}%`;
        }
    }

    updateBubble(value: number): boolean {
        if (this.bubble) {
            this.bubble.innerHTML = String(value);
            return true;
        }
        return false;
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
