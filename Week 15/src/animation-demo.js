import { TimeLine, Animation } from './animation';
import { ease, easeIn } from './ease';

let tl = new TimeLine();

tl.start();

tl.add(new Animation(el.style, 'transform', 0, 500, 2000, 0, easeIn, v => `translate(${v}px)`));

el2.style.transition = 'transform ease-in 2s';
el2.style.transform = 'translateX(500px)';

document.getElementById('pause-btn').addEventListener('click', () => tl.pause());
document.getElementById('resume-btn').addEventListener('click', () => tl.resume());
