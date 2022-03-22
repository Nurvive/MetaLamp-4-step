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
        this.init();
    }

    init(): void {
        if (this.direction === 'horizontal') {
            this.element.classList.add('slider__line');
            this.progressBar.classList.add('slider__line-progress');
        } else {
            this.element.classList.add('slider__line', 'slider__line_vertical');
            this.progressBar.classList.add('slider__line-progress', 'slider__line-progress_vertical');
        }
        this.element.append(this.progressBar);
        this.parent.append(this.element);
        this.element.addEventListener('headStart', this.handleHeadStart);
        this.element.addEventListener('scaleClick', this.handleScaleClick);
    }

    handleHeadStart = (e: CustomEvent): void => {
        const headEvent = new CustomEvent('headStart', {
            detail: {
                data: e.detail.data
            }
        });
        this.parent.dispatchEvent(headEvent);
    };

    handleScaleClick = (e: CustomEvent): void => {
        const headEvent = new CustomEvent('scaleClick', {
            detail: {
                data: e.detail.data
            }
        });
        this.parent.dispatchEvent(headEvent);
    };

    set setType(type: string) {
        this.type = type;
    }

    progressValue(to: HTMLElement, from: HTMLElement | undefined): void {
        if (this.direction === 'horizontal') {
            if (this.type === 'single') {
                this.progressBar.style.width = to.style.left;
            } else if (from !== undefined) {
                this.progressBar.style.width = `${parseInt(to.style.left, 10) - parseInt(from.style.left, 10)}%`;
                this.progressBar.style.left = from.style.left;
            }
        } else if (this.type === 'single') {
            this.progressBar.style.height = to.style.top;
        } else if (from !== undefined) {
            this.progressBar.style.height = `${parseInt(to.style.top, 10) - parseInt(from.style.top, 10)}%`;
            this.progressBar.style.top = from.style.top;
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
