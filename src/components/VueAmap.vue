<template>
  <div class="amap-wrapper">
    <DistrictSelect v-model="district"></DistrictSelect>
    <div id="container"></div>
    <div class="amap-search">
      <input type="text" :value="search" @input="onSearchChange" placeholder="搜索位置">
      <div class="amap-search__results" v-if="result && result.length > 0">
        <div class="amap-search__result" v-for="r in result" :key="r.id">{{ r.name }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import AMapLoader from "@amap/amap-jsapi-loader";
import DistrictSelect from "./DistrictSelect.vue";

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
  name: "vue-amap",
  components: {
    DistrictSelect,
  },
  data() {
    return {
      search: '',
      map: null,
      placeSearch: null,
      result: [],
      searchTimer: undefined,

      district: [],
    }
  },
  mounted() {
    this.initAMap();
  },
  unmounted() {
    this.map?.destroy();
  },
  methods: {
    initAMap() {
      AMapLoader.load({
        key: "ac1670ac4096582946ab7b1bf00f79f5",
        version: "2.0",
        plugins: ['AMap.Scale', 'AMap.PlaceSearch', 'AMap.Marker'],
      }).then((AMap) => {
        const map = new AMap.Map("container", {
          zoom: 14,
        });

        map.on('click', (e) => {
          console.log('on map click', e)
          // console.log({lng: e.lnglat.lng, lat: e.lnglat.lat})
          // map.add(new AMap.Marker({
          //   position: e.lnglat
          // }))
          // map.setCenter(e.lnglat, true)
          // map.setZoomAndCenter(13, e.lnglat, true)
        })

        map.addControl(new AMap.Scale());

        this.placeSearch = new AMap.PlaceSearch({
          pageSize: 10, // 单页显示结果条数
          pageIndex: 1, // 页码
          map: map, // 展现结果的地图实例
        });

        // const districtSearch = new AMap.DistrictSearch({
        //   level: 'city', // 关键字对应的行政区级别，country表示国家
        //   subdistrict: 1 // 显示下级行政区级数，1表示返回下一级行政区
        // })

        // // 搜索所有省/直辖市信息
        // districtSearch.search('北京城区', function(status, result) {
        //   // 查询成功时，result即为对应的行政区信息
        //   console.log({status, result})
        // })

        this.map = map

        // setTimeout(() => {
        //   this.district = ['110000', '110100', '110101']
        // }, 3000);
      }).catch((e) => {
        console.log(e);
      });
    },

    searchPlace() {
      if (this.map && this.placeSearch) {
        const center = this.map.getCenter()
        this.placeSearch.searchNearBy(this.search, center, 3000, (status, result) => {
          console.log({status, result})
          this.result = result.poiList?.pois
        })
      }
    },

    clearSearch() {
      this.result = []
      this.map.clearMap()
    },

    onSearchChange(e) {
      this.search = e.detail.value
      clearTimeout(this.searchTimer)
      if (this.search && this.placeSearch) {
        this.searchTimer = setTimeout(() => { this.searchPlace() }, 300)
        // this.searchPlace()
      } else {
        this.clearSearch()
      }
    },

    onClickMap(e) {
      console.log('onClickMap', e)
    }
  },
};
</script>
<style scoped>
.amap-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
}

#container {
  width: 100%;
  height: 100%;
}

.amap-search {
  display: block;
  width: 360px;
  height: 40px;


  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 100;
}

.amap-search > input {
  display: block;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 0 1em;
  background: #ffffff;
  box-shadow: 0 2px 2px rgba(0,0,0,.15);

  font-size: 14px;

  margin: 0;
}

.amap-search__results {
  display: block;
  width: 100%;
  height: 240px;
  overflow-y: auto;
  overflow-x: hidden;
  background: #ffffff;
  border: 1px solid #666666;
  border-top: none;

  position: absolute;
  top: 100%;
  left: 0;
}

.amap-search__result {
  width: 100%;
  box-sizing: border-box;
  padding: 8px 1em;
  font-size: 14px;
  cursor: pointer;
}

.amap-search__result:hover {
  background: #f1f1f1;
  transition: all 200ms;
}
</style>
