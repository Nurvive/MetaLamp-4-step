import {ScaleCreate} from '../types/types';

class Scale {
    parent: HTMLElement;

    direction: string;

    element: HTMLElement;

    constructor({
        parent,
        direction,
        min,
        max
    }: ScaleCreate) {
        this.parent = parent;
        this.direction = direction;
        this.element = document.createElement('div');
        this.init(min, max);
    }

    init(min: number, max: number): void {
        this.direction === 'horizontal'
            ? this.element.classList.add('slider__scale')
            : this.element.classList.add('slider__scale', 'slider__scale_vertical');
        this.parent.append(this.element);
        const step = (max - min) / 4;
        for (let i = 0; i <= 100; i += 5) {
            const dash = document.createElement('div');
            dash.classList.add('slider__dash');
            if (i % 25 === 0) {
                const scaleNumber = document.createElement('div');
                scaleNumber.classList.add('slider__scale-number');
                if (this.direction === 'horizontal') {
                    dash.style.left = `${i}%`;
                    scaleNumber.style.left = `${i}%`;
                    dash.append(scaleNumber);
                    this.element.append(dash);
                } else {
                    dash.style.top = `${i}%`;
                    dash.classList.add('slider__dash_vertical');
                    scaleNumber.style.top = `${i}%`;
                    scaleNumber.classList.add('slider__scale-number_vertical');
                    dash.append(scaleNumber);
                    this.element.append(dash);
                }
                const numbers = this.element.querySelectorAll('.slider__scale-number');
                const number = numbers[numbers.length - 1];
                if (i === 0) {
                    number.innerHTML = String(min);
                } else {
                    const dashValue = min + (i / 25) * step;
                    number.innerHTML = Number.isInteger(dashValue)
                        ? String(dashValue)
                        : dashValue.toFixed(2);
                }
            } else if (this.direction === 'horizontal') {
                dash.classList.add('slider__dash_small');
                dash.style.left = `${i}%`;
                this.element.append(dash);
            } else {
                dash.classList.add('slider__dash_small-vertical');
                dash.style.top = `${i}%`;
                this.element.append(dash);
            }
        }
        this.element.addEventListener('click', this.handleScaleClick);
    }

    handleScaleClick = (e: MouseEvent | TouchEvent): void => {
        const headEvent = new CustomEvent('scaleClick', {
            detail: {
                data: e
            }
        });
        this.parent.dispatchEvent(headEvent);
    };

    removeScale(): void {
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

export default Scale;
