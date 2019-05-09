var template = require("art-template");
require.extensions[".js"] = template.extension;
require.extensions[".scss"] = template.extension;

//自定义函数

// template.defaults.imports.过滤器名称 = function(date){
//     过滤器的内容
//    一定要注意 需要一个返回值
// };

const firstLettertoLowercase = function(name) {
  //首字母小写
  return name[0].toLocaleLowerCase() + name.substring(1);
};

const firstLettertoUpperCase = function(name) {
  //首字母大写
  return name[0].toLocaleUpperCase() + name.substring(1);
};
template.defaults.imports.firstLettertoLowercase = firstLettertoLowercase; //首字母小写

template.defaults.imports.firstLettertoUpperCase = firstLettertoUpperCase; //首字母大写
var pageData = {
  name: "PageName",
  layout: {
    name: "BasicLayout",
    title: "BasicLayout",
    description: "用户自定义布局 - BasicLayout",
    customLayout: true,
    localization: true,
    folderName: "BasicLayout",
  },
  blocks: [
    {
      name: "account-badge",
      title: "账户勋章",
      description: "展示账户权益勋章等权益信息",
      homepage:
        "https://unpkg.com/@icedesign/account-badge-block/build/index.html",
      categories: ['信息展示'],
      repository:
        "https://github.com/ice-lab/react-materials/tree/master/blocks/AccountBadge",
      source: {},
      dependencies: {
        "prop-types": "^15.5.8",
        "react": "^16.2.0"
      },
      screenshot:
        "https://unpkg.com/@icedesign/account-badge-block/screenshot.png",
      screenshots: [Array],
      customConfig: null,
      features: {},
      publishTime: "2018-12-13T08:48:27.740Z",
      updateTime: "2019-04-26T13:52:39.904Z",
      _isNew: true,
      uid: "8056dcd0-7205-11e9-af1d-9100dcdd15e7",
      alias: "AccountBadge"
    },
    {
      name: "account-features",
      title: "账户特性",
      description: "罗列账户功能列表",
      homepage:
        "https://unpkg.com/@icedesign/account-features-block/build/index.html",
      categories: [Array],
      repository:
        "https://github.com/ice-lab/react-materials/tree/master/blocks/AccountFeatures",
      source: {},
      dependencies: {
        "prop-types": "^15.5.8",
        "react": "^16.2.0"
      },
      screenshot:
        "https://unpkg.com/@icedesign/account-features-block/screenshot.png",
      screenshots: [Array],
      customConfig: null,
      features: {},
      publishTime: "2018-12-13T08:48:27.306Z",
      updateTime: "2019-04-26T13:52:41.074Z",
      _isNew: true,
      uid: "80bf89b0-7205-11e9-af1d-9100dcdd15e7",
      alias: "AccountFeatures"
    },
    {
      name: "account-panel",
      title: "账户信息",
      description: "用户中心展示账户信息内容",
      homepage:
        "https://unpkg.com/@icedesign/account-panel-block/build/index.html",
      categories: ['用户中心'],
      repository:
        "https://github.com/ice-lab/react-materials/tree/master/blocks/AccountPanel",
      source: {},
      dependencies: {},
      screenshot:
        "https://unpkg.com/@icedesign/account-panel-block/screenshot.png",
      screenshots: "https://raw.githubusercontent.com/dtux-kangaroo/roo-config/master/block-covers/ability-introduction.png",
      customConfig: null,
      features: {},
      publishTime: "2018-12-13T08:48:27.642Z",
      updateTime: "2019-04-26T13:52:41.990Z",
      _isNew: true,
      uid: "812e7820-7205-11e9-af1d-9100dcdd15e7",
      alias: "AccountPanel"
    }
  ],
  nodeFramework: "koa2"
};
const createPageFs = {
    React: {
        /**
         *
         *
         * @param {*} data object {
         *   pageName: string, 页面名称
         *   elementsList:array,组件树结构
         *   componentList:array, 需导入的区块列表
         * 
         * }
         * @param {*} pagePath  目标项目路径根目录
         * @param {*} callBack  创建成功回调函数
         */
        createPage: function (data, pagePath, callBack) {  
            var view = require(__dirname + "/components/react/index.js");
            var style = require(__dirname + "/components/react/style.scss");
            var html = view(data);
            var css = style(data);
            console.log(html);
            console.log(css);
        },
        renderPage: function (data) {  
            var view = require(__dirname + "/components/react/index.js"); 
            var html = view(data);
            return html;
        }
    },
    Vue: {
        createPage: function (data, pagePath, callBack) {
            
        },
        renderPage: function () {
           
        }
    }
}
export default createPageFs
