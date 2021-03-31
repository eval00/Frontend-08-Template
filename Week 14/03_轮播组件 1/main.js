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
        for(let record of this.attributes.src) {
            let child = document.createElement('img');
            child.src = record;
            this.root.appendChild(child);
        }
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
