<template>
  <div class='container-comment'>
    <el-card>
      <div slot="header">
        <my-bread>评论管理</my-bread>
      </div>
     <!-- 表格 -->
      <el-table :data="articles">
        <el-table-column label="标题" width="400" prop="title"></el-table-column>
        <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
        <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">{{scope.row.comment_status?'正常':'关闭'}}</template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button v-if="scope.row.comment_status" type="danger" size="small">关闭评论</el-button>
            <el-button v-else type="success" size="small">打开评论</el-button>
          </template>
        </el-table-column>
      </el-table>
            <!-- 分页 -->
      <el-pagination
        style="margin-top:20px"
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        @current-change="pager"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 文章列表
      articles: [],
      // 请求参数
      reqParams: {
        response_type: 'comment',
        page: 1,
        per_page: 20
      },
      // 总条数
      total: 0
    }
  },
  created () {
    this.getArticles()
  },
  methods: {
    // 分页函数
    pager (newPage) {
    // 修改当前的页码为新的页码
      this.reqParams.page = newPage
      // 重新获取数据
      this.getArticles()
    },
    // 列表渲染
    async getArticles () {
      const {
        data: { data }
      } = await this.$http.get('articles', { params: this.reqParams })
      this.articles = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang='less'></style>
