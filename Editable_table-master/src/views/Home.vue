<template>
  <div
    style="
      text-align: center;
      margin-top: 30vh;
      line-height: 2em;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    "
  >
    <img src="../assets/wtlogo.jpg" style="    width: 500px;
    margin-bottom: 18px;
">
    <el-input
      v-model="input"
      placeholder="请输入企业名称"
      type="text"
      style="margin-buttom: 20px"
      @keyup="myKeydown"
    />
    <ul
      v-if="isShow"
      v-infinite-scroll="load"
      class="infinite-list"
      style="margin: 20px;padding-top: 13px;"
    >
      <li
        v-for="i in countList"
        :key="i"
        class="infinite-list-item"
        @click="chooseCompany(i)"
      >
        {{ i.orgname }}
      </li>
    </ul>
    <el-button style="margin-top: 20px" type="primary" @click="routerTo()"
      >智能匹配</el-button
    >
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
const input = ref("");
const isShow = ref(false);
const route = useRouter();
const count = ref(0);
const load = () => {
  count.value += 2;
};
let uniscid = "";
const countList = ref([]);
let time = null;
const myKeydown = (row, value, event) => {
  if(!row.target.value) {
    isShow.value = false;
  };
  if (time !== null) {
    clearTimeout(time);
  }
  time = setTimeout(() => {
  var config = {
    method: "get",
    url: `https://zcpp.smebj.cn/qyzcpp_api/api/company/getQymcmhcx?name=${row.target.value}&pageNumber=1&pageSize=20`, // 模糊搜索
    headers: {
      "Access-Control-Allow-Origin": "*",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  };
  row.target.value &&
  axios(config)
  .then(function ({ data: { result } }) {
    if(result.length) {
        isShow.value = true;
        countList.value = result;
    } else {
        isShow.value = false;
        countList.value = result;
    }
  })
  .catch(function (error) {
    console.log(error);
  });
}, 1500);
};
const routerTo = () => {
  input &&route.push({
    name: "Editable",
    params: {
      uniscid
    },
  });
};
const chooseCompany = (i) => {
  uniscid = i.uniscid;
  input.value = i.orgname;
  isShow.value = false;
};
</script>
<style>
::-webkit-scrollbar {
  width: 2px;
  height: 2px;
  background-color: #f5f5f5;
}
.infinite-list {
  height: 300px;
  width: 500px;
  margin: 10px;
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  justify-content: center;
  flex-flow: column;
  align-items: center;
  overflow-x: hidden;
  border: #e8e8e8 solid;
  border-radius: 6px;
}
.infinite-list ul {
  overflow-x: hidden;
  border: var(--el-color-primary-light-9) solid 0.5px;
}
.infinite-list ul::-webkit-scrollbar {
  width: 16px;
  height: 16px;
  background-color: #f5f5f5;
}
.infinite-list li {
  width: 500px;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  color: var(--el-color-primary);
}
.infinite-list .infinite-list-item:hover {
  background: var(--el-color-primary-light-9);
}
.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
@media screen and (max-width: 900px) {
  img {
    width: 380px;
  }
}
.list .el-overlay-dialog  {
  overflow: auto;
    margin-bottom: 16px;
}
</style>