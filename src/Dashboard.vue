<template>
  <div id="dashboard">
    <h1 class="left-heading">管理</h1>
    <div class="pure-g">
      <div class="pure-u-1 pure-u-md-1-3">
        <div class="g-button-card" v-link="{ name:'manage-account' }">
          賬號管理
        </div>
      </div>
      <div class="pure-u-1 pure-u-md-1-3">
        <div class="g-button-card">
          公告管理
        </div>
      </div>
      <div class="pure-u-1 pure-u-md-1-3">
        <div class="g-button-card">
          系統狀態
        </div>
      </div>
    </div>
    <h1 class="left-heading">數據</h1>
    <div class="pure-g">

      <div class="pure-u-1 pure-u-md-1-3">
        <div class="g-button-card">
          查看日誌
        </div>
      </div>
      <div class="pure-u-1 pure-u-md-1-3">
        <div class="g-button-card">
          題庫統計
        </div>
      </div>
      <div class="pure-u-1 pure-u-md-1-3">
        <div class="g-button-card">
          使用記錄
        </div>
      </div>
    </div>
    <h1 class="left-heading">文檔</h1>
    <div class="pure-g">
      <div class="pure-u-1 pure-u-md-1-3">
        <div class="g-button-card">
          API接口
        </div>
      </div>
      <div class="pure-u-1 pure-u-md-1-3">
        <div class="g-button-card">
          題庫說明
        </div>
      </div>
      <div class="pure-u-1 pure-u-md-1-3">
        <div class="g-button-card">
          功課系統
        </div>
      </div>
      <div class="pure-u-1 pure-u-md-1-3">
        <div class="g-button-card">
          測評系統
        </div>
      </div>
      <div class="pure-u-1 pure-u-md-1-3">
        <div class="g-button-card">
          手機程式
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
#dashboard {
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 8px
}
</style>
