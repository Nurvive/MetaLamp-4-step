type TargetType =
    'valueTo'
    | 'valueFrom'
    | 'max'
    | 'min'
    | 'direction'
    | 'type'
    | 'bubble'
    | 'value';
type DirectionType = 'horizontal' | 'vertical';
type TypeOfSlider = 'single' | 'double';
type HeadType = 'from' | 'to';
type EventType =
    'state'
    | 'default'
    | 'direction'
    | 'type'
    | 'step'
    | 'max'
    | 'min'
    | 'showBubble'
    | 'hideBubble'

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

type NotifyData = {
    valueNumber?: number;
    valueString?: DirectionType | TypeOfSlider;
    valueBoolean?: boolean;
    valueArray?: Array<number>;
    target: TargetType;
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

type ObserverItem = (data: NotifyData) => void;

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
    EventType,
    HeadType
};
