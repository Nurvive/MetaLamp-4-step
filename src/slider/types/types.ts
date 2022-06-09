type StateContent = number | string | boolean | undefined | ((value: number) => void);

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

    [key: string]: StateContent;
}

interface NotifyData {
    valueNumber?: number;
    valueString?: string;
    valueBoolean?: boolean;
    valueArray?: Array<number>;
    target: string;
    onlyState?: boolean;
}

export {NotifyData, State};
