## Table 列表--表格

后台系统列表数据展示，查询

### 基础用法

基础的表格

:::demo 查

```html
<oa-table-list
  ref="dataTable"
  :data="data"
  :table-config="tableConfig"
  :columns="columns"
  @search="handleSearch"
  @action="$_handleAction"
>
</oa-table-list>

<script>
  export default {
    data() {
      return {
        data: [],
        tableConfig: {
          formConfig: {
            form: {
              inline: true,
              labelWidth: "50px",
              labelPosition: "right",
              size: "small"
            }
          },
          isLoading: false,
          totalRecords: 0,
          operations: false,
          filterable: true
        },
        columns: [
          {
            field: "id",
            title: "ID"
            // config: { showInTable: { sortable: true } }
          },
          {
            field: "name",
            title: "名称",
            type: "el-input",
            config: {
              // showInTable: { sortable: true },
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
            config: {
              // showInTable: { sortable: true }
            }
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

### 带搜索和操作

带搜索和操作的表格

:::demo 查

```html
<oa-table-list
  ref="dataTable"
  :data="data"
  :table-config="tableConfig"
  :columns="columns"
  @search="handleSearch"
  @action="$_handleAction"
>
</oa-table-list>

<script>
  export default {
    data() {
      return {
        data: [],
        tableConfig: {
          formConfig: {
            form: {
              inline: true,
              labelWidth: "50px",
              labelPosition: "right",
              size: "small"
            }
          },
          isLoading: false,
          totalRecords: 0,
          operations: {
            btns: [
              {
                name: "编辑",
                method: "handleUpdate",
                type: "text"
              },
              {
                name: "启用",
                method: "handleValid",
                type: "text",
                show(row) {
                  return row.isValid !== 1;
                }
              },
              {
                name: "禁用",
                method: "handleInValid",
                type: "text",
                show(row) {
                  return row.isValid === 1;
                }
              }
            ],
            width: 150,
            label: "操作",
            fixed: "right"
          },
          filterable: true
        },
        columns: [
          {
            field: "id",
            title: "ID"
            // config: { showInTable: { sortable: true } }
          },
          {
            field: "name",
            title: "名称",
            type: "el-input",
            config: {
              showInTable: {
                sortable: false,
                field: "name-column"
              },
              showInSearch: { searchType: "" }
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
            config: {
              // showInTable: { sortable: true }
            }
          },
          {
            field: "alias",
            title: "更新时间",
            config: {
              showInTable: {
                sortable: false,
                formatter(row, colum) {
                  return row.alias ? `更新时间是${row.alias}` : "没有更新过";
                }
              }
            }
          }
        ]
      };
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

### Attributes

| 参数         | 说明                              | 类型   | 可选值                | 默认值 |
| ------------ | --------------------------------- | ------ | --------------------- | ------ |
| size         | 尺寸                              | string | medium / small / mini | —      |
| pageSize     | 每页条数                          | number | -                     | 20     |
| table-config | list 的配置数据 [tableConfig]     | object |                       | —      |
| data         | 数据                              | array  |                       | —      |
| columns      | 表格列的配置 [Column]             | array  | []                    | —      |
| form-config  | 搜索部分 form 的配置 [FormConfig] | object |                       | —      |
| table        | el-table 的 props 配置            | object | {}                    | —      |

### tableConfig

| 参数         | 说明                | 类型    | 可选值 | 默认值 |
| ------------ | ------------------- | ------- | ------ | ------ |
| totalRecords | 总记录数            | number  |        | 0      |
| isLoading    | 是否加载中          | boolean |        | false  |
| operations   | 操作栏 [operations] | obj     |        |        |

### operations

| 参数 | 说明 | 类型  | 可选值 | 默认值                                 |
| ---- | ---- | ----- | ------ | -------------------------------------- |
| btn  | 按钮 | array |        | 编辑（handleEdit）删除（handleDelete） |

### Column

| 参数   | 说明                   | 类型   | 可选值   | 默认值 |
| ------ | ---------------------- | ------ | -------- | ------ |
| title  | 列标题                 | string | -        | ''     |
| field  | 对应搜索条件的表单类型 | string | 各种组件 | -      |
| config | 列的配置 [config]      | object | -        | -      |

其他列对应搜索的 props 配置，与 form-create 一致

### config

| 参数         | 说明                                                     | 类型   | 可选值 | 默认值 |
| ------------ | -------------------------------------------------------- | ------ | ------ | ------ |
| showInSearch | 是否在搜索区域作为搜索条件                               | object | -      | true   |
| showInTable  | 是否在表格中，作为列展示,支持 el-table-column 的属性配置 | object | -      | true   |

### FormConfig

| 参数      | 说明                 | 类型   | 可选值  | 默认值                                                    |
| --------- | -------------------- | ------ | ------- | --------------------------------------------------------- |
| submitBtn | 提交按钮             | object | boolean | http://www.form-create.com/v2/iview/global.html#submitbtn |
| form      | 表单整体显示规则配置 | object | -       | http://www.form-create.com/v2/iview/global.html#form      |
