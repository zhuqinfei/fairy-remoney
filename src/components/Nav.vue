<template>
  <nav>
    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name="statistics"/>
      明细
    </router-link>
    <router-link to="/money" class="item" active-class="selected">
      <Icon name="money"/>
      记账
    </router-link>
    <router-link to="/chart" class="item" active-class="selected">
      <Icon name="chart"/>
      图表
    </router-link>
    <router-link to="/account" class="item" active-class="selected">
      <Icon name="account"/>
      账单
    </router-link>
  </nav>
</template>

<script lang="ts">

export default {
  name: 'Nav'
};
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/helper.scss";
 nav{
   display:flex;
   @extend %outerShadow;
   flex-direction: row;
   font-size: 12px;
   > .item{
     padding:2px 0;
     width:33%;
     display: flex;
     justify-content: center;
     align-items:center;
     flex-direction: column;
     .icon {
       width:30px;
       height:30px;
     }
   }
   > .item.selected{
     color:#01c1c6;
   }
 }
</style>