import HeadBubble from './HeadBubble';

class ViewHead {
    parent: HTMLElement;

    direction: string;

    element: HTMLElement;

    bubble: HeadBubble;

    constructor(parent: HTMLElement, direction: string,
        value: number, bubbleValue: number) {
        this.parent = parent;
        this.direction = direction;
        this.element = document.createElement('div');
        this.element.classList.add('slider__head');
        this.direction === 'horizontal'
            ? this.element.classList.add('slider__head')
            : this.element.classList.add('slider__head', 'slider__head_vertical');
        this.bubble = new HeadBubble(this.element);
        this.parent.append(this.element);
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
            this.bubble.update(value);
            return true;
        }
        return false;
    }

    showBubble(): void {
        this.bubble.show();
    }

    hideBubble(): void {
        this.bubble.hide();
    }

    get getWidth(): number {
        return this.element.getBoundingClientRect().width;
    }

    get getHeight(): number {
        return this.element.getBoundingClientRect().height;
    }
}

export default ViewHead;
