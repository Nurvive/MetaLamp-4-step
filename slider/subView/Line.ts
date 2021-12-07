export default class Line {
    parent: HTMLElement
    direction: string
    template: string
    element: HTMLElement
    progressBar: HTMLElement

    constructor(parent: HTMLElement, direction: string) {
        this.parent = parent
        this.direction = direction
    }

    init(): void {
        this.template = this.direction === 'horizontal' ? `<div class='slider__line'><span class="slider__line-progress"></span></div>` : `<div class='slider__line slider__line_vertical'><span class="slider__line-progress slider__line-progress_vertical"></span></div>`;
        this.parent.insertAdjacentHTML('beforeend', this.template);
        this.element = this.parent.querySelector('.slider__line');
        this.progressBar = this.element.querySelector('.slider__line-progress');
    }

    progressValue(value: number): void {
        if (this.direction === 'horizontal')
            this.progressBar.style.width = String(value) + "px";
        else
            this.progressBar.style.height = String(value) + "px";

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
