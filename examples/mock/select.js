export default [
  {
    url:"/file/upload",
    type:"post",
    response: ()=>{
      return {"code":20000,"data":[{"file_name":"logo-200X220.8238a728.png","file_id":22}],"message":"操作成功"}
    }
  },
  {
    url:"/remote-select/serarch",
    type:"get",
    response: (config)=>{
      const {searchKey} = config.query

      if(searchKey){
        return {
          code: 20000,
          data: [
            {
              id: 2080155,
              oaId: null,
              name: "xiaopeng",
              code: "G13379",
              nick: "小鹏",
              tel: "13825555485",
              email: "xiaopeng@aa.com",
              group_id: 3101267,
              group_top_name: "质量部门",
              group_last_name: "企业",
              group_path: "企业\\oa组",
              company_id: 1,
              company_name: "广州娃哈哈科技有限公司",
              status: 1,
              oa_stat: "STATE.1",
              mobile: "13825555485",
              idCardCode: null,
            }]
        }
      }
      return {
        code: 20000,
        data:[]
      }
    }
  },
  {
    url: "/manage/sys/user/getByRole",
    type: "get",
    response: () => {
      return {
        code: 20000,
        data: [
          {
            id: 2080155,
            oaId: null,
            name: "xiaopeng",
            code: "G13379",
            nick: "小鹏",
            tel: "13825555485",
            email: "xiaopeng@aa.com",
            group_id: 3101267,
            group_top_name: "质量部门",
            group_last_name: "企业",
            group_path: "企业\\oa组",
            company_id: 1,
            company_name: "广州娃哈哈科技有限公司",
            status: 1,
            oa_stat: "STATE.1",
            mobile: "13825555485",
            idCardCode: null,
          }
        ],
        message: "操作成功",
      };
    },
  },
];
