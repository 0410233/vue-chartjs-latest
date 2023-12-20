<template>
  <div class="richtext-view">
    <div v-if="content" v-html="content"></div>
    <!-- 示例 -->
    <div v-else>
      <div class="cap-richtext" active-index="3" item-index="3" style="background-color: rgb(249, 249, 249);">
        <p>点此编辑『富文本』内容 ——&gt;</p>
        <p>你可以对文字进行<strong>加粗</strong>、<em>斜体</em>、<span style="text-decoration: underline;">下划线</span>、<span style="text-decoration: line-through;">删除线</span>、文字<span style="color: rgb(0, 176, 240);">颜色</span>、<span style="background-color: rgb(255, 192, 0); color: rgb(255, 255, 255);">背景色</span>、以及字号<span style="font-size: 20px;">大</span><span style="font-size: 14px;">小</span>等简单排版操作。</p>
        <p>还可以在这里加入表格了</p>
        <table>
          <tbody>
            <tr>
              <td style="word-break: break-all;" valign="top" width="93">中奖客户</td>
              <td style="word-break: break-all;" valign="top" width="93">发放奖品</td>
              <td style="word-break: break-all;" valign="top" width="93">备注</td>
            </tr>
            <tr>
              <td style="word-break: break-all;" valign="top" width="93">猪猪</td>
              <td style="word-break: break-all;" valign="top" width="93">内测码</td>
              <td style="word-break: break-all;" valign="top" width="93"><em><span style="color: rgb(255, 0, 0);">已经发放</span></em></td>
            </tr>
            <tr>
              <td style="word-break: break-all;" valign="top" width="93">大麦</td>
              <td style="word-break: break-all;" valign="top" width="93">积分</td>
              <td style="word-break: break-all;" valign="top" width="93"><a draggable="false">领取地址</a></td>
            </tr>
          </tbody>
        </table>
        <p style="text-align: left;"><span style="text-align: left;">也可在这里插入图片、并对图片加上超级链接，方便用户点击。</span></p>
      </div>
    </div>
  </div>
</template>

<script>
import { getProps } from './config'

export default {
  props: getProps(),
}
</script>

<style lang="scss" scoped>
.richtext-view {
  .cap-richtext {
    position: relative;
    box-sizing: border-box;
    padding: 10px 10px 0;
    overflow: hidden;
    color: #333;
    font-size: 16px;
    line-height: 1.5;
    text-align: left;
    word-wrap: break-word;

    table {
      display: table;
      width: auto!important;
      margin: 0 auto 10px;
      border-collapse: collapse;
    }

    td, th {
      padding: 5px 10px;
      border: 1px solid #ddd;
    }
  }
}
</style>
