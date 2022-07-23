import {ObserverItem} from './types/types';

type ObserverStore<T> = {
    [K in keyof T]: ObserverItem<T[K]>[];
};

abstract class Observer<T extends Record<string, unknown>> {
    observers: ObserverStore<T>;

    protected constructor() {
        this.observers = {} as ObserverStore<T>;
    }

    subscribe<K extends keyof T>(
        eventType: K,
        observer: ObserverItem<T[K]>
    ): void {
        if (!this.observers[eventType]) {
            this.observers[eventType] = [observer];
        } else {
            this.observers[eventType].push(observer);
        }
    }

    unsubscribe<K extends keyof T>(
        eventType: K,
        observer: ObserverItem<T[K]>
    ): void {
        if (this.observers.eventType) {
            this.observers[eventType] = this.observers[eventType].filter(
                (item) => item !== observer
            );
        }
    }

    protected notify<K extends keyof T>(eventType: K, data: T[K]): void {
        this.observers[eventType]?.forEach((observer) => {
            observer(data);
        });
    }
}

export {Observer};
