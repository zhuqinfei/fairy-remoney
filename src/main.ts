import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import Nav from '@/components/Nav.vue';
import Layout from '@/components/Layout.vue';
import Icon from '@/components/Icon.vue';
import TagsIcons from '@/components/TagsIcons.vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.config.productionTip = false;
Vue.component('Nav', Nav);
Vue.component('Layout',Layout)
Vue.component('Icon',Icon)
Vue.component('TagsIcons',TagsIcons)

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

window.onload=function(){
  setTimeout(function(){
    window.scrollTo(0,200)
  },300)
}

if(document.documentElement.clientWidth>500){
  window.alert("为保证浏览效果，请用手机浏览本页面")
}

