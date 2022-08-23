<template>
  <!-- 可编辑表格V2 -->
  <div id="detail">
    <div class="Md-zcxx" style="width: 80%">
      <div class="MD-fcje1">
        <div v-html="data.policyContent" style="font-size: 18px"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import axios from "axios";
import { ref, nextTick, onMounted } from "vue";
import { policyDetail } from "../config/api";
const router = useRouter();
let data = ref({});
const id = window.localStorage.noticeId;
window.localStorage.noticeId = id;
// 政策详情
axios
  .get(`${policyDetail}/${id}`, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  })
  .then(function (res) {
    data.value = res.data.data;
    dynamicTags.value = data.value.policyTags
      ? data.value.policyTags.split(",")
      : [];
  })
  .catch(function (error) {
    console.log(error);
  });
</script>
<style lang="scss" scoped>
#detail {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.wraper {
  background-image: url(../assets/bg.jpg);
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
#contextmenu {
  position: absolute;
  top: 0;
  left: 0;
  height: auto;
  width: 120px;
  border-radius: 3px;
  border: 1px solid #999999;
  background-color: #f4f4f4;
  padding: 10px;
  z-index: 12;
  button {
    display: block;
    margin: 0 0 5px;
  }
}
.hideContextMenu {
  position: absolute;
  top: 5px;
  right: 5px;
}
#editInput,
#headereditInput {
  position: absolute;
  top: 0;
  left: 0;
  height: auto;
  min-width: 200px;
  max-width: 400px;
  padding: 0;
  z-index: 12;
}
#editInput .el-input,
#headereditInput .el-input {
  outline: 0;
  border: 1px solid #c0f2f9;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 0px #c0f2f9;
}
.MD-fcje1 {
  // border: solid;
}
@media screen and (max-width: 900px) {
  .MD-pan1 {
    width: 80%;
  }
}
.form-item-inline :first-child {
  display: flex;
}
.el-tag {
  white-space: normal;
  height: auto;
  max-width: 220px;
  word-wrap: break-word;
}
</style>