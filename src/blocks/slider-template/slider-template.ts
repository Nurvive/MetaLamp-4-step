import './slider-template.scss';
import '../../slider/jquery.slider.js';
import {State} from '../../slider/types/types';

class SliderTemplate {
    private readonly element: JQuery;

    private $bubbleButton: JQuery;

    private $verticalButton: JQuery;

    private $rangeButton: JQuery;

    private $stepInput: JQuery;

    private $toInput: JQuery;

    private $fromInput: JQuery;

    private $maxInput: JQuery;

    private $minInput: JQuery;

    private slider: any;

    constructor(element: HTMLElement, settings: State) {
        this.element = $(element);
        this.$bubbleButton = $(this.element.find('input[data-type="bubble"]'));
        this.$verticalButton = $(this.element.find('input[data-type="vertical"]'));
        this.$rangeButton = $(this.element.find('input[data-type="range"]'));
        this.$stepInput = $(this.element.find('input[data-type="step"]'));
        this.$toInput = $(this.element.find('input[data-type="to"]'));
        this.$fromInput = $(this.element.find('input[data-type="from"]'));
        this.$maxInput = $(this.element.find('input[data-type="max"]'));
        this.$minInput = $(this.element.find('input[data-type="min"]'));
        const options = Object.assign(settings, {
            onChangeTo: (value: number) => {
                this.$toInput.val(value);
            },
            onChangeFrom: (value: number) => {
                this.$fromInput.val(value);
            }
        });
        this.slider = $(this.element.find('.slider'))
            .Slider(options);
        this.init();
    }

    init(): void {
        this.$bubbleButton.on('click', this.handleBubbleButtonClick);
        this.$verticalButton.on('click', this.handleVerticalButtonClick);
        this.$rangeButton.on('click', this.handleRangeButton);
        this.$stepInput.on('change', this.handleStepInputChange);
        this.$toInput.on('change', this.handleToInputChange);
        this.$fromInput.on('change', this.handleFromInputChange);
        this.$maxInput.on('change', this.handleMaxInputChange);
        this.$minInput.on('change', this.handleMinInputChange);
    }

    handleBubbleButtonClick = (e: JQuery.ClickEvent): void => {
        e.target.checked ? this.slider.Slider('showBubble') : this.slider.Slider('hideBubble');
    }

    handleVerticalButtonClick = (e: JQuery.ClickEvent): void => {
        e.target.checked ? this.slider.Slider('changeOrientation', 'vertical') : this.slider.Slider('changeOrientation', 'horizontal');
    }

    handleRangeButton = (e: JQuery.ClickEvent): void => {
        e.target.checked ? this.slider.Slider('changeType', 'double') : this.slider.Slider('changeType', 'single');
    }

    handleStepInputChange = (e: JQuery.ChangeEvent): void => {
        this.slider.Slider('changeStep', parseFloat(e.target.value));
    }

    handleToInputChange = (e: JQuery.ChangeEvent): void => {
        this.slider.Slider('changeTo', parseFloat(e.target.value));
    }

    handleFromInputChange = (e: JQuery.ChangeEvent): void => {
        this.slider.Slider('changeFrom', parseFloat(e.target.value));
    }

    handleMaxInputChange = (e: JQuery.ChangeEvent): void => {
        this.slider.Slider('changeMax', parseFloat(e.target.value));
    }

    handleMinInputChange = (e: JQuery.ChangeEvent): void => {
        this.slider.Slider('changeMin', parseFloat(e.target.value));
    }
}

export default SliderTemplate;
