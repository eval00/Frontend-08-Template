import {Component, createElement} from './framework';

class Carousel extends Component {
    constructor() {
        super();
        this.attributes = Object.create(null);
    }
    setAttribute(name, value) {
        this.attributes[name] = value;
    }
    render() {
        this.root = document.createElement('div');
        this.root.classList.add('carousel')
        for(let record of this.attributes.src) {
            let child = document.createElement('div');
            child.style.backgroundImage = `url('${record}')`;
            this.root.appendChild(child);
        }

        let position = 0;

        this.root.addEventListener('mousedown', event => {
            let children = this.root.children;
            let startX = event.clientX;
            
            let move = event => {
                let x = event.clientX - startX;

                let current = position - Math.round((x - x % 125) / 125);

                for(let offset of [-1, 0, 1]) {
                    let pos = current + offset;
                    pos = (pos + children.length) % children.length;
                    let child = children[pos];
                    child.style.transition = 'none';
                    child.style.transform = `translateX(${-pos * 125 + offset * 125 + x % 125}px)`;
                }
            }

            let up = event => {
                let x = event.clientX - startX;
                position = position - Math.round(x / 125);

                for(let offset of [0, - Math.sign(Math.round(x / 125) - x + 62.5 * Math.sign(x))]) {
                    let pos = position + offset;
                    pos = (pos + children.length) % children.length;
                    let child = children[pos];
                    child.style.transition = '';
                    child.style.transform = `translateX(${-pos * 125 + offset * 125}px)`;
                }
                document.removeEventListener('mousemove', move);
                document.removeEventListener('mouseup', up);
            }

            document.addEventListener('mousemove', move);
            document.addEventListener('mouseup', up);
        });

        /*let currentIndex = 0;
        setInterval(() => {
            let children = this.root.children;
            let nextIndex = (currentIndex + 1) % children.length;

            let current = children[currentIndex];
            let next = children[nextIndex];

            next.style.transition = 'none';
            next.style.transform = `translateX(${100 - nextIndex * 100}%)`;
            console.log(currentIndex, nextIndex)
            console.log(current.style.transform, next.style.transform)
            
            setTimeout(() => {
                next.style.transition = '';
                current.style.transform = `translateX(${-100 - currentIndex * 100}%)`;
                next.style.transform = `translateX(${- nextIndex * 100}%)`;
                console.log(currentIndex, nextIndex)
                console.log(current.style.transform, next.style.transform)
                currentIndex = nextIndex;
            }, 16)
        }, 1000);*/

        return this.root;
    }
    mountTo(parent) {
        parent.appendChild(this.render());
    }
}

let d = [
    'https://static001.geekbang.org/resource/image/37/e4/37fbe168a471e8ee1267fd741d096fe4.jpg',
    'https://static001.geekbang.org/resource/image/15/b0/153c6456a919c059ab916e885d4d4db0.jpg',
    'https://static001.geekbang.org/resource/image/35/54/35cb65d74b24e70501967b672702ba54.jpg',
    'https://static001.geekbang.org/resource/image/52/f8/52fa86035eba686f92a4b637ef8115f8.jpg',
];

let a = <Carousel src={d} />

a.mountTo(document.body);
