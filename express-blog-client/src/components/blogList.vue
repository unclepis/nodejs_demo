<template>
  <Card style="margin:0 10px">
    <p
      slot="title"
      style="text-align: left;"
    >
      <Icon type="ios-film-outline"></Icon>
      博客列表
    </p>
    <div style="margin-bottom:10px;">
      <Input
        v-model.trim="blogListQuery.keyword"
        placeholder="请输入关键字"
        style="width: 200px;"
      />
      <Button
        type="primary"
        @click="addBlog();"
        style='margin-left:5px;'
      >新增</Button>

      <Button
        type="primary"
        @click="getBlogList"
        style='margin-left:5px;'
      >查询</Button>

      <Button
        type="default"
        @click="handleReset"
        style='margin-left:5px;'
      >重置</Button>
    </div>
    <Spin
      fix
      v-if="tableLoading"
    ></Spin>
    <Table
      :data="tableData1"
      :columns="tableColumns1"
      stripe
    ></Table>
    <blog-details
      :modelTitle="modelTitle"
      :ModalVisible="showBlogDetails"
      :loadingDetails="loadingDetails"
      :blogDetailsInfo="blogDetailsInfo"
      @changeVisiable="changeVisiable"
      @refreshTable="refreshTable"
      @changeLoading="changeLoading"
    />
    <!-- <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page
          :total="100"
          :current="1"
          @on-change="changePage"
        ></Page>
      </div>
    </div> -->
  </Card>
</template>
<script>
import blogDetails from "./blogDetails";
import { getBlogList, getBlogDetails, deleteBlog } from "@/api/blog";
import { formateDate } from "../../util";
export default {
  components: {
    blogDetails
  },
  data() {
    return {
      tableLoading: false,
      blogListQuery: {
        keyword: ""
      },
      tableData1: [],
      tableColumns1: [
        {
          title: "标题",
          key: "title",
          render: (h, params) => {
            return h(
              "a",
              {
                style: {
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                },
                attrs: {
                  title: params.row.title
                },
                on: {
                  click: () => {
                    this.showDetails(params.row);
                  }
                }
              },
              params.row.title
            );
          }
        },
        {
          title: "内容",
          key: "content"
        },
        {
          title: "作者",
          key: "author"
        },
        {
          title: "创建时间",
          key: "createTime",
          render: (h, params) => {
            return h(
              "span",
              {
                style: {
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                }
              },
              formateDate(
                new Date(params.row.createTime),
                "yyyy-MM-dd hh:mm:ss"
              )
            );
          }
        },
        {
          title: "操作",
          key: "operation",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  attrs: {
                    type: "default"
                  },
                  style: {
                    marginRight: "10px"
                  },
                  on: {
                    click: () => {
                      this.editBlog(params.row);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: { type: "error", size: "small" }
                },
                [
                  h(
                    "Poptip",
                    {
                      class: "Poptip",
                      props: {
                        transfer: true,
                        confirm: true,
                        title: "确定要删除吗?"
                      },
                      on: {
                        "on-ok": () => {
                          this.deleteBlog(params.row);
                        }
                      }
                    },
                    "删除"
                  )
                ]
              )
            ]);
          }
        }
      ],
      showBlogDetails: false,
      loadingDetails: false,
      blogDetailsInfo: {},
      modelTitle: ""
    };
  },
  methods: {
    async deleteBlog(rowInfo) {
      try {
        const {
          data: { success, msg }
        } = await deleteBlog(rowInfo.id);
        msg && this.$Message.success(msg);
        this.getBlogList();
      } catch (err) {
        err && err;
      }
    },
    addBlog(rowInfo) {
      this.modelTitle = "新增博客";
      this.showBlogDetails = true;
      this.blogDetailsInfo = {};
    },
    async editBlog(rowInfo) {
      if (rowInfo && rowInfo.id) {
        try {
          this.modelTitle = "编辑博客";
          this.showBlogDetails = true;
          this.loadingDetails = true;
          this.blogDetailsInfo = await getBlogDetails(rowInfo.id);
          this.loadingDetails = false;
        } catch (error) {
          this.$Message.error(error);
        }
      }
    },
    changeVisiable(val) {
      this.showBlogDetails = val;
    },
    changeLoading(val) {
      this.loadingDetails = val;
    },
    refreshTable() {
      this.getBlogList();
    },
    handleReset() {
      this.blogListQuery.keyword = "";
    },
    async showDetails(rowInfo) {
      if (rowInfo && rowInfo.id) {
        try {
          this.modelTitle = "查看详情";
          this.showBlogDetails = true;
          this.loadingDetails = true;
          this.blogDetailsInfo = await getBlogDetails(rowInfo.id);
          this.loadingDetails = false;
        } catch (error) {
          this.$Message.error(error);
        }
      }
    },
    async getBlogList() {
      try {
        this.tableLoading = true;
        const { keyword } = this.blogListQuery;
        const res = await getBlogList(keyword);
        if (res.data && res.data.data) {
          this.tableData1 = res.data.data;
        } else {
          this.tableData1 = [];
        }
        res.data.msg && this.$Message.warning(res.data.msg);
        this.tableLoading = false;
      } catch (error) {
        error && this.$Message.error(error);
      }
    }
  },
  mounted() {
    this.getBlogList();
  }
};
</script>
