
let element = document.documentElement;

let isTouch = false;

element.addEventListener('mousedown', event => {
    if(isTouch) {
        isTouch = false;
        return;
    }

    console.log('mouse down');
    start(event);

    let mousemove = event => {
        console.log('mouse move');
        move(event);
    };
    let mouseup = event => {
        console.log('mouse up');
        end(event);
        element.removeEventListener('mousemove', mousemove);
        element.removeEventListener('mouseup', mouseup);
    };
    element.addEventListener('mousemove', mousemove);
    element.addEventListener('mouseup', mouseup);
});

element.addEventListener('touchstart', event => {
    isTouch = true;

    console.log('touch start');
    for(let touch of event.changedTouches) {
        start(touch);
    }
});
element.addEventListener('touchmove', event => {
    console.log('touch move');
    for(let touch of event.changedTouches) {
        move(touch);
    }
});
element.addEventListener('touchend', event => {
    console.log('touch end');
    for(let touch of event.changedTouches) {
        end(touch);
    }
    
});
element.addEventListener('touchcancel', event => {
    console.log('touch cancel');
    for(let touch of event.changedTouches) {
        cancel(touch);
    }
});

const start = (point) => {
    console.log('start', point.clientX, point.clientY);
};
const move = (point) => {
    console.log('move', point.clientX, point.clientY);
};
const end = (point) => {
    console.log('end', point.clientX, point.clientY);
};
const cancel = (point) => {
    console.log('cancel', point.clientX, point.clientY);
};