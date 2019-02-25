import mirror from 'mirror-creator';
import React, { Component, PropTypes } from "react";
export const pageType= mirror([
  'GET_DATA',
],'user/');
export const pagecln = [
  {
    key:'1',
    title: "序号",
    dataIndex: "id",
    render: text => <a href="javascript:;">{text}</a>
  },
  {
    key:'2',
    title: "账户",
    dataIndex: "name",
    render: text => <a href="javascript:;">{text}</a>
  },
  {
    key:'3',
    title: "年龄",
    dataIndex: "age",
    render: text => <a href="javascript:;">{text}</a>
  },
  {
    key:'4',
    title: "电话",
    dataIndex: "tel",
    render: text => <a href="javascript:;">{text}</a>
  },
  {
    key:'5',
    title: "邮箱",
    dataIndex: "email",
    render: text => <a href="javascript:;">{text}</a>
  },
  {
    key:'6',
    title: "操作",
    dataIndex: "action",
    render: text => <a href="javascript:;">删除</a>
  },
];


