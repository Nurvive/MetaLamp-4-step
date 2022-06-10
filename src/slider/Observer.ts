import {NotifyData} from './types/types';

type ObserverItem = (data: NotifyData) => void;
type EventType = 'state' | 'default' | 'direction' | 'type' | 'step' | 'max' | 'min' | 'showBubble' | 'hideBubble'

type ObserverStore = {
    eventType: EventType
    observer: ObserverItem
}

class Observer {
    observers: ObserverStore[];

    constructor() {
        this.observers = [];
    }

    subscribe(eventType: EventType, observer: ObserverItem): void {
        this.observers.push({
            eventType: eventType,
            observer: observer
        });
    }

    unsubscribe(eventType: EventType, observer: ObserverItem): void {
        this.observers = this.observers.filter((item) => item.observer !== observer);
    }

    notify(eventType: EventType, data: NotifyData): void {
        this.observers.forEach((item) => {
            if (item.eventType === eventType) {
                item.observer(data);
            }
        });
    }
}

export {Observer};
