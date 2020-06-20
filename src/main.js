import Vue from 'vue'
import App from './App.vue'
import router from './router'

import './styles/index.scss'

import { Col, Row, Button, Layout, Input, Icon, Drawer, Menu } from 'ant-design-vue'
Vue.use(Col)
Vue.use(Row)
Vue.use(Button)
Vue.use(Layout)
Vue.use(Input)
Vue.use(Icon)
Vue.use(Drawer)
Vue.use(Menu)

import VCharts from 'v-charts'
Vue.use(VCharts)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
