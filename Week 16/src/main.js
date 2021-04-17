import { createElement } from './framework';
import { Carousel } from './Carousel';
import { Button } from './Button';
import { List } from './List';

let d = [
    {
        img: 'https://static001.geekbang.org/resource/image/37/e4/37fbe168a471e8ee1267fd741d096fe4.jpg',
        url: 'https://time.geekbang.org/',
        title: '黑猫',
    },
    {
        img: 'https://static001.geekbang.org/resource/image/15/b0/153c6456a919c059ab916e885d4d4db0.jpg',
        url: 'https://time.geekbang.org/',
        title: '猫2',
    },
    {
        img: 'https://static001.geekbang.org/resource/image/35/54/35cb65d74b24e70501967b672702ba54.jpg',
        url: 'https://time.geekbang.org/',
        title: '猫3',
    },
    {
        img: 'https://static001.geekbang.org/resource/image/52/f8/52fa86035eba686f92a4b637ef8115f8.jpg',
        url: 'https://time.geekbang.org/',
        title: '白猫',
    },
];

/*
let a = <Carousel src={d} 
    onChange={event => console.log(event.detail.position)}
    onClick={event => window.location.href = event.detail.data.url}
/>
*/

// let a = <Button>content</Button>

let a = <List data={d}>
{
    (record) =>
    <div>
        <img src={record.img} />
        <a href={record.url}>{record.title}</a>
    </div>
}
</List>

a.mountTo(document.body);
