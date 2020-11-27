
<template>
  <el-form-item v-if="item.type === 'input'">
    <label slot="label">{{ item.label }}</label>
    <el-input v-model="item.name"></el-input>
  </el-form-item>
  <el-form-item v-else-if="item.type === 'select'">
    <label slot="label">{{ item.label }}</label>
    <el-select v-model="item.name" :placeholder="item.placeholder">
      <el-option v-for="data in item.options" v-bind:value="data.value">
        <label slot="label">{{ data.label }}</label>
      </el-option>
    </el-select>
  </el-form-item>
  <el-form-item v-else-if="item.type === 'date'">
    <label slot="label">{{ item.label }}</label>
    <el-col :span="11">
      <el-date-picker type="date" :placeholder="item.placeholder" v-model="item.date1" style="width: 100%;"></el-date-picker>
    </el-col>
    <el-col class="line" :span="2">-</el-col>
    <el-col :span="11">
      <el-time-picker :placeholder="item.placeholder" v-model="item.date2" style="width: 100%;"></el-time-picker>
    </el-col>
  </el-form-item>
  <el-form-item v-else-if="item.type === 'switch'">
    <label slot="label">{{ item.label }}</label>
    <el-switch v-model="item.delivery"></el-switch>
  </el-form-item>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import {IType} from "@/views/salary/send-record.vue";

const version = require('element-ui/package.json').version // element-ui version from node_modules
const ORIGINAL_THEME = '#409EFF' // default color

@Component({
  name: 'FormItem'
})

export default class extends Vue {
  @Prop({}) item: IType | undefined
  mounted() {

  }


}
</script>

<style lang="scss">
.theme-message,
.theme-picker-dropdown {
  z-index: 99999 !important;
}

.theme-picker .el-color-picker__trigger {
  height: 26px !important;
  width: 26px !important;
  padding: 2px;
}

.theme-picker-dropdown .el-color-dropdown__link-btn {
  display: none;
}
</style>
