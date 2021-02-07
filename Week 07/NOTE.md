# 表达式

- Expression
	- 优先级 vs 语法树
		- Member
            - 与运行时的 Reference 有关
		- New
		- Call
		- Update
		- Unary
		- Exponental
		- Multiplicative
		- Additive
		- Shift
		- Relationship
		- Equality
		- Bitwise
		- Logical
		- Conditional
	- =左右
		- Left Handside
		- Right Handside
- 表达式与运行时的 类型转换 有关
- 装箱和拆箱

## `new Foo()` 优先级高于 `new Foo`

`new a()()`

    new a() 的优先级的两种情况：
        1. new a 优先级高
            如 new a 的结果为f，最终 f()()
        2. new a() 优先级高
            如 new a() 的结果为f，最终 f()


`new new a()`

    new a() 的优先级的两种情况：
        1. new a 优先级高
            最后的括号是第一个 new 的
        2. new a() 优先级高
            最后的括号是第二个 new 的

## Reference

- `a.b` 结果
    - 不直接是其值，而是 Reference
    - Reference 类型，存在于 运行时
    - Reference 包含 Object 和 Key
- 在加减法中 `a.b` 直接解引用，此时 Reference 是多余的
    - 解引用 就是 直接取 `a.b` 的值
- 处理 `a.b` 的写操作，在 JS 中通过 Reference 实现
    - `delete a.b`
    - assign：`a.b = 233`

## Call New Member

    为了处理 `new a()['b']`
    产生了 Call New Member 三种优先级

    a()['b'] 还是 new a() 先
    new a() 先
    因为 Member 高于 Call
    即 new a() 优先级高于 a()['b']

## Left Handside 和 Right Handside

    = 左右
    JS 中 Left Handside 一定也是 Right Handside

# 语句相关

- 语句：程序的执行顺序
- 语句与运行时的 Completion Record 有关
- 语句的分类
    - 简单语句
        - ExpressionStatement
            - Expression 加上一个分号
        - EmptyStatement
            - 单独一个分号
        - DebuggerStatement
        - ThrowStatement
            - 有其他方法可以抛出异常？
            - throw 加一个表达式
        - ContinueStatement
        - BreakStatement
        - ReturnStatement
        - 结构化时再讲 与 generator 相关的 yield
    - 组合语句
        - BlockStatement
        - IfStatement
        - SwitchStatement
            - 在 JS 中性能与 if else 没区别？
        - IterationStatement
        - WithStatement
            - 广受诟病，带来不确定性？
        - LabelledStatement
        - TryStatement
            - 花括号由该语句定义
    - 声明（JS标准中声明与语句是分开的）
        - 旧的
            - Function
                - 作用范围只认 fanction body，没有先后关系（当作出现在第一行处理）
                - FunctionDeclaration
                - GeneratorDeclaration
                - AsyncFunctionDeclaration
                - AsyncGeneratorDeclaration
            - VariableStatement（既有声明作用，又有实际的执行计算的能力）
                - 与 Function声明 的区别 赋值部分不会当作出现在第一行处理
        - 新的
            - ClassDeclaration
            - LexicalDeclaration
- Lexical Environment 和 Environment Record：用于描述变量和作用域
- 预处理
- 作用域

## Completion Record

- 用于描述异常、跳出等语句执行过程
- 组成
    - [[type]]
        - normal
        - break
        - continue
        - return
        - throw
    - [[value]]
        - 基本类型
    - [[target]]
        - label

## 新的声明

声明前使用会报错，但声明还是有作用

```JS
class A { a=1 }
void function() {
    console.log(new A); // Uncaught ReferenceError: Cannot access 'A' before initialization
    class A { a=2 }
    console.log(new A); // { a: 2 }
}();
```

# 结构化

- JS执行粒度（运行时）
    - 宏任务
        - 传给JS引擎的任务
    - 微任务（Promise）
        - JS引擎内部的任务
    - 函数调用（Execution Context）
    - 语句/声明（Completion Record）
    - 表达式（Reference）
    - 直接量/变量/this...
- 事件循环

## Execution Context

- code evaluation state
    - 用于 async 和 generator 函数
    - 记录代码执行到哪里的信息
- Function
- Script or Module
- Generator
- Realm
    - 保存所有内置对象
- LexicalEnvironment
    - this
    - new.target
    - super
    - 变量
- VariableEnvironment
    - 仅用于处理 var 声明

## Environment Record

- Environment Records
    - Declarative Environment Records
        - Function Environment Records
        - module Environment Records
    - Global Environment Records
    - Object Environment Records
- 用于描述变量和作用域
