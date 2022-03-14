export type stateContent = number | string | boolean | undefined |((value: number) => void);

export interface State {
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

    [key: string]: stateContent;
}

export interface NotifyData {
    valueN?: number;
    valueS?: string;
    valueB?: boolean;
    valueArr?: Array<number>;
    target: string;
    onlyState?: boolean;
}
