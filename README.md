# 虚拟键盘

## 例子
### 手机号
```html
<input phone readonly="readonly" />
```

```javascript
new Jkeyboard($(''), 'phone')
```

![手机号例子](./images/phone.png)

### 金额(保留两位小数)
```html
<input money readonly="readonly" />
```

```javascript
new Jkeyboard($(''), 'money')
```

![金额例子](./images/money.png)


### 银行卡号(每4个数字之间加空格)
```html
<input bank readonly="readonly" />
```

```javascript
new Jkeyboard($(''), 'bank')
```

![银行卡号例子](./images/bank.png)