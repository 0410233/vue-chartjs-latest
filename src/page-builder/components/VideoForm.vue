<template>
    <div class="options">
      <h4 class="options__title">{{ meta.label }}</h4>
      <el-form :model="formdata" class="options__form" label-position="left" label-width="90px"
        @submit.native.prevent="noop"
      >

      <p style=" font-size: 12px; margin-top: 10px">
        视频
      </p>

      <!-- 下划线 -->
      <div class="bor" />
      <el-upload
                class="upload-demo"
                :action="action"
                :headers="headers"
                accept="video/*"
                :limit="1"
                :on-success="handleSuccess"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :before-remove="beforeRemove"
                :name="fieldName"
              >
                <!-- <div v-model="" ></div> -->
                <!-- <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">建议上传清晰度在720p以上的视频</div> -->
                <div class="link-item__image" >


              <i class="el-icon el-icon-plus"></i>


          </div>
          <div slot="tip" class="el-upload__tip" style="color: #969799; font-size: 12px; margin-top: 10px">建议上传清晰度在720p以上的视频</div>
              </el-upload>
      <p style="color: red; font-size: 12px; margin-top: 10px">
        请添加视频
      </p>
      <p style=" font-size: 12px; margin-top: 10px">
        封面
      </p>

      <!-- 下划线 -->
      <div class="bor" />
      <div class="link-item__image" :class="picimg && 'is-chosen'" @click="chooseImage()">
        <img v-if="picimg" :src="picimg" class="avatar">
            <template >
              <i class="el-icon el-icon-plus"></i>
              <span>添加图片</span>
            </template>
          </div>
      <p style="color: red; font-size: 12px; margin-top: 10px">
        请添加封面
      </p>
      <h4 class="options__title">播放设置</h4>
        <el-form-item label="进度条">
            <div class="lef">
        <span>{{ formdata.showProgressBar ==true ? '是' : '否' }}</span>
            <el-switch
            v-model="formdata.showProgressBar"
            @change="handleChange($event, 'showProgressBar')"
  >
</el-switch>
</div>
        </el-form-item>
        <el-form-item label="自动播放">
            <!-- {{ datas.autoplay ? '是' : '否' }} -->
            <div class="lef">
        <span>{{ formdata.autoplay ==true ? '是' : '否' }}</span>
            <el-switch
            v-model="formdata.autoplay"
            @change="handleChange($event, 'autoplay')"
  >
</el-switch>
</div>
        </el-form-item>
        <el-form-item label="视频声音">
            <!-- {{ datas.autoplay ? '是' : '否' }} -->
            <div class="lef">
                <span>{{ formdata.isMuted ==true ? '是' : '否' }}</span>
            <el-switch
            v-model="formdata.isMuted"
            @change="handleChange($event, 'isMuted')"
  >
</el-switch>
</div>
        </el-form-item>

      </el-form>
    </div>
  </template>

<script>
import { getPropDefaultValue } from './utils'
import {
  getProps,
  getFormdata,
  getWatchers,
  getMeta,
} from './video'
import SettingMer from '@/utils/settingMer';
import useErrors from './mixins/useErrors'

export default {
  mixins: [useErrors],
  components: {},
  props: getProps(),
  data() {
    return {
      meta: getMeta(),
      formdata: getFormdata(),
      action: `${SettingMer.apiBaseURL}/mall/api/admin/merchant/upload/video?model=product&pid=0`,
      fieldName: 'multipart',
      picimg:'',
    }
  },
  watch: getWatchers(),
  computed: {
    headers() {
      // const jwt=localStorage.getItem('jwt')
      return {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOlsicmVzMSJdLCJ1c2VyX25hbWUiOiJ7XCJhY2NvdW50XCI6XCJtZXJjaGFudDVcIixcImhlYWRlckltYWdlXCI6XCJcIixcImlkXCI6NyxcImxhc3RJcFwiOlwiMTI3LjAuMC4xXCIsXCJtZXJJZFwiOjEsXCJwYXNzd29yZFwiOlwiJDJhJDEwJEs2cC91VWI4U0NlNFYyR1o2clptaU9ZVTRUa1Z2YWozNTFORVlhS0R0c2lVZHdWRHFTckMuXCIsXCJyZWFsTmFtZVwiOlwi6LaF57qn566h55CG5ZGYXCIsXCJyb2xlc1wiOlwiMlwiLFwidHlwZVwiOjR9Iiwic2NvcGUiOlsiMSJdLCJleHAiOjE2OTI4NDM4NDEsImF1dGhvcml0aWVzIjpbIm1hbGwiXSwianRpIjoiZDhlZTMwMmItYTgzNC00MDE1LWFiYTEtOWJkYjVkZDk0YTljIiwiY2xpZW50X2lkIjoicGxhdGZvcm1fY2xpZW50In0.Xm9_UNmYN-UsJv9xLRghIj1LogWhn36CN-EhRn-KcH8',
      }
    },
  },
  methods: {
    /** 选择图片 */
    chooseImage(index) {
      this.$modalUpload(imgs => {
        if (imgs.length) {
          console.log(imgs)
          this.picimg = imgs[0].sattDir
          this.$emit('change', {coverUrl: this.picimg})
        }
      }, '1');
    },

    handleSuccess(response, file, fileList) {
      this.formdata.videosrc=response.data.url
      this.$emit('change', {videosrc: this.formdata.videosrc})

      console.log(999,this.formdata.videosrc)
      // this.formValidate.videoLink = response.data.url;
      // console.log(response, file, fileList, 'response,file, fileList');
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    /** 修改属性值 */
    handleChange(value, prop) {
      // console.log('handleChange', {[prop]: value})
      this.$emit('change', {[prop]: value})
    },
    /** 重置属性值 */
    reset(prop) {
      const value = getPropDefaultValue(getProps(), prop)
      this.handleChange(value, prop)
    },
    noop() {},
  },
}
</script>

<style lang="scss" src="../assets/utils.scss" scoped></style>
<style lang="scss" src="../assets/view-options.scss" scoped></style>
<style lang="scss">
  .lef{
        display: flex;
        align-items: center;
        justify-content: space-between;
        .el-switch__core {
  width: 30px !important;
  height: 16px;
}
.el-switch__core::after {
  width: 14px;
  height: 14px;
  margin-top: -1px;
}
.el-switch.is-checked .el-switch__core::after{
  margin-left: -15px;
}
  }
  .link-item__image {
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
  </style>
