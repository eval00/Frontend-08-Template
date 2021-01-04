# 四则运算

## 词法

```
TokenNumber
    0-9 .
Operator
    + - * /
Whitespace
    <SP>
LineTerminator
    <LF> <CR>
```

## 语法

```
<Expression>
    <AdditiveExpression><EOF>

<AdditiveExpression>
    <MultiplicativeExpression>
    <AdditiveExpression><+><MultiplicativeExpression>
    <AdditiveExpression><-><MultiplicativeExpression>

<MultiplicativeExpression>
    <Number>
    <MultiplicativeExpression><*><Number>
    <MultiplicativeExpression></><Number>
```