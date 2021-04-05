const TICK = Symbol('tick');
const TICK_HANDLER = Symbol('tick-handler');
const ANIAMTIONS = Symbol('animations');
const START_TIME = Symbol('start-time');
const PAUSE_START = Symbol("pause-start");
const PAUSE_TIME = Symbol("pause-time");

export class TimeLine {
    constructor() {
        this[ANIAMTIONS] = new Set();
        this[START_TIME] = new Map();
    }

    start() {
        let startTime = Date.now();
        this[PAUSE_TIME] = 0;
        this[TICK] = () => {
            let now = Date.now();
            for(let animation of this[ANIAMTIONS]) {
                let t;
                if(this[START_TIME].get(animation) < startTime) {
                    t = now - startTime - this[PAUSE_TIME];
                } else {
                    t = now - this[START_TIME].get(animation) - this[PAUSE_TIME];
                }
                if(animation.duration < t) {
                    this[ANIAMTIONS].delete(animation);
                    t = animation.duration;
                }
                animation.receive(t);
            }
            this[TICK_HANDLER] = requestAnimationFrame(this[TICK]);
        }
        this[TICK]();
    }

    pause() {
        this[PAUSE_START] = Date.now();
        cancelAnimationFrame(this[TICK_HANDLER]);
    }
    resume() {
        this[PAUSE_TIME] += Date.now() - this[PAUSE_START];
        this[TICK]();
    }

    reset() {}

    add(animation, startTime) {
        if(arguments.length < 2) {
            startTime = Date.now();
        }
        this[ANIAMTIONS].add(animation);
        this[START_TIME].set(animation, startTime);
    }
}

export class Animation {
    constructor(object, property, startValue, endValue, duration, delay, timingFunction, template) {
        this.object = object;
        this.property = property;
        this.startValue = startValue;
        this.endValue = endValue;
        this.duration = duration;
        this.delay = delay;
        this.timingFunction = timingFunction;
        this.template = template;
    }
    receive(time) {
        let range = this.endValue - this.startValue;
        this.object[this.property] = this.template(this.startValue + range * time / this.duration);
    }
}
