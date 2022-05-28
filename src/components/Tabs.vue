<template>
  <div class="tabs-wrapper">
      <svg class="icon" aria-hidden="true" @click="goBack">
        <use xlink:href="#icon-houtui"></use>
      </svg>
    <ul class='tabs' :class="{[classPrefix+'-tabs']:classPrefix}">
      <li v-for="item in dataSource" :key="item.value"
          class="tabs-item" :class="liClass(item)"
          @click="select(item)">{{item.text}}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

type DataSourceItem={text:string,value:string}

@Component
export default class Tabs extends Vue {
   @Prop({required:true,type:Array}) dataSource!:DataSourceItem[]
   @Prop(String) readonly value!:string;
   @Prop(String) classPrefix?:string;

   liClass(item:DataSourceItem){
     return{
       selected:item.value===this.value,[this.classPrefix+'-tabs-item']:this.classPrefix
     }
     }

   select(item:DataSourceItem){
     this.$emit('update:value',item.value)
   }

   goBack(){
     if(this.$route.path==='/money'){
       this.$router.push('/statistics')
     }else{
       this.$router.back()
     }
   }
}
</script>

<style lang="scss" scoped>
.tabs-wrapper{
  height: 60px;
  background: #01c1c6;
  position: relative;
  >svg{
    position: absolute;
    top:9px;
    left:4px;
    color:#ffffff;
    width: 2.6em; height: 2.6em;
  }
}

.tabs{
  background: #01c1c6;
  display:flex;
  text-align:center;
  font-size:16px;
  color:#ffffff;
  margin: 8px auto;
  width: 200px;
  border-radius: 4px;
  border:1px solid #ffffff;
  &-item{
    width:50%;
    height:40px;
    display: flex;
    justify-content: center;
    align-items: center;
    &.selected{
      background: #ffffff;
      color:#01c1c6;
    }
  }
}
</style>