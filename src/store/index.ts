import Vue from 'vue';
import Vuex, {Store} from 'vuex';
import clone from '@/lib/clone';
import createId from '@/lib/createId';
import router from '@/router';

Vue.use(Vuex);   //把store绑到Vue.prototype,好使用this.$store

const store= new Vuex.Store({
  state: {
    recordList:[],
    createRecordError:null,  //判断保持能否成功
    createTagError: null,  //判断创建能否成功
    tagList:[],
    currentTag:undefined
  } as RootState,
  mutations: {
    setCurrentTag(state,id:string){
      state.currentTag=state.tagList.filter(t => t.id === id)[0];
    },
    updateTag(state,payload:{id:string,name:string}){ //只能接受一个参数，所以可以改成对象形式
      const {id,name}=payload
      const idList = state.tagList.map(item => item.id);
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map(item => item.name);
        if (names.indexOf(name) >= 0) {
          window.alert('标签名重复了')
        } else {
          const tag = state.tagList.filter(item => item.id === id)[0];
          tag.name = name;
          tag.id = name;
          store.commit('saveTags')
        }
      }
    },
    removeTag(state,id: string) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      if(index>=0){
        state.tagList.splice(index, 1)
        store.commit('saveTags')
        router.back()
      }else{
        window.alert('删除失败');
      }
    },
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[];
    },
    createRecord(state, record) {
      const record2: RecordItem = clone(record);//深拷贝，经过两次转换变成两个不同地址,但是内容完成一样
      // record2.createdAt = new Date().toISOString();
      state.recordList.push(record2);
      store.commit('saveRecords')
    },
    saveRecords(state) {
        window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },


    fetchTags(state) {
       state.tagList= JSON.parse(window.localStorage.getItem('tagList') || '[]');
       if( !state.tagList || state.tagList.length===0){
         store.commit('createTag',{name:'canyin',value:'餐饮',type:'-'})
         store.commit('createTag',{name:'maicai',value:'买菜',type:'-'})
         store.commit('createTag',{name:'shuiguo',value:'水果',type:'-'})
         store.commit('createTag',{name:'lingshi',value:'零食',type:'-'})
         store.commit('createTag',{name:'gongzi',value:'工资',type:'+'})
         store.commit('createTag',{name:'hongbao',value:'红包',type:'+'})
         store.commit('createTag',{name:'jiangjin',value:'奖金',type:'+'})
         store.commit('createTag',{name:'jianzhi',value:'兼职',type:'+'})
       }
    },
    createTag(state,options:Tag) {
      state.createTagError=null
      const {name,value,type}=options
      const names = state.tagList.map(item => item.name);
      if (names.indexOf(name) >= 0) {
        state.createTagError=new Error('tag name duplicated')
        return
      }else{
        const id = createId().toString();
        state.tagList.push({id, name: name,value:value,type:type});
        store.commit('saveTags');
        router.push('/money')
      }
    },
    saveTags(state) {
      window.localStorage.setItem('tagList',JSON.stringify(state.tagList));
    },
  },
});

export default store;

