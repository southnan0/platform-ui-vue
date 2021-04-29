const NC_BUDGET_CENTER= require('./NC_BUDGET_CENTER.json')
export default [
  {
    url:"/codeItem/getPage",
    type:"get",
    response: (request)=>{
      const {groupId} = request.query;
      if(groupId === 'NC_BUDGET_CENTER')
        return NC_BUDGET_CENTER
      else
        return {
          code: 20000,
          data:{
            dataList:[],
            totalCount:0
          }
        }
    }
  }
]