import './slider-template.scss';
import '../../slider/jquery.slider.js';
import {State} from '../../slider/types/types';
import {rootLogger} from 'ts-jest';

class SliderTemplate {
    private readonly element: JQuery;

    private $bubbleButton: JQuery | undefined;

    private $verticalButton: JQuery | undefined;

    private $rangeButton: JQuery | undefined;

    private $stepInput: JQuery | undefined;

    private $toInput: JQuery | undefined;

    private $fromInput: JQuery | undefined;

    private $maxInput: JQuery | undefined;

    private $minInput: JQuery | undefined;

    private slider: JQuery | undefined;

    constructor(element: HTMLElement, settings: State) {
        this.element = $(element);
        this.init(settings);
    }

    init(settings: State): void {
        this.$bubbleButton = $(this.element.find('.js-slider-template__inner-input-bubble'));
        this.$verticalButton = $(this.element.find('.js-slider-template__inner-input-vertical'));
        this.$rangeButton = $(this.element.find('.js-slider-template__inner-input-range'));
        this.$stepInput = $(this.element.find('.js-slider-template__inner-input-step'));
        this.$toInput = $(this.element.find('.js-slider-template__inner-input-to'));
        this.$fromInput = $(this.element.find('.js-slider-template__inner-input-from'));
        this.$maxInput = $(this.element.find('.js-slider-template__inner-input-max'));
        this.$minInput = $(this.element.find('.js-slider-template__inner-input-min'));
        const options = Object.assign(settings, {
            onChangeTo: (value: number) => {
                this.$toInput?.val(value);
            },
            onChangeFrom: (value: number) => {
                this.$fromInput?.val(value);
            }
        });
        this.slider = $(this.element.find('.slider'))
            .Slider(options);
        this.setup();
    }

    setup(): void {
        this.$bubbleButton?.on('click', this.handleBubbleButtonClick);
        this.$verticalButton?.on('click', this.handleVerticalButtonClick);
        this.$rangeButton?.on('click', this.handleRangeButtonClick);
        if (!this.$rangeButton?.is(':checked')) {
            this.$fromInput?.parent()
                .addClass('slider-template__label_hide');
        }
        this.$stepInput?.on('change', this.handleStepInputChange);
        this.$stepInput?.val(String(this.slider?.Slider('getStep')));
        this.$toInput?.on('change', this.handleToInputChange);
        this.$toInput?.val(String(this.slider?.Slider('getValueTo')));
        this.$fromInput?.on('change', this.handleFromInputChange);
        this.$fromInput?.val(String(this.slider?.Slider('getValueFrom')));
        this.$maxInput?.on('change', this.handleMaxInputChange);
        this.$maxInput?.val(String(this.slider?.Slider('getMax')));
        this.$minInput?.on('change', this.handleMinInputChange);
        this.$minInput?.val(String(this.slider?.Slider('getMin')));
    }

    handleBubbleButtonClick = (e: JQuery.ClickEvent): void => {
        e.target.checked ? this.slider?.Slider('showBubble') : this.slider?.Slider('hideBubble');
    };

    handleVerticalButtonClick = (e: JQuery.ClickEvent): void => {
        e.target.checked ? this.slider?.Slider('changeDirection', 'vertical') : this.slider?.Slider('changeDirection', 'horizontal');
    };

    handleRangeButtonClick = (e: JQuery.ClickEvent): void => {
        if (e.target.checked) {
            this.slider?.Slider('changeType', 'double');
            this.$fromInput?.parent()
                .removeClass('slider-template__label_hide');
        } else {
            this.slider?.Slider('changeType', 'single');
            this.$fromInput?.parent()
                .addClass('slider-template__label_hide');
        }
    };

    handleStepInputChange = (e: JQuery.ChangeEvent): void => {
        try {
            this.slider?.Slider('changeStep', parseFloat(e.target.value));
            const step = this.slider?.Slider('getStep');
            this.$toInput?.attr('step', String(step));
            this.$fromInput?.attr('step', String(step));
        } catch (error) {
            e.target.value = this.slider?.Slider('getStep');
        }
    };

    handleToInputChange = (e: JQuery.ChangeEvent): void => {
        this.slider?.Slider('changeTo', parseFloat(e.target.value));
    };

    handleFromInputChange = (e: JQuery.ChangeEvent): void => {
        this.slider?.Slider('changeFrom', parseFloat(e.target.value));
    };

    handleMaxInputChange = (e: JQuery.ChangeEvent): void => {
        try {
            this.slider?.Slider('changeMax', parseFloat(e.target.value));
        } catch (error) {
            e.target.value = this.slider?.Slider('getMax');
        }
    };

    handleMinInputChange = (e: JQuery.ChangeEvent): void => {
        try {
            this.slider?.Slider('changeMin', parseFloat(e.target.value));
        } catch (error) {
            e.target.value = this.slider?.Slider('getMin');
        }
    };
}

export default SliderTemplate;
