<template>
  <Modal
    :title="modelTitle"
    v-model="isShow"
    width="30%"
  >
    <Form
      ref="modelFormItem"
      :model="modelForm"
      :rules="modelFormRules"
      :label-width="100"
      label-position="right"
      style="margin-right: 10px;"
    >
      <Row>
        <Col span="20">
        <FormItem
          label="博客标题"
          prop="title"
        >
          <Input
            :disabled="!isAdd&&!isEdit"
            :clearable="isAdd||isEdit"
            v-model="modelForm.title"
            :maxlength="25"
          />
        </FormItem>
        </Col>
      </Row>

      <Row>
        <Col span="20">
        <FormItem
          label="内容"
          prop="content"
          :maxlength="250"
        >
          <Input
            :disabled="!isAdd&&!isEdit"
            :clearable="isAdd||isEdit"
            type="textarea"
            :rows="4"
            v-model="modelForm.content"
            :maxlength="50"
          ></Input>
        </FormItem>
        </Col>
      </Row>
    </Form>
    <div
      slot="footer"
      style="text-align: right;"
    >
      <Button
        v-if="!isDetails"
        type="default"
        @click="cancleModel"
      >取消</Button>
      <Button
        v-if="isDetails"
        type="default"
        @click="cancleModel"
      >关闭</Button>
      <Button
        v-if="!isDetails"
        type="primary"
        @click="saveModel"
        :loading="modelEditLoading"
      >确认</Button>
    </div>
  </Modal>
</template>

<script>
import { createBlog, updateBlog } from "@/api/blog";
export default {
  data() {
    return {
      modelFormRules: {},
      modelEditLoading: false
    };
  },
  computed: {
    isAdd() {
      return this.modelTitle === "新增博客";
    },
    isEdit() {
      return this.modelTitle === "编辑博客";
    },
    isDetails() {
      return this.modelTitle === "查看详情";
    },
    modelForm: {
      get() {
        return (
          (this.blogDetailsInfo.data &&
            this.blogDetailsInfo.data.data &&
            this.blogDetailsInfo.data.data[0]) ||
          {}
        );
      },
      set() {}
    },
    isShow: {
      get() {
        return this.ModalVisible;
      },
      set() {}
    }
  },
  props: {
    modelTitle: {
      type: String,
      required: true
    },
    ModalVisible: {
      type: Boolean,
      required: true,
      default: false
    },
    blogDetailsInfo: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  methods: {
    saveModel() {
      let self = this;
      self.$refs["modelFormItem"].validate(valid => {
        if (valid) {
          if (self.isAdd) {
            createBlog(self.modelForm)
              .then(res => {
                res.data && res.data.msg && self.$Message.success(res.data.msg);
              })
              .finally(() => {
                self.$emit("changeVisiable", false);
                self.$emit("refreshTable");
              });
          } else {
            updateBlog(self.modelForm)
              .then(res => {
                res.data && res.data.msg && self.$Message.success(res.data.msg);
              })
              .finally(() => {
                self.$emit("changeVisiable", false);
                self.$emit("refreshTable");
              });
          }
        }
      });
    },
    cancleModel() {
      this.$emit("changeVisiable", false);
    }
  }
};
</script>