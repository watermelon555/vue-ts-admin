<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">
        画布拖拽
      </h3>
      <div>
        画布拖拽123
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { SettingsModule } from '@/store/modules/settings'

@Component({
  name: 'CanvasDrag'
})
export default class extends Vue {

  get sidebarTextTheme() {
    return SettingsModule.sidebarTextTheme
  }

  set sidebarTextTheme(value) {
    SettingsModule.ChangeSetting({ key: 'sidebarTextTheme', value })
  }

  private themeChange(value: string) {
    SettingsModule.ChangeSetting({ key: 'theme', value })
  }
}
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, .85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, .65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right
  }
}
</style>
