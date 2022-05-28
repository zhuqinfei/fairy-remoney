<template>
  <div class="tagLists">
    <Tabs :data-source="recordTypeList"
          :value.sync="record.type"
    />
    <div class="selectedTag">
      <div class="selectedTagItem">选中标签</div>
      <div class="navIcon">
        <svg class="icon" aria-hidden="true">
          <use :xlink:href="'#icon-'+selectedTag.name"/>
        </svg>
        <div>{{selectedTag.value}}</div>
      </div>
      <div class="finish" @click="accomplish">完成</div>
    </div>
    <div class="tagLists-Icon" >
      <TagsIcons  v-for="(item,index) in newIconsList"
                  :key="index"
                  :name=" item.name"
                  :value=" item.value"
                  :type=" item.type "
                  :class="{selected:item.name===selectedTag.name}"
                  class="TagsIcon"
                  @getTagsListData="TagsListData"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Tabs from '@/components/Tabs.vue';
import recordTypeLists from '@/constants/recordTypeLists';
import iconsList from '@/constants/iconsList';

const map:{[key:string]:string}={
  'tag name duplicated':'标签名重复'
}

@Component({
  components:{Tabs},
  computed:{
    recordList(){
      return this.$store.state.recordList;
    }
  }
})
export default class IconType extends Vue {

  selectedTag={name:'',value:'',type:''}

  get recordList(){
    return this.$store.state.recordList;
  }
  created(){
    this.$store.commit('fetchRecords' )
  }
  recordTypeList=recordTypeLists;
  iconsList= iconsList

  record:RecordItem={
    tags:{id:'',name:'',value:'',type:''},notes:'',type:'-',amount:0,createdAt:''
  }

  get newIconsList(){
    const {iconsList}=this
    const aa= iconsList.filter(r=>r.type===this.record.type)
    this.selectedTag=aa[0]
    return aa
  }

  TagsListData(options:string[]){
    return this.selectedTag={name:options[0],value:options[1],type:options[2]}
  }

  accomplish(){
    this.$store.commit('createTag',this.selectedTag)
    if(this.$store.state.createTagError){
      window.alert(map[this.$store.state.createTagError.message] || '未知错误' )
    }
  }

}
</script>

<style lang="scss" scoped>
.tagLists{
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #ffffff;
  .tagLists-Icon{
    display:flex;
    flex-direction: row;
    flex-wrap:wrap;
    background: #ffffff;
    overflow:auto;
    ::v-deep.TagsIcon{
      width: 25%;
      &.selected{
        >.icon{
          border: 1px solid #01c1c6;
        }
      }
    }
  }
}
.selectedTag{
  display:flex;
  align-items: center;
  text-align: center;
  padding:10px 0;
  border-bottom: 1px solid #d6d6d6;
  box-shadow: 0px 1px 3px 0px rgba(179,179,179,1);
  >.navIcon{
    width: 60%;
    color: #01c1c6;
    display: flex;
    align-items: center;
    margin:0 0 0 10px;
    >svg{
      width: 22px;
      height: 22px;
      color: #01c1c6;
    }
  }
  >.selectedTagItem{
    width: 20%;
    margin:0 0 0 10px;
  }
  >.finish{
    width: 20%;
    margin:0 0 0 10px;
  }
}
</style>