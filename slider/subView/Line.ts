export default class Line{
    parent: HTMLElement
    direction: string
    template: string
    element: HTMLElement
    constructor(parent: HTMLElement, direction: string) {
        this.parent = parent
        this.direction = direction
    }
    init() {
        this.template = this.direction === 'horizontal' ? `<div class='slider__line'></div>` : `<div class='slider__line slider__line_vertical'></div>`;
        this.parent.insertAdjacentHTML('beforeend', this.template);
        this.element = this.parent.querySelector('.slider__line');
    }
    get getWidth() {
        return this.element.getBoundingClientRect().width;
    }

    get getLeftCoordinate() {
        return this.element.getBoundingClientRect().left;
    }

    get getHeight() {
        return this.element.getBoundingClientRect().height;
    }

    get getTopCoordinate() {
        return this.element.getBoundingClientRect().top;
    }
}
