import HeadBubble from './HeadBubble';
import {ViewHeadCreate} from '../types/types';

class ViewHead {
    parent: HTMLElement;

    direction: string;

    element: HTMLElement;

    bubble: HeadBubble;

    constructor({
        parent,
        direction,
        value,
        bubbleValue
    }: ViewHeadCreate) {
        this.parent = parent;
        this.direction = direction;
        this.element = document.createElement('div');
        this.bubble = new HeadBubble(this.element);
        this.updatePosition(value);
        this.updateBubble(bubbleValue);
        this.init();
    }

    init(): void {
        this.element.classList.add('slider__head');
        this.direction === 'horizontal'
            ? this.element.classList.add('slider__head')
            : this.element.classList.add('slider__head', 'slider__head_vertical');
        this.parent.append(this.element);
        this.element.addEventListener('mousedown', this.handleHeadStart);
        this.element.addEventListener('touchstart', this.handleHeadStart);
    }

    handleHeadStart = (e: MouseEvent | TouchEvent): void => {
        const headEvent = new CustomEvent('headStart', {
            detail: {
                data: e
            }
        });
        this.parent.dispatchEvent(headEvent);
    };

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

    updateBubble(value: number): void {
        if (this.bubble) {
            this.bubble.update(value);
        }
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
