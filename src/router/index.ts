import Vue from 'vue';
import VueRouter, {RouteConfig} from 'vue-router';
import Money from '@/views/Money.vue';
import Labels from '@/views/Labels.vue';
import Statistics from '@/views/Statistics.vue';
import NotFound from '@/views/NotFound.vue';
import EditLabel from '@/views/EditLabel.vue';
import TagsList from '@/views/TagsList.vue'
import Account from '@/views/Account.vue';
import Chart from '@/views/Chart.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path:'/',
    redirect:'/statistics'
  },
  {
    path:'/money',
    component:Money
  },
  {
    path:'/labels',
    component:Labels
  },
  {
    path:'/tagsList',
    component:TagsList
  },
  {
    path:'/statistics',
    component:Statistics
  },
  {
    path:'/statistics',
    component:Statistics
  },
  {
    path:'/account',
    component:Account
  },
  {
    path:'/chart',
    component:Chart
  },
  {
    path:'/labels/edit/:id',
    component:EditLabel
  },
  {
    path:'*',  //'*'放在路由最后，表示前面都检查完没有符合的，剩余的其他情况
    component:NotFound
  }

];

const router = new VueRouter({
  routes
});

export default router;
