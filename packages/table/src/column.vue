<script>
import {Button} from "element-ui";
import OaTableLink from "./table-link";
export default {
  components:{
    OaTableLink,
    ElButton: Button,
  },
  props:{
    btn:{
       type:Object,
        default(){
          return {
            
          }
        }
    },
    scope:{
       type:Object,
        default(){
          return {
            
          }
        }
    },
    size:{
      type:String,
      default:''
    }
  },
  methods:{
    handleButton({method:methodName,needConfirm,name},...args){
      if(needConfirm){
        // 用popconfirm会影响按钮间隔样式
        this.$confirm(`确定${name}吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('action',methodName, ...args)
        }).catch(() => {});
      }else{
        this.$emit('action',methodName, ...args)
      }
    }
  },
  render(createElement){
    const h = createElement;
      let children = null;
      const {btn,scope} = this;
      const {show,name,...others} = btn;
      const key = scope.$index;
      const canShow = show instanceof Function ? show(scope.row, scope.$index):true
      
      const directiveName = btn.directiveName || 'permission'
      if(canShow){
        const directives = btn[directiveName] ? [{
                name:directiveName,
                value:btn[directiveName]
              }]:[]
        if(btn.link){
          children = h('oa-table-link',{
              key:key,
              props:{
                size: btn.size,
                ...scope,
                ...others
              },
              directives
              },[name])
        }else{
          children = (
            h('el-button',{
              key:key,
              props:{
                size: this.size,
                ...others,
                type:btn.type ? btn.type : 'text'
              },
              directives,
              on:{
                click:()=>{
                  this.handleButton(btn,scope.row,scope.$index)
                }
              }
            },[name])
          )
        }
      }
      return children
  }
}
</script>