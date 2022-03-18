class Scale {
    parent: HTMLElement;

    direction: string;

    element: HTMLElement;

    constructor(parent: HTMLElement, direction: string, min: number, max: number) {
        this.parent = parent;
        this.direction = direction;
        this.element = document.createElement('div');
        this.direction === 'horizontal'
            ? this.element.classList.add('slider__scale')
            : this.element.classList.add('slider__scale', 'slider__scale_vertical');
        this.parent.append(this.element);
        this.init(min, max);
    }

    init(min: number, max: number): void {
        const step = (max - min) / 4;
        for (let i = 0; i <= 100; i += 5) {
            if (i % 25 === 0) {
                if (this.direction === 'horizontal') {
                    this.element.insertAdjacentHTML('beforeend', `<div class='slider__dash' style='left: ${i}%;'></div><div class='slider__scale-number' style='left: ${i}%;'></div>`);
                } else {
                    this.element.insertAdjacentHTML('beforeend', `<div class='slider__dash slider__dash_vertical' style='top: ${i}%;'></div><div class='slider__scale-number slider__scale-number_vertical' style='top: ${i}%;'></div>`);
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
                this.element.insertAdjacentHTML('beforeend', `<div class='slider__dash slider__dash_small' style='left: ${i}%;'></div>`);
            } else {
                this.element.insertAdjacentHTML('beforeend', `<div class='slider__dash slider__dash_small-vertical' style='top: ${i}%;'></div>`);
            }
        }
    }

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