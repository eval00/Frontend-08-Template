# 浏览器工作原理内容安排

- 状态机
- HTTP
    - 通过 URL 得到 HTML
- HTML解析
    - 通过 parse HTML 得到 DOM
- CSS计算
    - 通过 CSS 和 DOM 得到 带CSS信息的DOM
- 排版
    - 通过 layout 得到 带position信息的DOM
- 渲染
    - 通过 render 得到 要显示到屏幕的Bitmap

## 状态机

### 不使用状态机处理字符串

```JavaScript
// 在一个字符串中，找到字符”a”
function match(string) {
    for(const c of string) {
        if(c === 'a') {
            return true;
        }
    }
    return false;
}

match('I am groot');
```

```JavaScript
// 在一个字符串中，找到字符“ab”
function match(string) {
    let findA = false;
    for(const c of string) {
        if(c === 'a') {
            findA = true;
        } else if(findA && c === 'b') {
            return true;
        } else {
            findA = false;
        }
    }
    return false;
}

match('I acbm groot');
match('I abm groot');
```

```JavaScript
// 在一个字符串中，找到字符“abcdef”
function match(string) {
    let findA = false;
    let findB = false;
    let findC = false;
    let findD = false;
    let findE = false;
    for(const c of string) {
        if(c === 'a') {
            findA = true;
        } else if(findA && c === 'b') {
            findB = true;
        } else if(findB && c === 'c') {
            findC = true;
        } else if(findC && c === 'd') {
            findD = true;
        } else if(findD && c === 'e') {
            findE = true;
        } else if(findE && c === 'f') {
            return true;
        } else {
            findA = false;
            let findB = false;
            let findC = false;
            let findD = false;
            let findE = false;
        }
    }
    return false;
}

match('I abcdefm groot');
```

### 使用状态机处理字符串

## HTTP 请求


