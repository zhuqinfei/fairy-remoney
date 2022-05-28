<template>
    <label class="formItem">
      <span class="name">{{this.fieldName}}</span>
      <input type="text"
             :value="value"
             @input="onValueChange($event.target.value)"
             :placeholder="placeholder">
    </label>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component,Prop} from 'vue-property-decorator';



@Component
export default class FormItem extends Vue {
  @Prop({default: ''}) readonly value!: string
  @Prop({required: true}) fieldName!: string
  @Prop() placeholder?: string

  onValueChange(value: string) {
    this.$emit('update:value', value)
  }

}
</script>

<style lang="scss" scoped>
.formItem{
  font-size:14px;
  display: flex;
  align-items:center;
  border-radius: 4px;
  border:1px solid #DCDFE6;
  background: #ffffff;
  width: 60%;
  > .name{
    width:100%;
    margin:0 0 0 14px;
  }
  input{
    height:20px;
    flex-grow:1;
    background: transparent;
    border:none;
    width: 160px;
  }
}
</style>