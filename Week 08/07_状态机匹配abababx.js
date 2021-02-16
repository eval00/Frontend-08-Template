function match(string) {
    let state = start;
    for(const c of string) {
        state = state(c);
    }
    return state === end;
}

function start(c) {
    if(c === 'a') {
        return findA;
    } else {
        return start;
    }
}

function findA(c) {
    if(c === 'b') {
        return findB;
    } else {
        return start(c);
    }
}

function findB(c) {
    if(c === 'a') {
        return findA2;
    } else {
        return start(c);
    }
}

function findA2(c) {
    if(c === 'b') {
        return findB2;
    } else {
        return start(c);
    }
}

function findB2(c) {
    if(c === 'a') {
        return findA3;
    } else {
        return start(c);
    }
}

function findA3(c) {
    if(c === 'b') {
        return findB3;
    } else {
        return start(c);
    }
}

function findB3(c) {
    if(c === 'x') {
        return end;
    } else {
        return findB2(c);
    }
}

function end(c) {
    return end;
}

console.log(match('aabababx'));