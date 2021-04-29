## Table 列表--表格

后台系统列表数据展示，查询

### 基础用法

基础的表格

:::demo 查

```html
<oa-table
  ref="dataTable"
  :data="data"
  :table-config="tableConfig"
  :columns="columns"
  @action="$_handleAction"
>
</oa-table>

<script>
  export default {
    data() {
      return {
        queryParam: {
          // 搜索条件
          _start: 0,
          _length: 20,
          _searching: {},
          _order_field: undefined, // 排序配置
          _order_type: undefined
        },
        data: [],
        tableConfig: {
          isLoading: false,
          totalRecords: 0,
          operations: false,
          filterable: true
        },
        columns: [
          {
            field: "id",
            title: "ID"
          },
          {
            field: "name",
            title: "名称",
            type: "el-input",
            config: {
              showInSearch: false
            },
            value: "123"
          },
          {
            field: "isValidText",
            title: "是否启用",
            config: {
              showInTable: { sortable: false }
            }
          },
          {
            field: "showIndex",
            title: "排序",
            config: {}
          },
          {
            field: "alias",
            title: "更新时间",
            config: {
              showInTable: { sortable: false }
            }
          }
        ]
      };
    },
    mounted() {
      this.handleSearch(this.queryParam);
    },
    methods: {
      handleSearch(param) {
        const response = {
          code: 20000,
          data: {
            dataList: [
              {
                id: "1",
                groupId: "OFFICE_PROPERTY",
                code: null,
                name: "测试name1",
                alias: "2020-12-10 14:30:33",
                itemLevel: null,
                tag: null,
                parentCode: null,
                showIndex: 1,
                isValid: 1,
                isDisplay: null,
                english: null,
                isValidText: "是",
                firstname: null,
                secondname: null,
                fisrtGroupId: null,
                handlerName: null,
                eId: null,
                itemLevelText: "枚举值"
              },
              {
                id: "2",
                groupId: "OFFICE_PROPERTY",
                code: null,
                name: "测试name2",
                alias: null,
                itemLevel: null,
                tag: null,
                parentCode: null,
                showIndex: 2,
                isValid: 1,
                isDisplay: null,
                english: null,
                isValidText: "是",
                firstname: null,
                secondname: null,
                fisrtGroupId: null,
                handlerName: null,
                eId: null,
                itemLevelText: "枚举值"
              },
              {
                id: "3",
                groupId: "OFFICE_PROPERTY",
                code: null,
                name: "测试name3",
                alias: null,
                itemLevel: null,
                tag: null,
                parentCode: null,
                showIndex: 3,
                isValid: 1,
                isDisplay: null,
                english: null,
                isValidText: "是",
                firstname: null,
                secondname: null,
                fisrtGroupId: null,
                handlerName: null,
                eId: null,
                itemLevelText: "枚举值"
              }
            ],
            totalCount: 3,
            other: null
          },
          message: "操作成功"
        };
        const { _searching, ...others } = param;
        this.tableConfig.isLoading = true;
        others.groupId = this.groupId;

        setTimeout(() => {
          this.data = response.data.dataList;
          this.tableConfig.totalRecords = response.data.totalCount;
          this.tableConfig.isLoading = false;
        }, 2000);
      },
      handleInValid(row) {
        alert("handleInValid");
      },
      $_handleAction(methodName, row) {
        this[methodName] && this[methodName](row);
      }
    }
  };
</script>
```

:::
