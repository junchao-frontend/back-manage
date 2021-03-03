<template>
  <div>
    <el-card class="card1">
      <div slot="header" class="clearfix">
        <!-- 面包屑 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 面包屑 -->
      </div>
      <!-- form表单 -->
      <el-form ref="form" :model="form" label-width="40px" size="mini">
        <el-form-item label="状态">
          <el-radio-group v-model="status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="channelId" placeholder="请选择频道">
            <el-option label="全部" :value="null"></el-option>
            <el-option
              :label="a.name"
              :value="a.id"
              v-for="(a, index) in channels"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="rangeDate"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <!-- button按钮的点击事件有个默认参数，当你没有指定参数的时候，它会默认传一个没有用的数据 -->
          <el-button type="primary" :disabled="loading" @click="loadArticles(1)"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
      <!-- form表单 -->
    </el-card>
    <el-card class="card2">
      <div slot="header" class="clearfix">
        根据筛选条件共查询{{ totalCount }}条结果：
      </div>
      <!-- 列表数据 -->
      <!-- 1.把需要展示的数组列表数据绑定给table组件的data属性
      2.设计表格列 el-table-column
      width可以设定表格列的宽度
      label可以设定列的标题
      prop用来设定要渲染的列表项数据字段 -->
      <el-table
        :data="articles"
        stripe
        style="width: 100%"
        class="table1"
        v-loading="loading"
      >
        <el-table-column label="封面">
          <template slot-scope="scope">
            <img
              class="article-cover"
              v-if="scope.row.cover.images[0]"
              :src="scope.row.cover.images[0]"
            />
            <img class="article-cover" v-else src="./1234.png" alt="" />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"> </el-table-column>
        <el-table-column label="状态">
          <!-- 如果需要在自定义模板列中获取当前遍历的数据 那就在templete上声明
          slot-scope=“scope” -->
          <template slot-scope="scope">
            <el-tag :type="articleStatus[scope.row.status].type">
              {{ articleStatus[scope.row.status].text }}
            </el-tag>
            <!-- <el-tag type="success" v-if="scope.row.status === 0">草稿</el-tag>
            <el-tag type="success" v-else-if="scope.row.status === 1"
              >待审核</el-tag
            >
            <el-tag type="success" v-else-if="scope.row.status === 2"
              >审核通过</el-tag
            >
            <el-tag type="success" v-else-if="scope.row.status === 3"
              >审核失败</el-tag
            >
            <el-tag type="success" v-else-if="scope.row.status === 4"
              >已删除</el-tag
            > -->
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"> </el-table-column>
        <el-table-column label="操作">
          <!-- 如果需要自定义表格列模板，则把需要自定义的内容放到template里面 -->
          <template>
            <el-button
              size="mini"
              circle
              type="primary"
              icon="el-icon-edit"
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              circle
              icon="el-icon-delete"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 列表数据 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalCount"
        :disabled="loading"
        @current-change="onCurrentChange"
        :page-size="pageSize"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getArticles, getArticleChannels } from '@/api/article'
export default {
  name: "ArticleIndex",

  data () {
    return {
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
      value1: '',
      articles: [],
      articleStatus: [
        { status: 0, text: '草稿', type: 'info' },//索引是0
        { status: 1, text: '待审核', type: '' },//1
        { status: 2, text: '审核通过', type: 'success' },//2
        { status: 3, text: '审核失败', type: 'warning' },//3
        { status: 4, text: '已删除', type: 'danger' }//4
      ],
      totalCount: 0,//总数据条数
      pageSize: 10,  //每页大小
      status: null, //查询文章状态，不传默认全部
      channels: [],
      channelId: null,
      rangeDate: [null],
      loading: true
    };
  },
  created () {
    this.loadArticles(1)
    this.loadChannels()
  },
  methods: {
    loadArticles (page = 1) {
      this.loading = true
      getArticles({
        page,
        per_page: this.pageSize,
        status: this.status,
        channel_id: this.channelId,
        begin_pubdate: this.rangeDate ? this.rangeDate[0] : null,
        end_pubdate: this.rangeDate ? this.rangeDate[1] : null
      }).then(res => {
        // this.articles = res.data.data.results
        // this.totalCount = res.data.data.total_count
        const { results, total_count: totalCount } = res.data.data
        this.articles = results
        this.totalCount = totalCount
        this.loading = false
      })
    },
    onCurrentChange (page) {
      this.loadArticles(page)
    },

    loadChannels () {
      getArticleChannels().then(res => {
        this.channels = res.data.data.channels
      })
    }
  }
};
</script>
<style>
.card1 {
  margin-bottom: 30px;
}
.table1 {
  margin-bottom: 20px;
}
.article-cover {
  width: 100px;
  background-size: cover;
}
</style>