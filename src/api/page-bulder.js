
export function getPageList() {
  const records = [{
    id: 1,
    name: '页面名称',
    desc: '页面描述',
    path: '',
    // 背景色
    backgroundColor: '#ffffff',
    // 页面组件列表
    blocks: [
      {
        // 组件：标题文本
        name: 'caption',
        data: {
          title: '标题',
          desc: '描述',
          style: 'weixin',
          textAlign: 'left',
          titleFontSize: 16,
          descFontSize: 12,
          titleFontWeight: 700,
          descFontWeight: 400,
          titleColor: '#323232',
          descColor: '#969799',
          bgColor: '#ffffff',
          time: null,
          author: null,
          linkText: '链接标题',
          linkTo: 'https://www.baidu.com',
        },
        order: 1,
      },
      {
        // 组件：辅助分割
        name: 'separator',
        data: {
          type: 'gup',
          height: 12,
          lineStyle: 'solid',
          marginX: 0,
          color: '#666'
        },
        order: 2,
      },
    ],
  }]

  return Promise.resolve({
    code: 200,
    data: {
      totle: records.length,
      list: JSON.parse(JSON.stringify(records)),
    }
  })
}