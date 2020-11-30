<template>
  <el-form ref="form" :model="form" label-width="80px">
    <FormItem v-for="(item, index) in formType" :key="index" :item="item"></FormItem>
    <!--<el-form-item label="活动区域">
      <el-select v-model="form.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="活动时间">
      <el-col :span="11">
        <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
      </el-col>
      <el-col class="line" :span="2">-</el-col>
      <el-col :span="11">
        <el-time-picker placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
      </el-col>
    </el-form-item>
    <el-form-item label="即时配送">
      <el-switch v-model="form.delivery"></el-switch>
    </el-form-item>
    <el-form-item label="活动性质">
      <el-checkbox-group v-model="form.type">
        <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
        <el-checkbox label="地推活动" name="type"></el-checkbox>
        <el-checkbox label="线下主题活动" name="type"></el-checkbox>
        <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="特殊资源">
      <el-radio-group v-model="form.resource">
        <el-radio label="线上品牌商赞助"></el-radio>
        <el-radio label="线下场地免费"></el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="活动形式">
      <el-input type="textarea" v-model="form.desc"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>-->

    <SubmitButton :submit="submit"></SubmitButton>
  </el-form>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator'
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


  mounted() {
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
