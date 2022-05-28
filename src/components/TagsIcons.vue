<template>
  <div class="tagIcons" @click="selectedTag" >
    <svg class="icon" aria-hidden="true" id="demo3">
      <use :xlink:href="'#icon-'+name"/>
    </svg>
    <div class="Iconfont" :id="name">{{value}}</div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import {Component,Prop} from 'vue-property-decorator';

@Component
export default class TagsIcons extends Vue{
  @Prop(String) name!:string
  @Prop(String) value!:string
  @Prop(String) type!:string

   selectedTag(tagsIcons:any){
     const aa:string=tagsIcons.currentTarget.querySelector('.Iconfont').id
     const bb:string=tagsIcons.currentTarget.querySelector('.Iconfont').innerText
     const cc:string=this.type
     this.$emit('getTagsListData',[aa,bb,cc])
    }




}
</script>

<style lang="scss" scoped>

.tagIcons{
  display: flex;
  font-size: 12px;
  flex-direction: column;
  align-items: center;
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
  >.Iconfont{
    margin:0 auto;
  }
}


</style>