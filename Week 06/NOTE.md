# JavaScript 部分课程安排

- 编程语言通识
- JS 按以下层级讲解
    - Atom
    - Expression
    - Statement
    - Structure
    - Program
- 每个层级的讲解方式
    - 以语法为线索
    - 重点讲语义和运行时
    - ps：通过运行时理解语法的语义

# Atom

- Atom
	- Literal
        - 对应运行时的基本类型
	- Variable
        - 变量对应执行上下文的一些存储变化
	- Keywords
	- Whitespace
	- LineTerminator

## Number

- Number 在 JS 中的表示方式
    - IEEE 754 Double Float
        - Sign (1)
        - Exponent (11)
        - Fraction (52)

```JavaScript
0.toString() // 报错：0. 被解析为 DecimalLiteral

0 .toString()
```

## String

- String 在 JS 中的表示方式
    - UTF-16
- 注意
    - charAt、charCodeAt、length 等方法针对的都是 UTF16 编码

## Null & Undefined

```JavaScript
var a = undefined // undefined 是变量而不是关键字
var a = void 0 // 可以使用 void 运算获得值 undefined

typeof null // "object"
```

## Object

- 描述对象的方式
    - Class
        - 两个主要流派：
        - “归类”
        - “分类”
    - Prototype
- 对象三要素：state identifier behavior
- 注意：在设计对象的状态和行为时，我们总是遵循“行为改变状态”的原则

### Object in JS

- Object
    - Property
        - Key
            - Symbol
            - String
        - Value
            - Data
                - Data Property 的4个 attribute
                - [[value]]
                - writable
                - enumerable
                - configurable
            - Accessor
                - Accessor Property 的4个 attribute
                - get
                - set
                - enumerable
                - configurable
    - [[Prototype]]
- 对象三要素在 JS 中体现
    - Property 描述 state 和 behavior
    - state 可以以数据器属性描述
    - behavior 可以以访问器属性 或 数据器属性中存储函数 描述
    - identifier 以内存地址表示
- 原型链

### Object API/Gramer

```
基本：{} . [] Object.defineProperty
原型：Object.create Object.setPrototypeOf Object.getPrototypeOf
类：new class extends
new function prototype
```

### JS 中 Object 的分类

- 普通对象
- 特殊对象
    - 语言定义的
    - 其他（宿主环境定义的）
