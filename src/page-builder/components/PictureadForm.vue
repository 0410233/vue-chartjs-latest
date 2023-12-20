<template>
    <div class="pictureadsstyle">
      <h4 class="options__title">{{ meta.label }}</h4>
      <el-form label-width="80px" :model="formdata" size="small">
        <el-form-item label="布局方式">

      </el-form-item>
      <div class="deco-control-group">
        <!-- <div class="deco-control-group__header">
          <div class="deco-control-group__label">颜色</div>
          <div class="deco-control-group__value">红色</div>
        </div> -->
        <div class="deco-control-group__content">
          <div class="deco-radio-button-group deco-radio-button-group--round">
            <div>
            <div class="deco-radio-button deco-radio-button--active" @click="picchange()" :class="formdata.swiperType === 0 ? 'active' : ''"
            >
            <span
            class="iconfont icon-icon_yihangyige"
            style="font-size: 20px"

            @click="picchange()"
            />
            </div>
            <p>一行一个</p>
          </div>
          <div style="margin-left: 20px;">


            <div class="deco-radio-button"  @click="picchange1()" :class="formdata.swiperType === 1 ? 'active' : ''"
            >
            <span
            class="iconfont icon-haibao"
            style="font-size: 20px"

          />

            </div>
            <p>轮播海报</p>
          </div>
          </div>
        </div>
      </div>
      <!-- 标题内容 -->
      <!-- <el-form-item label="选择模板" class="lef">
        <p style="color: #000">{{ styleText }}</p>
      </el-form-item> -->

      <!-- 轮播图选择 -->


      <!-- 下划线 -->
      <div class="bor" />

      <h5 style="color: #000; font-size: 14px">添加图片</h5>
      <p style="color: #969799; font-size: 12px; margin-top: 10px">
        拖动选中的导航可对其排序
      </p>

      <!-- 图片广告 -->
      <div class="link-list">
      <div v-for="item, index in formdata.links" :key="index" class="link-item">
        <div class="link-item__content">
          <div class="link-item__image" :class="item.image && 'is-chosen'" @click="chooseImage(index)">
            <img v-if="item.image" :src="item.image" class="avatar">
            <template v-else>
              <i class="el-icon el-icon-plus"></i>
              <span>添加图片</span>
            </template>
          </div>
          <div class="link-item__name">
            <div class="link-item__title">
              <div class="link-item__label">备注</div>
              <el-input v-model="item.text" size="mini" class="link-item__title-input"></el-input>
            </div>
            <div class="link-item__link">
              <div class="link-item__label">链接</div>
              <el-link type="primary" class="link-item__linkto">添加链接</el-link>
            </div>
          </div>
        </div>
        <p v-if="item.error" class="link-item__error">{{ item.error }}</p>
      </div>
      <el-button v-if="formdata.links.length < 10"
        class="add-link w-full"
        type="primary"
        size="small"
        icon="el-icon-plus"
        @click="addLink"
      >添加图片</el-button>
    </div>
      <div v-if="formdata.imageList[0]">
        <vuedraggable :list="formdata.imageList" item-key="index" :forceFallback="true" :animation="200">
          <template #item="{ element, index }">
            <section
              class="imgBanner"
            >
              <van-icon class="el-icon-circle-close" name="close" @click="deleteimg(index)" />
              <!-- 图片 -->
              <div class="imag">
                <img :src="element.src" alt draggable="false" />
              </div>
              <!-- 标题和链接 -->
              <div class="imgText">
                <el-input
                  v-model="element.text"
                  placeholder="请输入标题，也可不填"
                  size="small"
                ></el-input>

                <!-- 选择类型 -->
                <div class="select-type">
                  <el-select
                    style="width: 60%"
                    v-model="element.linktype"
                    placeholder="请选择跳转类型"
                    size="small"
                  >
                    <el-option
                      v-for="element in optionsType"
                      :key="element.name"
                      :label="element.name"
                      :value="element.type"
                    ></el-option>
                  </el-select>

                  <!-- 输入链接 -->
                  <el-input
                    style="width: 100%"
                    size="small"
                    placeholder="请输入链接，输入前确保可以访问"
                    v-model="element.http.externalLink"
                  ></el-input>
                </div>
              </div>
            </section>
          </template>
        </vuedraggable>
      </div>
      <!-- 上传图片 -->
      <!-- <el-button
        @click="addLink"
        class="uploadImg"
        type="primary"
        plain
      >
        点击添加图片
      </el-button> -->

      <!-- 下划线 -->
      <div class="bor"></div>



      <div style="height: 10px" />

      <!-- 图片倒角 -->
      <el-form-item label="轮播速度">
        <div class="flex items-center w-full" style="justify-content: flex-end;">
        <el-select
            style="width: 60%"
            v-model="formdata.type"
            placeholder="请选择跳转类型"
            size="small"
            @change="handleChange($event, 'type')"
          >
            <el-option
              v-for="item in optionsType"
              :key="item.name"
              :label="item.name"
              :value="item.type"
            >
            </el-option>
          </el-select>
        </div>
      </el-form-item>
    </el-form>

    <!-- 上传图片 -->
    <!-- <uploadimg ref="upload" @uploadInformation="uploadInformation" /> -->

    </div>
  </template>

<script>
import vuedraggable from 'vuedraggable' //拖拽组件
import { getPropDefaultValue } from './utils'
import {
  getProps,
  getFormdata,
  getWatchers,
  getMeta,
} from './picturead'
import useErrors from './mixins/useErrors'

  export default {
    mixins: [useErrors],
    props: getProps(),
    data() {
      return {
        meta: getMeta(),
        formdata: getFormdata(getProps()),
        mySwiperOption: {
					pagination: {
						el: '.swiper-pagination', //与slot="pagination"处 class 一致
						clickable: true, //轮播按钮支持点击
					},
          // speed: this.types,
					//自动播放
					autoplay: {
						delay: 1000,
						disableOnInteraction: false
					},
					//循环
					loop:true

        },
        optionsType: [
        {
          type: 10000,
          name: '1',
        },
        {
          type: 20000,
          name: '2',
        },
        {
          type: 30000,
          name: '3',
        },
        {
          type: 40000,
          name: '4',
        },
        {
          type: 5000,
          name: '5',
        },
      ], // 选择跳转类型
      emptyText: '',

        alignDisplay: {left: '居左显示', center: '居中显示'},
        fontSizeDisplay: {'16':'大(16号)','14':'中(14号)','12':'小(12号)'},
        fontWeightDisplay: {'400':'常规体','600':'加粗体'},
      }
    },
      computed: {
    styleText() {
      let data
      if (this.formdata.swiperType === 0) data = '一行一个'
      if (this.formdata.swiperType === 1) data = '轮播海报'
      if (this.formdata.swiperType === 2) data = '多图单行'
      if (this.formdata.swiperType === 3) data = '立体模式'
      if (this.formdata.swiperType === 4) data = '导航横向滑动'
      return data
    }
    },
    watch: getWatchers(),
    methods: {
     picchange1(){
      this.formdata.swiperType === 1
      this.$emit('change', {['swiperType']: 1})
     },
     picchange(){
      this.formdata.swiperType === 0
      this.$emit('change', {['swiperType']: 0})
     },
        addLink() {
      this.formdata.links.push({
        image: null,
        text: null,
        path: null,
        linkto: null,
      })
    },
     /** 选择图片 */
    chooseImage(index) {
      this.$modalUpload(imgs => {
        if (imgs.length) {
          this.$set(this.formdata.links[index], 'image', imgs[0].sattDir)
        }
      }, '1');
      this.$emit('change', {['links']: this.formdata.links})
      console.log(999,this.formdata.links)
    },
      /** 修改属性值 */
      handleChange(value, prop) {
        console.log('handleChange', {value})
          this.$set(this.mySwiperOption, 'speed', value);
          console.log(1111,this.mySwiperOption)
        this.$emit('change', {['SwiperOption']: this.mySwiperOption})
      },
      /** 重置属性值 */
      reset(prop) {
        const value = getPropDefaultValue(getProps(), prop)
        this.handleChange(value, prop)
      },
      noop() {},
    },
     created() {
  console.log(this.formdata)}
  }
  </script>

<style lang="scss" src="../assets/utils.scss" scoped></style>
<style lang="scss" src="../assets/view-options.scss" scoped></style>
<style lang="scss">
.deco-control-group{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .deco-control-group__header{
      display: flex;
      align-items: center;
      .deco-control-group__label{
        margin-right: 16px;
    font-size: 14px;
    color: #969799;
    line-height: 18px;
    white-space: nowrap;
      }
      .deco-control-group__value{
        font-size: 14px;
    font-weight: 500;
    color: #323233;
    line-height: 18px;
    margin-right: 16px;
      }
    }
    .deco-control-group__content{
      flex: 1;
    display: flex;
    // justify-content: flex-end;
    align-items: center;
    .deco-radio-button-group{
      display: flex;
      flex-wrap: wrap;
      .deco-radio-button{
        // border: 1px solid gray;
        position: relative;
    display: inline-block;
     width: 38px;
    height: 38px;
    padding: 8px;
    // border-radius: 50%;
    line-height: 20px;
    background-color: #8080802b;
    margin-left: 4px;
    // .zent-btn{
    //   width: 24px;
    // height: 24px;
    // padding: 3px;
    // border-radius: 50%;
    // line-height: 14px;
    // }
      }
    }
    }
}
.link-item {
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
  border-radius: 4px;
  background: #ffffff;

  margin-bottom: 12px;

  &__content {
    width: 100%;
    display: flex;
    align-items: center;
  }

  &__image {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: none;
    width: 60px;
    height: 60px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    box-sizing: border-box;
    color: #409eff;
    cursor: pointer;
    position: relative;

    &:hover {
      border-color: #409EFF;
    }

    &.is-chosen {
      border-color: transparent;
    }

    .el-icon {
      font-size: 20px;
    }

    span {
      font-size: 12px;
      margin-top: 6px;
    }

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: contain;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 20;
    }
  }

  &__name {
    flex: 1;
    min-width: 0;
    margin-left: 12px;
  }

  &__title, &__link {
    display: flex;
    align-items: center;
    width: 100%;
  }

  &__link {
    margin-top: 6px;
  }

  &__label {
    flex: none;
    padding-right: 12px;
    font-size: 13px;
  }

  &__title-input, &__linkto {
    font-size: 13px;
  }

  &__error {
    font-size: 12px;
    color: red;
    margin: 4px 0 0;
  }
}
.active {
        border: 1px solid #155bd4;
        background-color: #e0edff;
        color: #155bd4;
      }
  .pictureadsstyle {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  padding: 0 10px;
  box-sizing: border-box;

  /* 标题 */
  h2 {
    padding: 24px 16px 24px 0;
    margin-bottom: 15px;
    border-bottom: 1px solid #f2f4f6;
    font-size: 18px;
    font-weight: 600;
    color: #323233;
  }

  .lef {
    :deep(.el-form-item__label) {
      text-align: left;
    }
  }

  /* 轮播图样式 */
  .swiperType {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 20px;
    .span {
      display: inline-block;
      width: 58px;
      height: 32px;
      text-align: center;
      line-height: 32px;
      background: #ebedf0;
      color: #979797;
      border: 1px solid #fff;
      cursor: pointer;
      transition: all 0.5s;

      &:hover {
        border: 1px solid #155bd4;
        color: #155bd4;
      }

      &.active {
        border: 1px solid #155bd4;
        background-color: #e0edff;
        color: #155bd4;
      }
    }
  }

  /* 圆角 */
  .borrediu {
    span {
      display: inline-block;
      width: 48px;
      height: 26px;
      text-align: center;
      line-height: 26px;
      background: #ebedf0;
      color: #979797;
      border: 1px solid #fff;
      cursor: pointer;
      transition: all 0.5s;

      &:hover {
        border: 1px solid #155bd4;
        color: #155bd4;
      }


    }
  }

  :deep(.radi) .el-radio {
    margin-right: 8px;
  }

  :deep(.radi1) .el-radio {
    margin-right: 7px;
    .el-radio__label {
      padding-left: 5px;
    }
  }

  /* 上传图片按钮 */
  .uploadImg {
    width: 345px;
    height: 40px;
    margin-top: 20px;
  }

  // 上传弹框内容部分
  :deep(.uploadIMG) .el-dialog__body {
    height: 280px;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    justify-content: center;
  }

  .disable {
    :deep(.el-upload) {
      display: none !important;
    }
  }

  /* 图片广告列表 */
  .imgBanner {
    padding: 6px 12px;
    margin: 16px 7px;
    border-radius: 2px;
    background-color: #fff;
    box-shadow: 0 0 4px 0 rgba(10, 42, 97, 0.2);
    display: flex;
    position: relative;

    /* 删除图标 */
    .el-icon-circle-close {
      position: absolute;
      right: -10px;
      top: -10px;
      cursor: pointer;
      font-size: 19px;
    }

    /* 图片 */
    .imag {
      width: 60px;
      height: 60px;
      border-radius: 5px;
      overflow: hidden;
      position: relative;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
        display: inline-block;
      }
      span {
        background: rgba(0, 0, 0, 0.5);
        font-size: 12px;
        position: absolute;
        left: 0px;
        bottom: 0px;
        display: inline-block;
        width: 100%;
        text-align: center;
        color: #fff;
        height: 20px;
        line-height: 20px;
      }
    }

    /* 图片字 */
    .imgText {
      width: 80%;
      display: flex;
      flex-direction: column;
      box-sizing: border-box;
      padding-left: 20px;
      justify-content: space-between;
      .select-type {
        display: flex;
        :deep(.el-select) {
          .el-input {
            input {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
  }
  }
  </style>
