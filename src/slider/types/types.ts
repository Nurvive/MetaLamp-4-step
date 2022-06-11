interface State {
    min: number;
    max: number;
    step: number;
    direction: string;
    type: string;
    valueFrom: number;
    valueTo: number;
    bubble: boolean;
    onChangeTo: (value: number) => void;
    onChangeFrom: (value: number) => void;
}

interface NotifyData {
    valueNumber?: number;
    valueString?: string;
    valueBoolean?: boolean;
    valueArray?: Array<number>;
    target: string;
}

type ScaleCreate = {
    parent: HTMLElement,
    direction: string,
    min: number,
    max: number
}

type LineCreate = {
    parent: HTMLElement,
    direction: string,
    type: string
}

type ViewHeadCreate = {
    parent: HTMLElement,
    direction: string,
    value: number,
    bubbleValue: number
}

type GetRelativeType = {
    value: number,
    min: number,
    max: number
}

export type {
    NotifyData, State, ScaleCreate, LineCreate, ViewHeadCreate, GetRelativeType
};
