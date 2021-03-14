## CSS 总论

- at-rules
    - @charset
    - @import
    - @media
    - @page
    - @counter-style
    - @keyframes
    - @fontface
    - @support
    - @namespace
- rule
    - 选择器
        - selector_group
        - selector
            - >
            - <sp>
            - +
            - ~
        - simple_selector
            - type
            - *
            - .
            - #
            - 伪类 :
            - 伪元素 ::
            - :not()
    - 声明
        - Key
            - Properties
            - Variables
        - Value
            - calc
            - number
            - length
            - ...

## CSS 选择器

思考题：为什么 first-letter 可以设置 float 之类的，而 first-line 不行呢？

first-letter 选中的字是确定的，而 first-line 选中的字是不确定的
如果 first-line 可以设置 float 之类的，性能开销会很大
