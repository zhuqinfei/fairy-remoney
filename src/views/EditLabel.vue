<template>
  <div class="edit">
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click="goBack"/>
      <span class="title">标签管理</span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
      <div class="IconLabel">
        <div  class="common">图标</div>
        <svg class="icon" aria-hidden="true" >
          <use :xlink:href="'#icon-'+currentTag.name"/>
        </svg>
      </div>
      <div class="IconName">
        <div class="common">名称</div>
        <div>{{currentTag.value}}</div>
      </div>
    </div>
    <div class="button-wrapper">
      <Button @click="remove">删除标签</Button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import FormItem from '@/components/Money/FormItem.vue';
import Button from '@/components/Button.vue';

@Component({
  components: {Button, FormItem},
})
export default class EditLabel extends Vue {
   get currentTag(){
     return this.$store.state.currentTag;
   }

   created(){
     const id=this.$route.params.id
     this.$store.commit('fetchTags')
     this.$store.commit('setCurrentTag',id);
     if(!this.currentTag){
       this.$router.replace('/404')
     }
   }
  update(name:string){
     if(this.currentTag){
       this.$store.commit('updateTag',{
         id:this.currentTag.id,name:name
       })
     }
  }
  remove(){
    if(this.currentTag){
      this.$store.commit('removeTag',this.currentTag.id)
    }
  }
  goBack(){
     this.$router.back()
  }
}
</script>

<style lang="scss" scoped>
.edit{
  position: relative;
}

.navBar{
  text-align: center;
  font-size: 16px;
  padding:12px 16px 160px 16px;
  background: linear-gradient(45deg, rgba(50,213,196,1) 0%,rgba(50,213,196,1) 50%,rgba(10,203,221,1) 51%,rgba(10,203,221,1) 100%);
  color:#ffffff;
  clip-path: ellipse(80% 60% at 50% 40%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  > .title {

  }
  > .leftIcon{
    width:24px;
    height: 24px;
  }
  > .rightIcon{
    width:24px;
    height: 24px;
  }
}
.form-wrapper{
  position: absolute;
  background: white;
  width: 94%;
  top:120px;
  left: 3%;
  padding:10px 0 30px 0;
  border-radius:4px;
  box-shadow: 0px 1px 5px 0px rgba(189,189,189,1);
  z-index: 10;
  >.IconLabel,.IconName{
    border-bottom:1px solid #f0f0f0;
    display: flex;
    align-items: center;
    margin: 0 20px;
    padding:20px 0 20px 0;
    >.common{
      width:20%;
      color:#9a9a9a;
    }
    >svg{
      width: 22px;
      height: 22px;
      color: #01c1c6;
      margin-right: 16px;
    }
  }


  //>.IconLabel,.IconName{
  //  border-bottom:1px solid #f0f0f0;
  //  margin:0 22px;
  //  padding:15px 0;
  //  display: flex;
  //  align-items: center;
  //  >.common{
  //    width:16%;
  //    color:#9a9a9a;
  //  }
  //  >svg{
  //    width: 18px;
  //    height: 18px;
  //    color: #01c1c6;
  //    margin-right: 16px;
  //  }
  //}
}
.button-wrapper {
  position: absolute;
  top:380px;
  width: 100%;
  text-align: center;
  padding:16px;
  margin-top:44-16px;
  z-index: 11;
}
</style>