class Line {
    parent: HTMLElement;

    direction: string;

    element: HTMLElement;

    progressBar: HTMLElement;

    type: string;

    constructor(parent: HTMLElement, direction: string, type: string) {
        this.parent = parent;
        this.direction = direction;
        this.type = type;
        this.element = document.createElement('div');
        this.progressBar = document.createElement('span');
        if (this.direction === 'horizontal') {
            this.element.classList.add('slider__line');
            this.progressBar.classList.add('slider__line-progress');
        } else {
            this.element.classList.add('slider__line', 'slider__line_vertical');
            this.progressBar.classList.add('slider__line-progress', 'slider__line-progress_vertical');
        }
        this.element.append(this.progressBar);
        this.parent.append(this.element);
    }

    set setType(type: string) {
        this.type = type;
    }

    progressValue(To: HTMLElement, From: HTMLElement | undefined): void {
        if (this.direction === 'horizontal') {
            if (this.type === 'single') {
                this.progressBar.style.width = To.style.left;
            } else if (From !== undefined) {
                this.progressBar.style.width = `${parseInt(To.style.left, 10) - parseInt(From.style.left, 10)}%`;
                this.progressBar.style.left = From.style.left;
            }
        } else if (this.type === 'single') {
            this.progressBar.style.height = To.style.top;
        } else if (From !== undefined) {
            this.progressBar.style.height = `${parseInt(To.style.top, 10) - parseInt(From.style.top, 10)}%`;
            this.progressBar.style.top = From.style.top;
        }
    }

    removeLine(): void {
        this.element.remove();
    }

    get getWidth(): number {
        return this.element.getBoundingClientRect().width;
    }

    get getLeftCoordinate(): number {
        return this.element.getBoundingClientRect().left;
    }

    get getHeight(): number {
        return this.element.getBoundingClientRect().height;
    }

    get getTopCoordinate(): number {
        return this.element.getBoundingClientRect().top;
    }
}

export default Line;
