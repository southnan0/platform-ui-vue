### 启动

```
yarn dev         //启动文档的服务
yarn build:file  //根据component.json的配置生成src/index.js
```

### 打包

```
yarn dist
```

增加一个组件的 example，需要在 components.json、route.config.js、nav.config.json 进行配置

### changelogs
 1. 2020-12-22 15:34 table 移除 defaultSearching

    默认值需要在配置 rules 时，一并配置 value

2. remote-select 等内嵌接口请求的，要么要重写 request 的 baseUrl，要么 remote-url 要带 baseUrl

3. 2021-01-18 11:07  
    组件改成打包后被引入，会有个问题，popover的层级计算，跟项目中各自进行，弹窗的popover zindex可能会比select组件的高。目前的处理方式是，设置popperAppendToBody为false