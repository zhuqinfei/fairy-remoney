<template>
  <div class="tags">

<!--      <button @click="createTag">新增标签</button>-->

    <div class="tag" v-for="tag in newTagList"
         :key="tag.id"
         @click="toggle(tag)">
        <TagsIcons :name="tag.name" :value="tag.value"
                   :class="{selected:selectedTags.name===tag.name}"/>
    </div>
    <router-link to="/tagsList" class="new" >
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-tianjia"></use>
      </svg>
      <div class="add">新增</div>
    </router-link>
    <router-link to="/labels" class="new" >
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-shanchu"></use>
      </svg>
      <div class="delete">删除</div>
    </router-link>

<!--    <ul class="current">-->
<!--      <li v-for="tag in tagList" :key="tag.id"-->
<!--          :class="{selected:selectedTags.indexOf(tag)>=0}"-->
<!--          @click="toggle(tag)">{{tag.name}}</li>-->
<!--    </ul>-->
  </div>
</template>

<script lang="ts">
import {Component,Prop,Watch} from 'vue-property-decorator';
import {TagHelper} from '@/mixins/TagHelper';
import {mixins} from 'vue-class-component';

@Component
export default class Tags extends mixins(TagHelper) {
  @Prop(String) type?:string

  // selectedTags: string[] = [];
  // selectedTags:Tag={id:'1',name:'canyin',value:'餐饮',type:'-'}
   selectedTags:Tag={id:'',name:'',value:'',type:''}


  get tagList(){
    return this.$store.state.tagList as Tag[];
  }

  get newTagList(){
    const {tagList}=this
    const aa= tagList.filter(r=>r.type===this.type)
    this.selectedTags=aa[0]
    return aa
  }

 @Watch('selectedTags')
 onToggleChange(newValue:Tag){
   this.$emit('update:value',newValue)
 }

  created(){
    this.$store.commit('fetchTags')
    this.$emit('update:value',this.selectedTags)
  }
  toggle(tag: Tag) {
    this.selectedTags=tag
    this.$emit('update:value',this.selectedTags)
    // const index = this.selectedTags.indexOf(tag);
    // if (index >= 0) {
    //   this.selectedTags.splice(index, 1);
    // } else {
    //   this.selectedTags.push(tag);
    // }
    // this.$emit('update:value',this.selectedTags)
  }
}
</script>

<style lang="scss" scoped>
.tags{
  background: white;
  padding:16px 0;
  flex-grow:1;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  overflow:auto;
  >.tag{
      display:flex;
      flex-direction: row;
      flex-wrap:wrap;
      background: #ffffff;

      width:25%;
      overflow:hidden;
    ::v-deep.tagIcons{
      flex-grow: 1;
      align-items: center;

    }
  }
  //> .current {
  //  display: flex;
  //  flex-wrap: wrap;
  //  > li {
  //    background: #d9d9d9;
  //    height: 24px;
  //    line-height: 24px;
  //    border-radius: (24px/2);
  //    padding: 0 16px;
  //    margin-right: 12px;
  //    margin-top: 4px;
  //    $bg:#d9d9d9;
  //    &.selected{
  //      background:red;
  //      color:white;
  //    }
  //  }
  //}
  >.new{
    display: flex;
    font-size: 12px;
    flex-direction: column;
    align-items: center;
    width: 25%;
    >.icon {
      width: 3.5em; height: 3.5em;
      vertical-align: -0.15em;
      fill: currentColor;
      overflow: hidden;
      -webkit-border-radius: 50%;
      -moz-border-radius: 50%;
      border-radius: 50%;
      background: #f6f6f6;
      margin:20px 25px 4px 25px;
      padding:10px 10px;
    }
    >.add,.delete{
      margin:0 auto;
    }
  }

  .selected{
     ::v-deep.icon{
        background: #01c1c6;
     }
  }
}

</style>