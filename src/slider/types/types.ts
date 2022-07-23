type TargetType =
    'valueTo'
    | 'valueFrom'
    | 'max'
    | 'min'
    | 'direction'
    | 'type'
    | 'bubble'
    | 'value'
    | 'step'
    | 'valueClick';

type DirectionType = 'horizontal' | 'vertical';

type TypeOfSlider = 'single' | 'double';

type HeadType = 'from' | 'to';

type NotifyData = {
    valueNumber?: number;
    valueString?: DirectionType | TypeOfSlider;
    valueBoolean?: boolean;
    valueArray?: Array<number>;
    target: TargetType;
}

type State = {
    min: number;
    max: number;
    step: number;
    direction: DirectionType;
    type: TypeOfSlider;
    valueFrom: number;
    valueTo: number;
    bubble: boolean;
    onChangeTo: (value: number) => void;
    onChangeFrom: (value: number) => void;
}

type ViewEvents = { calcPosition: NotifyData };

type ModelEvents = {
    changePosition: NotifyData,
    state: NotifyData,
    min: NotifyData,
    max: NotifyData,
    type: NotifyData,
    step: NotifyData,
    direction: NotifyData,
    hideBubble: NotifyData,
    showBubble: NotifyData
}

type ScaleCreate = {
    parent: HTMLElement,
    direction: DirectionType,
    min: number,
    max: number
}

type LineCreate = {
    parent: HTMLElement,
    direction: DirectionType,
    type: TypeOfSlider
}

type ViewHeadCreate = {
    parent: HTMLElement,
    direction: DirectionType,
    value: number,
    bubbleValue: number,
    type: HeadType
}

type GetRelativeType = {
    value: number,
    min: number,
    max: number
}

type ObserverItem<T> = (args: T) => void;

export type {
    NotifyData,
    State,
    ScaleCreate,
    LineCreate,
    ViewHeadCreate,
    GetRelativeType,
    TargetType,
    DirectionType,
    TypeOfSlider,
    ObserverItem,
    HeadType,
    ModelEvents,
    ViewEvents
};
