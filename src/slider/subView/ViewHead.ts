import HeadBubble from './HeadBubble';
import {HeadType, ViewHeadCreate} from '../types/types';

class ViewHead {
    parent: HTMLElement;

    direction: string;

    element: HTMLElement;

    bubble: HeadBubble;

    type: HeadType;

    constructor({
        parent,
        direction,
        value,
        bubbleValue,
        type
    }: ViewHeadCreate) {
        this.parent = parent;
        this.direction = direction;
        this.element = document.createElement('div');
        this.type = type;
        this.bubble = new HeadBubble(this.element, this.type);
        this.updatePosition(value);
        this.updateBubble(bubbleValue);
        this.init();
    }

    init(): void {
        this.element.classList.add('slider__head');
        if (this.type === 'to') {
            this.element.setAttribute('data-valueTo', 'true');
        } else {
            this.element.setAttribute('data-valueFrom', 'true');
        }
        this.direction === 'horizontal'
            ? this.element.classList.add('slider__head')
            : this.element.classList.add('slider__head', 'slider__head_vertical');
        this.parent.append(this.element);
        this.element.addEventListener('mousedown', this.handleHeadStart);
        this.element.addEventListener('touchstart', this.handleHeadStart);
    }

    handleHeadStart = (e: MouseEvent | TouchEvent): void => {
        this.onActive();
        const headEvent = new CustomEvent('headStart', {
            detail: {
                data: e
            }
        });
        this.parent.dispatchEvent(headEvent);
    };

    onActive(): void {
        this.element.classList.add('slider__head_active');
        this.bubble.onActive();
    }

    offActive(): void {
        this.element.classList.remove('slider__head_active');
        this.bubble.offActive();
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

    get width(): number {
        return this.element.getBoundingClientRect().width;
    }

    get height(): number {
        return this.element.getBoundingClientRect().height;
    }

    high(): void {
        this.element.classList.add('slider__head_high');
    }

    down(): void {
        this.element.classList.remove('slider__head_high');
    }
}

export default ViewHead;
