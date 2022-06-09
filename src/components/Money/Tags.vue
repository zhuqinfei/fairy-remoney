<template>
  <div class="tags">
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
  </div>
</template>

<script lang="ts">
import {Component,Prop,Watch} from 'vue-property-decorator';
import {TagHelper} from '@/mixins/TagHelper';
import {mixins} from 'vue-class-component';

@Component
export default class Tags extends mixins(TagHelper) {
  @Prop(String) type?:string
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