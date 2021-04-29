const routes = [
  {
    path: "/demo",
    component: () => import("./demo.vue"),
  },
  {
    path: "/component",
    component: () => import("./pages/component.vue"),
    children: [
      {
        path: "form-divider",
        component: () => import("./docs/form-divider.md"),
        name: "component-form-divider",
      },
      {
        path: "remote-select",
        component: () => import("./docs/remote-select.md"),
        name: "component-remote-select",
      },
      {
        path: "form-value",
        component: () => import("./docs/form-value.md"),
        name: "component-form-value",
      },
      {
        path: "uploader-file",
        component: () => import("./docs/uploader-file.md"),
        name: "component-uploader-file",
      },
      {
        path: "select-check",
        component: () => import("./docs/select-check.md"),
        name: "component-select-check",
      },
      {
        path: "select-huge",
        component: () => import("./docs/select-huge.md"),
        name: "component-select-huge",
      },
      {
        path: "log-steps",
        component: () => import("./docs/log-steps.md"),
        name: "component-log-steps",
      },
      {
        path: "table",
        component: () => import("./docs/table.md"),
        name: "component-table",
      },
      {
        path: "table-form",
        component: () => import("./docs/table-form.md"),
        name: "component-table-form",
      },
      {
        path: "table-list",
        component: () => import("./docs/table-list.md"),
        name: "component-table-list",
      },
      {
        path: "form",
        component: () => import("./docs/form.md"),
        name: "component-form",
      },
    ],
  },
];

export default routes;
