# Development Guide

## 目录结构

```
  src/
    --api/  请求接口都放在这里面统一处理
    --components/  全局公共组件
    --layout/  页面基础布局
    --utils/  公共工具
    --views/  页面
      --[viewName]/
      --components/ 页面所需组件，不是公共的就放在这里
    --babel.config.js babel 的配置
    --vue.config.js 脚手架的配置
```

## 基本依赖

```
axios + ant-design-vue + vcharts + mockjs
```

[axios文档](https://www.kancloud.cn/yunye/axios/234845)

[ant-design-vue 文档](https://www.antdv.com/docs/vue/introduce-cn/)

[vcharts文档](https://v-charts.js.org/#/skill-demo)



## 路由的处理

```
全局都会用到的布局在 Layout/ 中封装好了，可以参考 index 的路由用法
```

## 接口的封装

接口全部放在 `api` 目录中统一维护，在 `utils` 的 `request.js` 中，对 `axios` 进行拦截器及基础的封装后，再在 `api` 中导入，对接口进行封装，需要用到时在页面中直接导入即可，如

```javascript
import { getList } from '@/api/index'

// axios 返回的是个 promise, 同理可以使用 async await
getList().then(res => {}, err => {})
```

## mock
具体逻辑在 `mock/mock-server.js` 中，其中主要是使用 `chokidar` 处理了 `mockjs` 的热更新

### 增加 mock 接口
如 `hotWords.js` 中，在暴露出的数组中添加新的即可

### 增加 mock 模块
新增 `[moduleName].js` 文件，在 `mock/index.js` 中导入即可