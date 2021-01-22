<template>
  <el-form ref="form" :model="form" label-width="80px">
    <FormItem v-for="(item, index) in formType" :key="index" :item="item"></FormItem>
    <SubmitButton :submit="submit"></SubmitButton>
  </el-form>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator'
import FormItem from "@/components/FormItem/index.vue";
import SubmitButton, { SubmitAction } from "@/components/SubmitButton/index.vue";

export interface IType {
  type: string
  name: string
  label: string
  placeholder: string
  date1?: string
  date2?: string
  options?: OptionsData[]
  delivery?: string
}

export interface OptionsData {
  value: string
  label: string
}

@Component({
  name: 'SendRecord',
  components: {SubmitButton, FormItem}
})
export default class extends Vue {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  }

  private options: OptionsData[] = [
    {
      value: '历史',
      label: '历史记录'
    },
    {
      value: '活动',
      label: '活动内容'
    }
  ]

  private date: OptionsData[] = [
    {
      value: '历史',
      label: '历史记录'
    },
    {
      value: '活动',
      label: '活动内容'
    }
  ]




  private formType: IType[] = [
    {
      type: 'input',
      name: '活动',
      label: '活动内容',
      placeholder: '输入'
    },
    {
      type: 'select',
      name: '活动',
      label: '活动内容',
      placeholder: '请选择',
      options: this.options
    },
    {
      type: 'date',
      name: '活动',
      label: '活动时间',
      placeholder: '请选择',
      date1: '',
      date2: ''
    },
    {
      type: 'switch',
      label: '即时配送',
      name: '',
      placeholder: '请选择',
      delivery: ''
    }
  ]
  private submit: SubmitAction={
    confirm: '确定',
    cancel: '取消',
    onSubmit: this.onSubmit,
    onCancel: this.onCancel
  }


  public onCancel() {
    console.log('取消')
  }


  public onSubmit() {
    console.log('确定', this.formType)
  }

}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
