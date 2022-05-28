<template>
  <div class="numberPad">
    <div class="output">{{output}}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="remove">删除</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="clear">清空</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button @click="ok" class="ok">OK</button>
      <button @click="inputContent" class="zero">0</button>
      <button @click="inputContent">.</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
@Component
export default class NumberPad extends Vue {
   output: string = '0';

  inputContent(event: MouseEvent) {
    const button = (event.target as HTMLButtonElement);
    const input =button.textContent !; //!表示不会为空
    if(this.output.length===16){return;}
    if(this.output === '0'){
      if('0123456789'.indexOf(input)>=0){
        this.output=input
      }else{
        this.output+=input
      }
      return;
    }
    if (this.output.indexOf('.') >= 0 && input === '.') {return;}
       this.output+=input
  }
  remove(){
    if(this.output.length===1){
      this.output='0'
    }else{
      this.output=this.output.slice(0,-1)
    }
  }
  clear(){
    this.output= '0'
  }
  ok(){
    const number=parseFloat(this.output)
    this.$emit('update:value',number)
    this.$emit('submit',number)
    this.output='0'
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/helper.scss";
.numberPad{
  .output{

    font-size:24px;
    font-family:Consolas,monospace;
    padding:7px 16px;
    text-align: right;
    height:50px;
  }
  .buttons{
    @extend %clearFix;
    > button{
      width:25%;
      height:55px;
      float:left;
      background:#eff0f4;
      border:1px solid #e5e6ea;
      &.ok{
        height: 55*2px;
        float:right;
      }
      &.zero{
        width:25*2%
      }
    }
  }
}
</style>