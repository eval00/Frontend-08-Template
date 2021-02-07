
const data = setData();
draw(data);

function setData() {
    const data = {
        id: 'root',
        children: [],
    };

    // var set = new Set();
    var map = new Map();

    var objects = [
        eval,
        isFinite,
        isNaN,
        parseFloat,
        parseInt,
        decodeURI,
        decodeURIComponent,
        encodeURI,
        encodeURIComponent,
        Array,
        Date,
        RegExp,
        Promise,
        Proxy,
        Map,
        WeakMap,
        Set,
        WeakSet,
        Function,
        Boolean,
        String,
        Number,
        Symbol,
        Object,
        Error,
        EvalError,
        RangeError,
        ReferenceError,
        SyntaxError,
        TypeError,
        URIError,
        ArrayBuffer,
        SharedArrayBuffer,
        DataView,
        Float32Array,
        Float64Array,
        Int8Array,
        Int16Array,
        Int32Array,
        Uint8Array,
        Uint16Array,
        Uint32Array,
        Uint8ClampedArray,
        Atomics,
        JSON,
        Math,
        Reflect
    ];

    // objects.forEach(o => set.add(o));
    objects.forEach(o => {
        const node = {
            id: o.name || String(o),
            children: [],
        };
        data.children.push(node);
        map.set(o, node.children);
    });

    for (var i = 0; i < objects.length; i++) {
        var o = objects[i];
        for (var p of Object.getOwnPropertyNames(o)) {
            var d = Object.getOwnPropertyDescriptor(o, p)
            if ((d.value !== null && typeof d.value === "object") || (typeof d.value === "function"))
                if (!map.has(d.value)) {
                    // set.add(d.value), objects.push(d.value);
                    const c = d.value;
                    const children = [];
                    map.set(c, children), objects.push(c);
                    const node = {
                        id: c.name || `${o.name}.${p}`,
                        children,
                    };
                    map.get(o).push(node);
                }
            if (d.get)
                if (!map.has(d.get)) {
                    // set.add(d.get), objects.push(d.get);
                    const c = d.get;
                    const children = [];
                    map.set(c), objects.push(c);
                    const node = {
                        id: c.name || `${o.name}.${p}`,
                        children,
                    };
                    map.get(o).push(node);
                }
            if (d.set)
                if (!map.has(d.set)) {
                    // set.add(d.set), objects.push(d.set);
                    const c = d.set;
                    const children = [];
                    map.set(c), objects.push(c);
                    const node = {
                        id: c.name || `${o.name}.${p}`,
                        children,
                    };
                    map.get(o).push(node);
                }
        }
    }

    return data;
}

function draw(data) {
    var graph = new G6.TreeGraph({
        container: 'mountNode',
        width: window.innerWidth,
        height: window.innerHeight,
        pixelRatio: 2,
        modes: {
            default: [{
                type: 'collapse-expand',
                onChange: function onChange(item, collapsed) {
                    var data = item.get('model').data;
                    data.collapsed = collapsed;
                    return true;
                }
            }, 'drag-canvas', 'zoom-canvas']
        },
        defaultNode: {
            size: 16,
            anchorPoints: [[0, 0.5], [1, 0.5]],
            style: {
                fill: '#40a9ff',
                stroke: '#096dd9'
            }
        },
        defaultEdge: {
            shape: 'cubic-horizontal',
            style: {
                stroke: '#A3B1BF'
            }
        },
        layout: {
            type: 'compactBox',
            direction: 'LR',
            getId: function getId(d) {
                return d.id;
            },
            getHeight: function getHeight() {
                return 16;
            },
            getWidth: function getWidth() {
                return 16;
            },
            getVGap: function getVGap() {
                return 10;
            },
            getHGap: function getHGap() {
                return 100;
            }
        }
    });

    graph.node(function (node) {
        return {
            size: 26,
            style: {
                fill: '#40a9ff',
                stroke: '#096dd9'
            },
            label: node.id,
            labelCfg: {
                position: node.children && node.children.length > 0 ? 'left' : 'right'
            }
        };
    });

    graph.data(data);
    graph.render();
    graph.fitView();
}
