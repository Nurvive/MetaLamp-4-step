export default class HeadBubble {
    element: HTMLElement

    constructor() {
        this.element = document.createElement('span');
        this.element.classList.add('slider__head-bubble');
        this.element.setAttribute('data-type', 'bubble');
    }
}
