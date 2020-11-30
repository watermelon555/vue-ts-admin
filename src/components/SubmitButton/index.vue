
<template>
  <el-form-item>
    <el-button type="primary" @click="submit.onSubmit">{{submit.confirm}}</el-button>
    <el-button @click="submit.onCancel">{{submit.cancel}}</el-button>
  </el-form-item>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

export interface SubmitAction{
  confirm: string
  cancel: string
  onSubmit: Function
  onCancel: Function
}
@Component({
  name: 'SubmitButton'
})
export default class extends Vue {
  @Prop( {}) private submit: SubmitAction | undefined

}
</script>

<style lang="scss" scoped>
.svg-icon {
  vertical-align: middle;
}

.is-active {
  transform: rotate(180deg);
}
</style>
