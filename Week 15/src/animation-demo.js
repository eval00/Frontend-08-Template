import { TimeLine, Animation } from './animation';

let tl = new TimeLine();

tl.start();

tl.add(new Animation(el.style, 'transform', 0, 500, 2000, 0, null, v => `translate(${v}px)`));

document.getElementById('pause-btn').addEventListener('click', () => tl.pause());
document.getElementById('resume-btn').addEventListener('click', () => tl.resume());
