<template>
  <div class="not-found">
    <div class="not-found-inner">
      <div class="not-found-img">
        <img src="/static/images/404.png" alt="" />
      </div>
      <h5>404</h5>
      <p>糟糕... 页面被外星人抓走了~</p>
    </div>
  </div>
</template>

<script>

import { IS_DEV } from '@util'

export default {
    created(){
        
    }
}
</script>

<style lang="scss" scoped>
@import '~@style/index.scss';

.not-found {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;

  .not-found-inner {
    position: relative;
    top: 40px;
    h5 {
      line-height: 30px;
      font-size: 22px;
      padding: 10px 0;
      color: $cl-main;
    }
    .not-found-img {
      img {
        width: 60px;
      }
    }
    p {
      color: $cl-main;
      color: #999;
      font-size: 12px;
    }
  }
}
</style>