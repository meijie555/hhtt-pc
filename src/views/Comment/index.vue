<template>
  <div class='container-comment'>
    <el-card>
      <div slot="header">
        <my-bread>评论管理</my-bread>
      </div>
      <!-- 表格 -->
      <el-table :data="articles">
        <el-table-column label="标题" width="400"></el-table-column>
        <el-table-column label="总评论数"></el-table-column>
        <el-table-column label="粉丝评论数"></el-table-column>
        <el-table-column label="状态"></el-table-column>
        <el-table-column label="操作" width="120"></el-table-column>
      </el-table>
      <!-- 分页 -->
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      articles: []
    }
  }
}
</script>

<style scoped lang='less'></style>
