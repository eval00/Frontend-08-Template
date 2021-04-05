import { Component, createElement } from './framework';
import { Carousel } from './carousel';
import { TimeLine, Animation } from './animation';

let d = [
    'https://static001.geekbang.org/resource/image/37/e4/37fbe168a471e8ee1267fd741d096fe4.jpg',
    'https://static001.geekbang.org/resource/image/15/b0/153c6456a919c059ab916e885d4d4db0.jpg',
    'https://static001.geekbang.org/resource/image/35/54/35cb65d74b24e70501967b672702ba54.jpg',
    'https://static001.geekbang.org/resource/image/52/f8/52fa86035eba686f92a4b637ef8115f8.jpg',
];

let a = <Carousel src={d} />

a.mountTo(document.body);

let tl = new TimeLine();

window.tl = tl;
window.animation = new Animation({ set a(v) { console.log(v) } }, 'a', 0, 100, 1000, null);
// tl.add(animation);

// tl.start();
