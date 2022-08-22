<template>
  <!-- 可编辑表格V2 -->
  <div id="detail">
    <div class="Md-zcxx" style="width: 80%">
      <div class="MD-fcje1">
        <div v-html="data.policyContent" style="font-size: 18px"></div>
        <div style="height: 300px">
          <span>政策关联信息</span>
          <ul
            class="polic-relation"
            style="overflow: auto; overflow-x: scroll; width: fit-content"
          >
            <li
              v-for="i in count"
              :key="i"
              class="polic-relation-item"
              @click="routeTo(policyKind === '通知公告'? i.policyId: i.noticeId)"
            >
              {{ i.noticeTitle }}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div style="height: 100%; margin-left: 10px; padding-right: 10px">
      <div style="height: 300px; position: fixed; top: 0px">
        <el-tag
          v-for="tag in dynamicTags"
          :key="tag"
          class="mx-1"
          style="margin-right: 10px"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
          @click="handleClick(tag)"
        >
          {{ tag }}
        </el-tag>
        <el-input
          v-if="inputVisible"
          ref="InputRef"
          v-model="inputValue"
          class="ml-1 w-20"
          size="small"
          type="textarea"
          @keyup.enter="handleInputConfirm"
        />
        <el-button
          v-else
          class="button-new-tag ml-1"
          size="small"
          @click="showInput"
          >新增标签
        </el-button>
        <!-- <el-button size="small" type="success" @click="deleteTable()"
          >删除</el-button
        > -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import axios from "axios";
import { ref, nextTick, onMounted } from "vue";
import { policyUpdate, policyDetail, policyRelationList, policyFilelistByNoticeId } from "../config/api";
import {
  tagMap
} from "../config/constant";
const inputValue = ref("");
const dynamicTags = ref(Object.keys(tagMap));
const inputVisible = ref(false);
const isExist = ref(false);
const index = ref(0);
const InputRef = ref("");
const router = useRouter();
const count = ref([]);
const {id = window.localStorage.id, policyKind = window.localStorage.policyKind} = router.currentRoute.value.params;
window.localStorage.id = id;
window.localStorage.policyKind = policyKind;
let data = ref({});
// 获取关联信息
policyKind === '通知公告' && axios
          .post(`${policyFilelistByNoticeId}`, {
            noticeId: id,
            relationType: "通知公告"
          })
          .then(async function ({ data }) {
            count.value = data.data.list;
          });

policyKind !== "通知公告" && axios
          .post(`${policyRelationList}`, {
            policyId: id,
            relationType: "政策解读"
          })
          .then(async function ({ data }) {
            count.value = count.value.concat(data.data.list);
          })
         && axios
          .post(`${policyRelationList}`, {
            policyId: id,
            relationType: "通知公告"
          })
          .then(async function ({ data }) {
            count.value = count.value.concat(data.data.list);
            console.log('count.value-----1', count.value);
          });

// 跳转关联详情
const routeTo = (id) => {
  window.open(`${window.location.href}/notice?id=${id}`);
  // router.push({
  //   name: "notice",
  //   params: { id },
  // });
};
// // 删除
// const deleteTable = (index, id) => {
//   axios
//     .post(`${policyUpdate}`, {
//       id,
//       policyStatus: 1
//     })
//     .then((e) => {
//       router.back(-1);
//     });
// };
// 政策详情
axios
.get(`${policyDetail}/${id}`, {
})
.then(function (res) {
  data.value = res.data.data;
  dynamicTags.value = data.value.policyTags
    ? data.value.policyTags.split(",")
    : dynamicTags.value;
})
.catch(function (error) {
  console.log(error);
});

const handleClose = (tag) => {
  let isTag = dynamicTags.value.length === 1 ? 0 : 1;
  dynamicTags.value.splice(dynamicTags.value.indexOf(tag), 1);
  axios.post(`${policyUpdate}`, {
    id,
    policyTags: dynamicTags.value.map(e => tagMap[e] ? tagMap[e] : e).join(),
    isTag
  });
};

const handleClick = (tag) => {
  inputVisible.value = true
  inputValue.value = tag;
  isExist.value = true;
  index.value = dynamicTags.value.indexOf(tag);
};

const showInput = () => {
  inputVisible.value = true;
  isExist.value = '';
};

const handleInputConfirm = () => {
  inputValue.value = inputValue.value.replace("\n", "");
  if(inputValue.value && isExist.value) {
    dynamicTags.value[index.value] = inputValue.value;
  }
  else if(inputValue.value) {
    dynamicTags.value.push(inputValue.value)
  };
  
  inputVisible.value = false;
  inputValue.value = "";
   axios.post(`${policyUpdate}`, {
     id,
     policyTags: dynamicTags.value.map(e => tagMap[e] ? tagMap[e] : e).join(),
     isTag: 1
   });
};
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

.polic-relation {
  margin: 10px;
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  flex-flow: column;
  overflow-x: hidden;
  border: #e8e8e8 solid;
  border-radius: 6px;
}
.polic-relation ul {
  overflow-x: hidden;
  border: var(--el-color-primary-light-9) solid 0.5px;
}
.polic-relation ul::-webkit-scrollbar {
  width: 16px;
  height: 16px;
  background-color: #f5f5f5;
}
.polic-relation .polic-relation-item {
  display: flex;
  align-items: center;
  height: 50px;
  color: var(--el-color-primary);
}
.polic-relation .polic-relation-item:hover {
  background: var(--el-color-primary-light-9);
}
.polic-relation .polic-relation-item + .list-item {
  margin-top: 10px;
}
</style>