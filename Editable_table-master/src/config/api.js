// export const host = 'http://172.16.12.8:28182';
// export const host = 'http://172.16.110.101:28191';
console.log('process', process.env.NODE_ENV);
export const host =  process.env.NODE_ENV === 'development'? "http://172.16.4.62:28182": "http://172.16.130.92:28191";


/*政策发布*/
export  const policyUpdate = `${host}/policyTags/update` //  文章类型
export  const policyDetail = `${host}/policyTags/get` //  政策详情
export  const policyList = `${host}/policyTags/list` //  政策列表
export  const policyInsert = `${host}/policyTags/insert` //  政策列表
export  const policyUpload = `${host}/upload` //  上传

/*政策关联*/
export  const policyTagList = `${host}/policyTags/listNoPage` //  政策解读列表
export  const policyTagInsert = `${host}/policyRelation/insert` //  政策解读关联新增
export  const policyRelationList = `${host}/policyRelation/list` //  关联信息
export  const policyFileInsert = `${host}/policyRelation/insertByPolicyIds` //  政策文件insert接口
export  const policyFilelistByNoticeId = `${host}/policyRelation/listByNoticeId` //  详情页关联信息接口

/*标签列表*/
export  const industryCodeList = `${host}/industryCode/list` //  标签列表
export  const personInsert = `${host}/policyPerson/insert` //  标签列表