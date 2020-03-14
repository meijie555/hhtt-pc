<template>
  <el-select :value="value" @change="fn" placeholder="请选择" clearable>
            <el-option
              v-for="item in channelOptions"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
</template>

<script>
export default {
  name: 'my-channel',
  props: ['value'],
  data () {
    return {
      channelOptions: []
    }
  },
  created () {
    this.getChannelOptions()
  },
  methods: {
    // 频道数据变化函数
    fn (channelId) {
      if (channelId === '') channelId = null
      this.$emit('input', channelId)
    },
    // 频道列表数据
    async getChannelOptions () {
      // 获取数据
      const {
        data: { data }
      } = await this.$http.get('channels')
      // 赋值 channelOptions
      this.channelOptions = data.channels
    }
  }
}
</script>

<style scoped lang='less'></style>
