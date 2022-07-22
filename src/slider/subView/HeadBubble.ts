import {HeadType} from '../types/types';

class HeadBubble {
    element: HTMLElement;

    parent: HTMLElement;

    type: HeadType

    constructor(parent: HTMLElement, type: HeadType) {
        this.parent = parent;
        this.type = type;
        this.element = document.createElement('span');
        this.init();
    }

    init(): void {
        this.element.classList.add('slider__head-bubble');
        this.element.setAttribute('data-type', 'bubble');
        if (this.type === 'to') {
            this.element.setAttribute('data-valueTo', 'true');
        } else {
            this.element.setAttribute('data-valueFrom', 'true');
        }
        this.parent.append(this.element);
    }

    update(value: number): void {
        this.element.textContent = String(value);
    }

    onActive(): void {
        this.element.classList.add('slider__head-bubble_isGrabbing');
    }

    offActive(): void {
        this.element.classList.remove('slider__head-bubble_isGrabbing');
    }

    show(): void {
        this.element.classList.add('slider__head-bubble_active');
    }

    hide(): void {
        this.element.classList.remove('slider__head-bubble_active');
    }
}

export default HeadBubble;
