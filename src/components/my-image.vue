<template>
  <div class="my-image">
    <!-- 按钮 -->
    <div class="btn_box" @click="open">
      <img src="../assets/default.png" alt />
    </div>
    <!-- 对话框 -->
    <el-dialog :visible.sync="dialogVisible" width="750px">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="image">
          <!-- 按钮 -->
          <el-radio-group @change="toggleList" v-model="reqParams.collect" size="small">
            <el-radio-button :label="false">全部</el-radio-button>
            <el-radio-button :label="true">收藏</el-radio-button>
          </el-radio-group>
          <!-- 列表 -->
          <div class="img_list">
            <div :class="{selected:selectedImageUrl===item.url}"  @click="selectedImage(item.url)" class="img_item" v-for="item in images" :key="item.id">
              <img :src="item.url" />
            </div>
          </div>
          <!-- 分页 -->
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="reqParams.per_page"
            :current-page="reqParams.page"
            @current-change="pager"
          ></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="上传图片" name="upload">2</el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'my-image',
  data () {
    return {
      // 控制对话框显示与隐藏
      dialogVisible: false,
      // 当前激活选项卡的name的值
      activeName: 'image',
      // 提交的筛选参数
      reqParams: {
        collect: false,
        page: 1,
        per_page: 8
      },
      // 图片列表
      images: [],
      // 总条数
      total: 0,
      // 当前选中的图片地址
      selectedImageUrl: null
    }
  },
  methods: {
    // 选中图片
    selectedImage (url) {
      this.selectedImageUrl = url
    },
    // 切换 全部与收藏 列表
    toggleList () {
      this.reqParams.page = 1
      this.getImages()
    },
    // 分页
    pager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    // 打开对话框
    open () {
      this.dialogVisible = true
      this.getImages()
    },
    // 获取素材列表
    async getImages () {
      const {
        data: { data }
      } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    }
  }
}
</script>

<style scoped lang='less'>
.btn_box {
  width: 150px;
  height: 150px;
  border: 1px dashed #ddd;
  img {
    width: 100%;
    height: 100%;
    display: block;
  }
}
.dialog-footer {
  width: 100%;
  text-align: center;
  display: inline-block;
}
.img_list {
  margin-top: 20px;
  .img_item {
    width: 150px;
    height: 120px;
    border: 1px dashed #ddd;
    position: relative;
    display: inline-block;
    margin-right: 20px;
    margin-bottom: 20px;
    &.selected::after{
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.3) url(../assets/selected.png) no-repeat center / 50px 50px;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
