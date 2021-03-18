<template>
  <div class="publish-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{
            $route.query.id ? `修改文章` : `发布文章`
          }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-form ref="form" :model="form" label-width="40px">
        <el-form-item label="标题">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容">
          <el-input type="textarea" v-model="article.content"></el-input>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="频道">
          <el-select v-model="article.channel_id" placeholder="请选择频道">
            <el-option
              :label="channels.name"
              :value="channels.id"
              v-for="(channels, index) in channels"
              :key="index"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onPublish((draft = false))"
            >发表</el-button
          >
          <el-button @click="onPublish((draft = true))">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getArticleChannels, addArticle, getArticle, updateArticle } from '@/api/article'
export default {
  name: 'PublishIndex',

  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      channels: [],
      article: {
        title: '',//文章标题
        content: '',//文章内容
        cover: { //文章封面
          type: 0,//封面类型 -1 自动 0 无图 1-1张 3-3 张
          images: [], //封面图片的地址
          channels_id: null
        }
      }
    }
  },
  created () {
    this.loadChannels()

    //由于我们让发布文章和修改用同一个组件
    //所以这里需要判断
    //如果路由路径参数中有id，则请求展示文章内容
    if (this.$route.query.id) {
      this.loadArticle()
    }
  },
  methods: {
    onPublish (draft = false) {
      //const articleId = this.$route.query.id
      if (this.$route.query.id) {
        updateArticle(this.$route.query.id, this.article, draft).then(res => {
          console.log(res)
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.$router.push('/article')
        })
      } else {
        addArticle(this.article, draft).then(res => {
          console.log(res)
          this.$message({
            message: '发布成功',
            type: 'success'
          })
          this.$router.push('/article')
        })
      }
    },
    loadChannels () {
      getArticleChannels().then(res => {
        this.channels = res.data.data.channels
      })
    },
    loadArticle () {
      getArticle(this.$route.query.id).then(res => {
        this.article = res.data.data
      })
    }
  }
}
</script>
