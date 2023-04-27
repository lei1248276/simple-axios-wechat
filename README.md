# simple-axios-wechat
-  小于1kb的简易的axios微信小程序版使用typescript实现

## 目录
- [安装](#Installing)
- [调用](#直接调用)
- [method 别名](#method别名)
- [Example](#Example)
  - [get请求并定义返回数据类型](#get请求并定义返回数据类型)
  - [post请求并定义返回数据类型](#post请求并定义返回数据类型)
- [全局默认值](#全局默认值)
- [创建实例](#创建实例)
- [拦截器](#拦截器)
- [获取RequestTask（中断请求、监听 HTTP）](#获取RequestTask)
- [自定义请求方法](#自定义请求方法)

## Installing

### Package manager

Using npm:

```bash
$ npm install simple-axios-wechat
```

Using yarn:

```bash
$ yarn add simple-axios-wechat
```

### 直接调用
- （SimpleAxios([config](https://developers.weixin.qq.com/miniprogram/dev/api/network/request/wx.request.html))）
```ts
import SimpleAxios from 'simple-axios-wechat'

SimpleAxios<{result: any}>(config)
  .then(res => { console.log(res) })
  .catch(err => { console.error(err) })
```

### method别名
- 与SimpleAxios.create()实例一致
##### axios.request<{result: any}>(config)
##### axios.get<{result: any}>(url[, config])
##### axios.post<{result: any}>(url[, data[, config]])
##### axios.put<{result: any}>(url[, data[, config]])
##### axios.delete<{result: any}>(url[, config])
##### axios.head<{result: any}>(url[, config])
##### axios.options<{result: any}>(url[, config])
##### axios.trace<{result: any}>(url[, data[, config]])
##### axios.connect<{result: any}>(url[, data[, config]])

## Example
### get请求并定义返回数据类型
```ts
import SimpleAxios from 'simple-axios-wechat'
// 默认 get 请求
SimpleAxios<{result: string}>({ url: 'http://example.org/get' })
  .then(res => { console.log(res) })
  .catch(err => { console.error(err) })

SimpleAxios.get<{result: string}>('http://example.org/get')
  .then(res => { console.log(res) })
  .catch(err => { console.error(err) })
```

### post请求并定义返回数据类型
```js
SimpleAxios<{result: string}>({ url: 'http://example.org/get', method: 'POST' })
  .then(res => { console.log(res) })
  .catch(err => { console.error(err) })

SimpleAxios.post<{result: string}>('http://example.org/post', { data: {} })
  .then((res) => { console.log(res) })
  .catch((err) => { console.error(err) });
```

### 全局默认值
- （默认值优先级与axios一致，后设置大于先设置）
```ts
import SimpleAxios from 'simple-axios-wechat'

SimpleAxios.defaults.baseURL = 'http://example.org/get'
SimpleAxios.defaults.timeout = 10 * 1000
```

### 创建实例
```ts
import SimpleAxios from 'simple-axios-wechat'

const simpleAxios = SimpleAxios.create({
  baseURL: 'http://example.org/get',
  timeout: 10 * 1000
})
```

### 拦截器
```ts
import SimpleAxios from 'simple-axios-wechat'

const simpleAxios = SimpleAxios.create({
  baseURL: 'http://example.org/get'
})

simpleAxios.interceptors.request.use((config) => {
  // 干点啥?
  return config
}, (err) => {
  return Promise.reject(err)
})

simpleAxios.interceptors.response.use((response) => {
  // 总得干点啥吧?
  return response
}, (err) => {
  return Promise.reject(err)
})
```

### 获取RequestTask
- 在请求config配置项中通过回调获取[RequestTask](https://developers.weixin.qq.com/miniprogram/dev/api/network/request/RequestTask.html)（比如用来 abort()）
```ts
import SimpleAxios from 'simple-axios-wechat'

SimpleAxios<{data: any, state: number}>({
  url: 'http://example.org/get',
  getRequestTask: (task) => { task.abort() }
})
  .catch(err => { console.error(err) })
```

### 自定义请求方法
- （要求返回一个Promise）
```ts
import SimpleAxios from 'simple-axios-wechat'

const simpleAxios = SimpleAxios.create({
  baseURL: 'http://example.org/get',
  adapter: function adapter(config) {
    return new Promise((resolve, reject) => {
      const RequestTask = wx.request({
        ...config,
        success: (res) => { resolve(res) },
        fail: (err) => { reject(err) }
      })
      // ! ** 自定义adapter需要通过回调暴露RequestTask **
      config.getRequestTask && config.getRequestTask(RequestTask)
    })
  }
})
```
