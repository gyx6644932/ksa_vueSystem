import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';    // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";
Vue.prototype.getformatTime = function(t) {
  var d = t //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let year = d.getFullYear()
  let month = parseInt(d.getMonth() + 1)
  let date = d.getDate()
  if (month < 10) {
    month = '0' + month
  }
  if (date < 10) {
    date = '0' + date
  }
  return year + '-' + month + '-' + date
}
Vue.filter('sizeChange', value => {
  let size = value.replace('item_XL_','item_S_')

  return size
})
Vue.filter('formatTime', value => {
  var d = new Date(parseInt(value)); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let year = d.getFullYear()
  let month = parseInt(d.getMonth() + 1)
  let date = d.getDate()
  if (month < 10) {
    month = '0' + month
  }
  if (date < 10) {
    date = '0' + date
  }
  return year + '-' + month + '-' + date
})
Vue.use(ElementUI);
Vue.prototype.$axios = axios;
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
