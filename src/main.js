import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

/**
 * basic styles
 */
import './styles/index.scss'

/**
 * ant-design-vue
 */
import { Col, Row, Button, Layout, Input, Icon, Drawer, Menu, Cascader } from 'ant-design-vue'
Vue.use(Col)
Vue.use(Row)
Vue.use(Button)
Vue.use(Layout)
Vue.use(Input)
Vue.use(Icon)
Vue.use(Drawer)
Vue.use(Menu)
Vue.use(Cascader)

/**
 * vcharts
 */
import VeWordCloud from 'v-charts/lib/wordcloud.common'
import VeLine from 'v-charts/lib/line.common'
Vue.component('ve-wordcloud', VeWordCloud)
Vue.component('ve-line', VeLine)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
