<template>
  <div class="district-select-wrapper">
    <el-select class="district-select"
      v-model="provinceCode"
      :loading="provinceListLoading"
      :disabled="!dsearch || disabled || propsChanging"
      @visible-change="onProvinceListVisibleChange"
      @change="onProvinceChange"
    >
      <el-option
        v-for="item in provinceList"
        :key="item.adcode"
        :label="item.name"
        :value="item.adcode"
      ></el-option>
    </el-select>
    <el-select class="district-select"
      v-model="cityCode"
      :loading="cityListLoading"
      :disabled="!dsearch || disabled || propsChanging"
      @visible-change="onCityListVisibleChange"
      @change="onCityChange"
    >
      <el-option
        v-for="item in cityList"
        :key="item.adcode"
        :label="item.name"
        :value="item.adcode"
      ></el-option>
    </el-select>
    <el-select class="district-select"
      v-model="districtCode"
      :loading="districtListLoading"
      :disabled="!dsearch || disabled || propsChanging"
      @visible-change="onDistrictListVisibleChange"
      @change="onDistrictChange"
    >
      <el-option
        v-for="item in districtList"
        :key="item.adcode"
        :label="item.name"
        :value="item.adcode"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
import AMapLoader from "@amap/amap-jsapi-loader";

try {
  if (!window._AMapSecurityConfig) {
    window._AMapSecurityConfig = {
      securityJsCode: '6d77de541c407f88fa8c33d9a9184df0',
    }
  }
} catch (error) {
  console.error(error)
}

export default {
  name: "DistrictSelect",

  props: {
    value: Array,
    disabled: Boolean,
  },

  data() {
    return {
      propsChanging: false,

      provinceList: [],
      provinceListLoading: false,
      provinceCode: null,

      cityList: [],
      cityListLoading: false,
      cityCode: null,

      districtList: [],
      districtListLoading: null,
      districtCode: null,

      dsearch: null,
    }
  },

  mounted() {
    this.init()
  },

  watch: {
    value() {
      this.update().catch((err) => {
        console.error(err)
      })
    },
  },

  methods: {
    /** 初始化 */
    async init() {
      try {
        await this.initSearch()
        await this.update()
      } catch (error) {
        console.error(error);
      }
    },

    /** 初始化搜索服务 */
    async initSearch() {
      const AMap = await AMapLoader.load({
        key: "ac1670ac4096582946ab7b1bf00f79f5",
        version: "2.0",
        plugins: ['AMap.DistrictSearch'],
      })
      const search = new AMap.DistrictSearch()
      // 包装一下，方便链式调用
      const dsearch = {
        setLevel(...args) {
          search.setLevel(...args)
          return dsearch
        },
        setSubdistrict(...args) {
          search.setSubdistrict(...args)
          return dsearch
        },
        search(...args) {
          search.search(...args)
          return dsearch
        },
      }
      this.dsearch = dsearch
    },

    async update() {
      this.propsChanging = true
      try {
        let adcode = this.value
        if (!adcode || !Array.isArray(adcode)) {
          adcode = []
        }

        await this.updateProvince(adcode[0])
        await this.updateCity(adcode[1])
        await this.updateDistrict(adcode[2])

        this.handleChange()

        this.propsChanging = false
      } catch (error) {
        this.propsChanging = false
        throw error
      }
    },

    async updateProvince(adcode) {
      if (!adcode) {
        this.provinceCode = null
        return
      }
      if (adcode !== this.provinceCode) {
        await this.initProvinceList()
        const province = this.provinceList.find(x => x.adcode === adcode)
        if (!province) {
          this.provinceCode = null
          return
        }
        this.provinceCode = adcode
      }
    },

    async updateCity(adcode) {
      if (!this.provinceCode) {
        this.cityCode = null
        this.cityList = []
        return
      }
      if (!adcode) {
        this.cityCode = null
        return
      }
      if (adcode !== this.cityCode) {
        await this.initCityList()
        const city = this.cityList.find(x => x.adcode === adcode)
        if (!city) {
          this.cityCode = null
          return
        }
        this.cityCode = adcode
      }
    },

    async updateDistrict(adcode) {
      if (!this.cityCode) {
        this.districtCode = null
        this.districtList = []
        return
      }
      if (!adcode) {
        this.districtCode = null
        return
      }
      if (adcode !== this.districtCode) {
        await this.initDistrictList()
        const district = this.districtList.find(x => x.adcode === adcode)
        if (!district) {
          this.districtCode = null
          return
        }
        this.districtCode = adcode
      }
    },

    /** 获取下级行政区列表 */
    getSubdistricts(level, name) {
      console.log({level, name})
      if (!this.dsearch) {
        return Promise.reject(new Error('行政区查询不可用'))
      }
      return new Promise((resolve, reject) => {
        try {
          this.dsearch.setLevel(level).setSubdistrict(1)
          .search(name, (status, result) => {
            console.log({status, result})
            const records = result.districtList[0].districtList
            records.sort((a, b) => a.adcode - b.adcode)
            resolve(records)
          })
        } catch (error) {
          reject(error)
        }
      })
    },

    /** 初始化省列表 */
    async initProvinceList() {
      if (this.provinceList.length) {
        return true
      }
      this.provinceListLoading = true
      try {
        const res = await this.getSubdistricts('country', '中国')
        this.provinceListLoading = false
        this.provinceList = res
        return true
      } catch (error) {
        this.provinceListLoading = false
        console.error(error)
      }
      return false
    },

    /** 初始化市列表 */
    async initCityList() {
      if (!this.provinceCode) {
        this.cityList = []
        return false
      }
      if (this.cityList.length) {
        const current = this.cityList[0].adcode.slice(0, 4) + '00'
        if (current === this.provinceCode) {
          return true
        } else {
          this.cityList = []
        }
      }
      const province = this.provinceList.find(x => x.adcode === this.provinceCode)
      if (province) {
        this.cityListLoading = true
        try {
          const res = await this.getSubdistricts('province', province.name)
          this.cityListLoading = false
          this.cityList = res
          return true
        } catch (error) {
          console.error(error)
          this.cityListLoading = false
        }
      }
      return false
    },

    /** 初始化区列表 */
    async initDistrictList() {
      if (!this.cityCode) {
        this.districtList = []
        return false
      }
      if (this.districtList.length) {
        const current = this.districtList[0].adcode.slice(0, 4) + '00'
        if (current === this.cityCode) {
          return true
        } else {
          this.districtList = []
        }
      }
      const city = this.cityList.find(x => x.adcode === this.cityCode)
      if (city) {
        this.districtListLoading = true
        try {
          const res = await this.getSubdistricts('city', city.name)
          this.districtListLoading = false
          this.districtList = res
          return true
        } catch (error) {
          console.error(error)
          this.districtListLoading = false
        }
      }
      return false
    },

    /** 省列表下拉 */
    onProvinceListVisibleChange(visible) {
      if (visible) {
        this.initProvinceList()
      }
    },

    /** 市列表下拉 */
    onCityListVisibleChange(visible) {
      if (visible) {
        this.initCityList()
      }
    },

    /** 区列表下拉 */
    onDistrictListVisibleChange(visible) {
      if (visible) {
        this.initDistrictList()
      }
    },

    /** 响应省变化 */
    onProvinceChange() {
      this.cityCode = null
      this.cityList = []

      this.districtCode = null
      this.districtList = []

      this.handleChange()
    },

    /** 响应市变化 */
    onCityChange() {
      this.districtCode = null
      this.districtList = []

      this.handleChange()
    },

    /** 响应区变化 */
    onDistrictChange() {
      this.$emit('input', [this.provinceCode, this.cityCode, this.districtCode]);
      this.handleChange()
    },

    cloneDistrict(district) {
      if (!district) {
        return null
      }
      return {
        adcode: district.adcode,
        name: district.name,
        level: district.level,
        center: district.center ? {lng: district.center.lng, lat: district.center.lat} : null,
      }
    },

    handleChange() {
      const province = this.provinceList.find(x => x.adcode === this.provinceCode)
      const city = this.cityList.find(x => x.adcode === this.cityCode)
      const district = this.districtList.find(x => x.adcode === this.districtCode)
      const value = [
        this.cloneDistrict(province),
        this.cloneDistrict(city),
        this.cloneDistrict(district),
      ]
      this.$emit('change', value)
    }
  },
};
</script>

<style scoped>
.district-select-wrapper {
  display: flex;
  align-items: center;
}

.district-select {
  flex: none;
  width: 200px;
}

.district-select + .district-select {
  margin-left: 8px;
}
</style>
