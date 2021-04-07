
let element = document.documentElement;

let isTouch = false;

element.addEventListener('mousedown', event => {
    if(isTouch) {
        isTouch = false;
        return;
    }

    start(event);

    let mousemove = event => {
        move(event);
    };
    let mouseup = event => {
        end(event);
        element.removeEventListener('mousemove', mousemove);
        element.removeEventListener('mouseup', mouseup);
    };
    element.addEventListener('mousemove', mousemove);
    element.addEventListener('mouseup', mouseup);
});

element.addEventListener('touchstart', event => {
    isTouch = true;

    for(let touch of event.changedTouches) {
        start(touch);
    }
});
element.addEventListener('touchmove', event => {
    for(let touch of event.changedTouches) {
        move(touch);
    }
});
element.addEventListener('touchend', event => {
    for(let touch of event.changedTouches) {
        end(touch);
    }
    
});
element.addEventListener('touchcancel', event => {
    for(let touch of event.changedTouches) {
        cancel(touch);
    }
});

let handler;
let startX, startY;
let isPan = false, isTap = true, isPress = false;

const start = (point) => {
    // console.log('start', point.clientX, point.clientY);
    startX = point.clientX, startY = point.clientY;

    isTap = true;
    isPan = false;
    isPress = false;

    handler = setTimeout(() => {
        isTap = false;
        isPan = false;
        isPress = true;
        handler = null;
        console.log('press start');
    }, 500);
};
const move = (point) => {
    let dx = point.clientX - startX, dy = point.clientY - startY;

    if(!isPan && dx ** 2 + dy ** 2 > 100) {
        isTap = false;
        isPan = true;
        isPress = false;
        console.log('pan start');
        clearTimeout(handler);
    }

    if(isPan) {
        console.log(dx, dy);
        console.log('pan');
    }

    // console.log('move', point.clientX, point.clientY);
};
const end = (point) => {
    if(isTap) {
        console.log('tap');
        clearTimeout(handler);
    }
    if(isPan) {
        console.log('pan end');
    }
    if(isPress) {
        console.log('press end');
    }
    // console.log('end', point.clientX, point.clientY);
};
const cancel = (point) => {
    clearTimeout(handler);
    // console.log('cancel', point.clientX, point.clientY);
};