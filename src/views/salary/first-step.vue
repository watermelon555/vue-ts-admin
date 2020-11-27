<template>
  <div class="about">

      <select  id="drawTool" ref="drawTool">
        <option value="none">无</option>
        <option value="Point">点</option>
        <option value="LineString">线</option>
        <option value="Polygon">多边形</option>
        <option value="Circle">圆</option>
        <option value="Square">正方形</option>
        <option value="Box">长方形</option>
      </select>
    <!--      <div ref="charts" id="charts" style="width: 100%; height: 400px"></div>-->
    <div ref="map" id="map" style="width: 100%; height: 400px"></div>
  </div>
</template>

<script lang="ts">

import {Component, Vue, Watch} from 'vue-property-decorator'
import axios from 'axios'
import echarts from 'echarts'
// import ol from 'ol';

const data = require('./data-1585799654003-46R-3f-c3.json')
const data2 = require('./0LineString.json')
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZSource from 'ol/source/XYZ';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';

import Draw, {createRegularPolygon, createBox}  from 'ol/interaction/Draw';
import GeometryType from "ol/geom/GeometryType";
import Polygon from 'ol/geom/Polygon';

@Component({
  name: 'FirstStep'
})
export default class extends Vue {

  mounted() {
    // DOM节点在mounted挂载
    // this.myChart.showLoading();
    // this._getInitData()

    this._getOpenGL()
  }

  @Watch('drawTool')
  onDrawToolChanged(val: string, oldVal: string){
    console.log(val, oldVal, '======val')
  }
  private _getOpenGL() {
    /**
     * 初始化绘制矢量图层
     * */
    const source = new VectorSource({wrapX: false});

    const vector = new VectorLayer({
      source: source
    });

    /**
     *初始化地图加载底图
     * */

    const raster = new TileLayer({
      source: new OSM()
    });

    const map = new Map({
      layers: [raster, vector],
      target: 'map',
      view: new View({
        center: [-11000000, 4600000],
        zoom: 4
      })
    });

    /**
     * 添加绘制interaction
     * */
    const ids: any = document.getElementById('drawTool')
    const value:any = ids.value
        //根据不同类型设置不同geometryFunction;
    let drawType = 'None',
        //绘制类型
        geometryFunction: any = null;
    //绘制图形方法函数
    if (value === 'Square') {
      //矩形
      drawType = 'Circle';
      geometryFunction = createRegularPolygon(4);
    } else if (value === 'Box') {//拉框矩形
      drawType = 'Circle';
      geometryFunction = createBox();
    } else if (value === 'Star') {
      //星星，可自定义图形
      drawType = 'Circle';
      geometryFunction = (coordinates: any[], geometry: { setCoordinates: (arg0: any[][][]) => void; }) => {
        if (!geometry) {
          //根据绘制的坐标返回自定义的geometry，随意拓展
          geometry = new Polygon([]);
        }
        const center = coordinates[0];
        const last = coordinates[1];
        const dx = center[0] - last[0];
        const dy = center[1] - last[1];
        const radius = Math.sqrt(dx * dx + dy * dy);
        const rotation = Math.atan2(dy, dx);
        const newCoordinates = [];
        const numPoints = 12;
        for (let i = 0; i < numPoints; ++i) {
          const angle = rotation + i * 2 * Math.PI / numPoints;
          const fraction = i % 2 === 0 ? 1 : 0.5;
          const offsetX = radius * fraction * Math.cos(angle);
          const offsetY = radius * fraction * Math.sin(angle);
          newCoordinates.push([center[0] + offsetX, center[1] + offsetY]);
        }
        newCoordinates.push(newCoordinates[0].slice());
        geometry.setCoordinates([newCoordinates]);
        return geometry;
      };
    }
    const draw = new Draw({
      source: source,
      type: drawType as GeometryType,
      //Point 点;LineString 线;Polygon 面;Circle 圆;None 空;
      geometryFunction: geometryFunction
    });
    map.addInteraction(draw);
  }



/*const chartDiv = document.getElementById('charts')
const myChart = echarts.init(chartDiv as HTMLCanvasElement )
console.log(chartDiv, 'div')
myChart.hideLoading();
const usaJson = data
echarts.registerMap('USA', usaJson, {
  Alaska: {              // 把阿拉斯加移到美国主大陆左下方
    left: -131,
    top: 25,
    width: 15
  },
  Hawaii: {
    left: -110,        // 夏威夷
    top: 28,
    width: 5
  },
  'Puerto Rico': {       // 波多黎各
    left: -76,
    top: 26,
    width: 2
  }
});
const option: any = {
  title: {
    text: 'USA Population Estimates (2012)',
    subtext: 'Data from www.census.gov',
    sublink: 'http://www.census.gov/popest/data/datasets.html',
    left: 'right'
  },
  tooltip: {
    trigger: 'item',
    showDelay: 0,
    transitionDuration: 0.2,
    formatter: function (params: { value: string; seriesName: string; name: string; }) {
      let value: any = (params.value + '').split('.');
      value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
      return params.seriesName + '<br/>' + params.name + ': ' + value;
    }
  },
  visualMap: {
    left: 'right',
    min: 500000,
    max: 38000000,
    inRange: {
      color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
    },
    text: ['High', 'Low'],           // 文本，默认为数值文本
    calculable: true
  },
  toolbox: {
    show: true,
    //orient: 'vertical',
    left: 'left',
    top: 'top',
    feature: {
      dataView: {readOnly: false},
      restore: {},
      saveAsImage: {}
    }
  },
  series: [
    {
      name: 'USA PopEstimates',
      type: 'map',
      roam: true,
      map: 'USA',
      emphasis: {
        label: {
          show: true
        }
      },
      // 文本位置修正
      textFixed: {
        Alaska: [20, -20]
      },
      data: [
        // {name: 'Alabama', value: 4822023},
        // {name: 'Alaska', value: 731449},
        // {name: 'Arizona', value: 6553255},
        // {name: 'Arkansas', value: 2949131},
        // {name: 'California', value: 38041430},
        // {name: 'Colorado', value: 5187582},
        // {name: 'Connecticut', value: 3590347},
        // {name: 'Delaware', value: 917092},
        // {name: 'District of Columbia', value: 632323},
        // {name: 'Florida', value: 19317568},
        // {name: 'Georgia', value: 9919945},
        // {name: 'Hawaii', value: 1392313},
        // {name: 'Idaho', value: 1595728},
        // {name: 'Illinois', value: 12875255},
        // {name: 'Indiana', value: 6537334},
        // {name: 'Iowa', value: 3074186},
        // {name: 'Kansas', value: 2885905},
        // {name: 'Kentucky', value: 4380415},
        // {name: 'Louisiana', value: 4601893},
        // {name: 'Maine', value: 1329192},
        // {name: 'Maryland', value: 5884563},
        // {name: 'Massachusetts', value: 6646144},
        // {name: 'Michigan', value: 9883360},
        // {name: 'Minnesota', value: 5379139},
        // {name: 'Mississippi', value: 2984926},
        // {name: 'Missouri', value: 6021988},
        // {name: 'Montana', value: 1005141},
        // {name: 'Nebraska', value: 1855525},
        // {name: 'Nevada', value: 2758931},
        // {name: 'New Hampshire', value: 1320718},
        // {name: 'New Jersey', value: 8864590},
        // {name: 'New Mexico', value: 2085538},
        // {name: 'New York', value: 19570261},
        // {name: 'North Carolina', value: 9752073},
        // {name: 'North Dakota', value: 699628},
        // {name: 'Ohio', value: 11544225},
        // {name: 'Oklahoma', value: 3814820},
        // {name: 'Oregon', value: 3899353},
        // {name: 'Pennsylvania', value: 12763536},
        // {name: 'Rhode Island', value: 1050292},
        // {name: 'South Carolina', value: 4723723},
        // {name: 'South Dakota', value: 833354},
        // {name: 'Tennessee', value: 6456243},
        // {name: 'Texas', value: 26059203},
        // {name: 'Utah', value: 2855287},
        // {name: 'Vermont', value: 626011},
        // {name: 'Virginia', value: 8185867},
        // {name: 'Washington', value: 6897012},
        // {name: 'West Virginia', value: 1855413},
        // {name: 'Wisconsin', value: 5726398},
        // {name: 'Wyoming', value: 576412},
        // {name: 'Puerto Rico', value: 3667084}
      ]
    }
  ]
};
myChart.setOption(option);*/
}

//
// private  _getOpenGL() {
//
//
// }




</script>

<style lang="scss" scoped>
@import "~ol/ol.css";
</style>




