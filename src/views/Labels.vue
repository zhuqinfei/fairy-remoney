<template>
 <div class="labels">
   <Tabs :data-source="recordTypeList"
         :value.sync="record.type"
   />
   <Layout class="labels-item">
     <div class="tags">
       <router-link class="tag" v-for="tag in tags" :key="tag.id"
                     :to="`/labels/edit/${tag.id}`">
         <svg class="icon" aria-hidden="true" >
           <use :xlink:href="'#icon-'+tag.name"/>
         </svg>
         <span>{{tag.value}}</span>
         <Icon name="right" class="right"/>
       </router-link>
     </div>
<!--     <div class="createTag-wrapper">-->
<!--       <Button class="createTag"-->
<!--               @click="createTag">新增标签</Button>-->
<!--     </div>-->
   </Layout>
   <Nav/>
 </div>
</template>

<script lang="ts">
import {Component} from 'vue-property-decorator';
import Button from '@/components/Button.vue';
import {mixins} from 'vue-class-component';
import {TagHelper} from '@/mixins/TagHelper';
import Tabs from '@/components/Tabs.vue';
import recordTypeLists from '@/constants/recordTypeLists';

@Component({
  components: {Button,Tabs},
})
export default class Labels extends mixins(TagHelper){

  record:RecordItem={
    tags:{id:'',name:'',value:'',type:''},notes:'',type:'-',amount:0,createdAt:''
  }

  get tags(){
   const aa = this.$store.state.tagList as Tag[]
   return aa.filter(r=>r.type===this.record.type)
  }

  recordTypeList=recordTypeLists;

  beforeCreate(){
    this.$store.commit('fetchTags')
  }
}
</script>

<style lang="scss" scoped>
.tags {
  background: white;
  font-size: 15px;
  padding-left: 16px;
  > .tag {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
    svg {
      width: 22px;
      height: 22px;
      color: #01c1c6;
      margin-right: 16px;
    }
    .right{
      color:#e3e3e3;
    }
  }
}
//.createTag {
//  background: #767676;
//  color: white;
//  border-radius: 4px;
//  border: none;
//  height: 40px;
//  padding:0 16px;
//  &-wrapper {
//    text-align: center;
//    padding:16px;
//    margin-top:44-16px;
//  }
//}
.labels{
  display: flex;
  flex-direction: column;
  height: 100vh;
  >.labels-item{
      flex-grow: 1;
      overflow: auto;
  }
}
</style>