export class Observer {
    observers:Array<Function>

    constructor() {
      this.observers = [];
    }

    subscribe(observer:Function) {
      this.observers.push(observer);
    }

    unsubscribe(observer:Function) {
      this.observers = this.observers.filter((x) => x !== observer);
    }

    notify(data:object) {
      this.observers.forEach((x) => x(data));
    }
}
