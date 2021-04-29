<style scoped>
  .banner {
    text-align: center;
  }
  .banner-desc {
    padding-top: 20px;
    h1 {
      font-size: <%= titleSize >px;
      margin: 0;
      line-height: 48px;
      color: #555;
    }
    p {
      font-size: <%= paraSize >px;
      line-height: 28px;
      color: #888;
      margin: 10px 0 5px;
    }
  }
</style>
<template>
  <div>
    <div class="banner">
      <div class="banner-desc">
        <h1><%= 1 ></h1>
        <p><%= 2 ></p>
      </div>
    </div>
  </div>
</template>
<script>
  
  export default {
    data() {
      return {
        mainImgOffset: 0
      };
    }
  };
</script>