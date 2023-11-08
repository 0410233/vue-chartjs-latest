<template>
  <div class="amap-wrapper">
    <div id="container"></div>
    <div class="amap-search">
      <input type="text" v-model="search" @change="onSearchChange" placeholder="搜索位置">
      <div class="amap-search__results" v-if="result && result.length > 0">
        <div class="amap-search__result" v-for="r in result" :key="r.id">{{ r.name }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import AMapLoader from "@amap/amap-jsapi-loader";

export default {
  name: "vue-amap",
  data() {
    return {
      search: '',
      map: null,
      placeSearch: null,
      result: [],
      searchTimer: undefined,
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
        key: "e68d8b91cff6ccb9e6fec4a30ff403be", // 申请好的Web端开发者Key，首次调用 load 时必填
        version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap) => {
        const map = new AMap.Map("container", {
          // 设置地图容器id
          zoom: 12, // 初始化地图级别
          center: [120.372537, 36.098056], // 初始化地图中心点位置
          plugins: ['AMap.Marker']
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

        // 异步同时加载多个插件
        AMap.plugin(['AMap.Scale', 'AMap.PlaceSearch'], () => {
          map.addControl(new AMap.Scale());

          this.placeSearch = new AMap.PlaceSearch({
            pageSize: 10, // 单页显示结果条数
            pageIndex: 1, // 页码
            map: map, // 展现结果的地图实例
            autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
          });
        });

        this.map = map
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

    onSearchChange() {
      // clearTimeout(this.searchTimer)
      if (this.search && this.placeSearch) {
        // this.searchTimer = setTimeout(() => { this.searchPlace() }, 300)
        this.searchPlace()
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
