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
      <el-form
        ref="publish-form"
        :model="article"
        label-width="60px"
        :rules="PublishRules"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="article.title"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-input type="textarea" v-model="article.content"></el-input>
          <!-- <el-tiptap
            v-model="article.content"
            :extensions="extensions"
          ></el-tiptap> -->
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.cover.type">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="频道" prop="channel_id">
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
// import {
//   // 需要的 extensions
//   ElementTiptap,
//   Doc,
//   Text,
//   Paragraph,
//   Heading,
//   Bold,
//   Underline,
//   Italic,
//   Strike,
//   ListItem,
//   BulletList,
//   OrderedList
// } from 'element-tiptap'
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
        channel_id: null,
        cover: { //文章封面
          type: 0,//封面类型 -1 自动 0 无图 1-1张 3-3 张
          images: [], //封面图片的地址
        },

      },
      PublishRules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ],
        channel_id: [
          { required: true, message: '请选择文章频道' }
        ]
      }
      // extensions: [
      //   new Doc(),
      //   new Text(),
      //   new Paragraph(),
      //   new Heading({ level: 5 }),
      //   new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
      //   new Underline({ bubble: true, menubar: false }), // 在气泡菜单而不在菜单栏中渲染菜单按钮
      //   new Italic(),
      //   new Strike(),
      //   new ListItem(),
      //   new BulletList(),
      //   new OrderedList()
      // ]
    }

  },
  components: {

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
      this.$refs['publish-form'].validate(valid => {
        if (!valid) {
          return
        }
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
      })
      //const articleId = this.$route.query.id

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
