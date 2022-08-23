<template>
  <div class="list">
    <el-form
      ref="policyRuleFormRef"
      :model="policyRuleForm"
      :rules="rules"
      class="demo-ruleForm"
      :size="formSize"
    >
      <el-form-item label="人员" width="200px">
        <el-select
          v-model="policyRuleForm.personName"
          filterable
          placeholder="政策分类"
        >
          <el-option
            v-for="item in personOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="政策条数">
        <el-input v-model="policyRuleForm.policyCount" style="width: 200px;" placeholder="请输入范围" />
      </el-form-item>
      <el-form-item label="政策分类">
        <el-select
          v-model="policyRuleForm.policyKind"
          filterable
          placeholder="政策分类"
        >
          <el-option
            v-for="item in policyOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="区域">
        <el-select
          v-model="policyRuleForm.policyLocation"
          filterable
          placeholder="区域"
        >
          <el-option
            v-for="item in locationOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <div >
      <span class="dialog-footer">
        <el-button type="primary" @click="relationShap(ruleFormRef)"
          >确定提交</el-button
        >
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: "Editable",
};
</script>
<script setup>
import { useRouter } from "vue-router";
import { ref, reactive } from "vue";
import { ElMessage, UploadProps } from "element-plus";
import axios from "axios";
import {
  personInsert
} from "../config/api";
import {
  policyOptions,
  personOptions,
  locationOptions
} from "../config/constant";
const loading = ref(true);
let policyRuleForm = reactive({
  personName: "",
  policyCount: "",
  policyKind: "",
  policyLocation: ""
});

// 确定关联
const relationShap = async () => {
    await axios.post(`${personInsert}`, {
      //注意入参不要更改
      ...policyRuleForm
    }).then(() => {
      ElMessage.success("保存成功");
    });
};
</script>
<style scoped>
.list {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.demo-pagination-block {
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.12);
  margin-top: 40px;
}
.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}
.el-overlay-dialog {
  overflow: auto;
  margin-bottom: 16px;
}
</style>