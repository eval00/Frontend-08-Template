
let element = document.documentElement;

let isTouch = false;

let isListeningMouse = false;

element.addEventListener('mousedown', event => {
    if(isTouch) {
        isTouch = false;
        return;
    }

    let context = Object.create(null);
    contexts.set('mouse' + (1 << event.button), context);

    start(event, context);

    let mousemove = event => {
        let button = 1;
        while(button <= event.buttons) {
            if(button & event.buttons) {
                // buttons 的顺序和 button 属性不一样
                let key;
                if(button === 2) {
                    key = 4;
                } else if(button === 4) {
                    key = 2;
                } else {
                    key = button;
                }

                let context = contexts.get('mouse' + key);
                move(event, context);
            }
            button = button << 1;
        }
    };
    let mouseup = event => {
        let context = contexts.get('mouse' + (1 << event.button));
        end(event, context);
        contexts.delete('mouse' + (1 << event.button));

        if(event.buttons === 0) {
            element.removeEventListener('mousemove', mousemove);
            element.removeEventListener('mouseup', mouseup);
            isListeningMouse = false;
        }
    };
    if(!isListeningMouse) {
        element.addEventListener('mousemove', mousemove);
        element.addEventListener('mouseup', mouseup);
        isListeningMouse = true;
    }
});

let contexts = new Map();

element.addEventListener('touchstart', event => {
    isTouch = true;

    for(let touch of event.changedTouches) {
        let context = Object.create(null);
        contexts.set(touch.identifier, context);
        start(touch, context);
    }
});
element.addEventListener('touchmove', event => {
    for(let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier);
        move(touch, context);
    }
});
element.addEventListener('touchend', event => {
    for(let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier);
        end(touch, context);
        contexts.delete(touch.identifier);
    }
    
});
element.addEventListener('touchcancel', event => {
    for(let touch of event.changedTouches) {
        let context = contexts.get(touch.identifier);
        cancel(touch, context);
        contexts.delete(touch.identifier);
    }
});

let handler;
let startX, startY;
let isPan = false, isTap = true, isPress = false;

const start = (point, context) => {
    // console.log('start', point.clientX, point.clientY);
    context.startX = point.clientX, context.startY = point.clientY;

    context.isTap = true;
    context.isPan = false;
    context.isPress = false;

    context.handler = setTimeout(() => {
        context.isTap = false;
        context.isPan = false;
        context.isPress = true;
        context.handler = null;
        console.log('press start');
    }, 500);
};
const move = (point, context) => {
    let dx = point.clientX - context.startX, dy = point.clientY - context.startY;

    if(!context.isPan && dx ** 2 + dy ** 2 > 100) {
        context.isTap = false;
        context.isPan = true;
        context.isPress = false;
        console.log('pan start');
        clearTimeout(context.handler);
    }

    if(context.isPan) {
        console.log(dx, dy);
        console.log('pan');
    }

    // console.log('move', point.clientX, point.clientY);
};
const end = (point, context) => {
    if(context.isTap) {
        console.log('tap');
        clearTimeout(context.handler);
    }
    if(context.isPan) {
        console.log('pan end');
    }
    if(context.isPress) {
        console.log('press end');
    }
    // console.log('end', point.clientX, point.clientY);
};
const cancel = (point, context) => {
    clearTimeout(context.handler);
    // console.log('cancel', point.clientX, point.clientY);
};