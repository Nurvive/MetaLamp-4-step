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
        for (let i = 0; i <= 100; i += 25) {
            const dashValue = min + (i / 25) * step;
            const dash = document.createElement('div');
            dash.classList.add('slider__dash');
            const scaleNumber = document.createElement('div');
            scaleNumber.classList.add('slider__scale-number');
            scaleNumber.dataset.value = String(dashValue);
            scaleNumber.addEventListener('click', this.handleScaleClick);
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
                number.innerHTML = Number.isInteger(dashValue)
                    ? String(dashValue)
                    : dashValue.toFixed(2);
            }
        }
    }

    handleScaleClick = (e: MouseEvent | TouchEvent): void => {
        const node = e.target as HTMLElement;
        const headEvent = new CustomEvent('scaleClick', {
            detail: {
                event: e,
                value: Number(node.dataset.value)
            }
        });
        this.parent.dispatchEvent(headEvent);
    };

    removeScale(): void {
        this.element.remove();
    }

    get width(): number {
        return this.element.getBoundingClientRect().width;
    }

    get leftCoordinate(): number {
        return this.element.getBoundingClientRect().left;
    }

    get height(): number {
        return this.element.getBoundingClientRect().height;
    }

    get topCoordinate(): number {
        return this.element.getBoundingClientRect().top;
    }
}

export default Scale;
