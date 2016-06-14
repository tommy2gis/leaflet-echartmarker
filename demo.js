  $(function() {
      // Leaflet Map Init
      function initMap() {
          var selectedPicture;
          var originalZIndex;
          var map = L.map('map', {
              zoomControl: false
          }).setView([30.75, 120.65], 11);
          L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              maxZoom: 18,
              attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' + '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
              id: 'osm'
          }).addTo(map);
          $.getJSON('data.json', function(data) {
              $.each(data.data, function(i, val) {
                  var pictures = L.marker(val.location, {
                      icon: L.divIcon({
                          className: 'leaflet-echart-icon',
                          iconSize: [160, 160],
                          html: '<div id="marker' + val.id + '" style="width: 160px; height: 160px; position: relative; background-color: transparent;">asd</div>'
                      })
                  }).addTo(map);
                  // 基于准备好的dom，初始化echarts实例
                  var myChart = echarts.init(document.getElementById('marker' + val.id));
                  // 指定图表的配置项和数据
                  option = {
                      tooltip: {
                          trigger: 'item',
                          formatter: "{a} <br/>{b}: {c} ({d}%)"
                      },
                      series: [{
                          name: '访问来源',
                          type: 'pie',
                          radius: ['20', '50'],
                          avoidLabelOverlap: false,
                          label: {
                              normal: {
                                  show: false,
                                  position: 'center'
                              },
                              emphasis: {
                                  show: true,
                                  textStyle: {
                                      fontSize: '18',
                                      fontWeight: 'bold'
                                  }
                              }
                          },
                          labelLine: {
                              normal: {
                                  show: false
                              }
                          },
                          data: [{
                              value: val.value1,
                              name: '直接访问'
                          }, {
                              value: val.value2,
                              name: '邮件营销'
                          }, {
                              value: val.value3,
                              name: '联盟广告'
                          }, {
                              value: val.value4,
                              name: '视频广告'
                          }, {
                              value: 20,
                              name: '搜索引擎'
                          }]
                      }]
                  };
                  // 使用刚指定的配置项和数据显示图表。
                  myChart.setOption(option);
              });
          });
      }
      initMap();
  });