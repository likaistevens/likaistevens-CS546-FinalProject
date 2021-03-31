<template>
  <div>
    <div class="header">
      header
      <el-button type="text" style="float: right; margin-right: 20px" @click="onBack">EXIT</el-button>
    </div>
    <div class="main"><router-view /></div>
    <div class="footer">footer</div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  mounted() {

  },
  methods: {
    onBack() {
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>
<style lang='scss'>
html{
  min-width: 1180px;
  min-height: 500px;
}
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  font-size: 14px;
}
a {
  text-decoration: none;
  cursor: pointer;
}
</style>
<style lang="scss" scoped>
.header{
    height: 50px;
    width: 100%;
    background: gray;
}
.main{
    height: calc(100vh - 100px);
    overflow: auto;
}
.footer{
    height: 50px;
    width: 100%;
    background: gray;
}
</style>
