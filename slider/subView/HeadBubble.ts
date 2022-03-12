class HeadBubble {
    element: HTMLElement;

    parent: HTMLElement;

    constructor(parent: HTMLElement) {
        this.element = document.createElement('span');
        this.element.classList.add('slider__head-bubble');
        this.element.setAttribute('data-type', 'bubble');
        this.parent = parent;
        this.parent.append(this.element);
    }

    update(value: number): void {
        this.element.textContent = String(value);
    }

    show(): void {
        this.element.classList.add('slider__head-bubble_active');
    }

    hide(): void {
        this.element.classList.remove('slider__head-bubble_active');
    }
}

export default HeadBubble;
