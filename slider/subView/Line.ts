export default class Line {
    parent: HTMLElement
    direction: string
    template: string
    element: HTMLElement
    progressBar: HTMLElement
    type: string

    constructor(parent: HTMLElement, direction: string, type: string) {
        this.parent = parent
        this.direction = direction
        this.type = type
    }

    init(): void {
        this.template = this.direction === 'horizontal' ? `<div class='slider__line'><span class="slider__line-progress"></span></div>` : `<div class='slider__line slider__line_vertical'><span class="slider__line-progress slider__line-progress_vertical"></span></div>`;
        this.parent.insertAdjacentHTML('beforeend', this.template);
        this.element = this.parent.querySelector('.slider__line');
        this.progressBar = this.element.querySelector('.slider__line-progress');
    }

    progressValue(To: HTMLElement, From: HTMLElement): void {
        if (this.direction === 'horizontal') {
            if (this.type == 'single') {
                this.progressBar.style.width = To.style.left;
            } else {
                this.progressBar.style.width = parseInt(To.style.left) - parseInt(From.style.left) + '%';
                this.progressBar.style.left = From.style.left;
            }
        } else {
            if (this.type == 'single') {
                this.progressBar.style.height = To.style.top;
            } else {
                this.progressBar.style.height = parseInt(To.style.top) - parseInt(From.style.top) + '%';
                this.progressBar.style.top = From.style.top;
            }
        }
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
