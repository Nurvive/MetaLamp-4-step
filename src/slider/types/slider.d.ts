import {State} from './types';

declare global {
    interface JQuery {
        Slider(settings: State): JQuery;
        Slider(value: string): void;
        Slider(value: string, value2: string): void;
        Slider(value: string, value2: number): void;
    }
}
