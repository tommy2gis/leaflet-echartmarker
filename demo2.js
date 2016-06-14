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
                          iconSize: [220, 220],
                          html: '<div id="marker' + val.id + '" style="width: 220px; height: 220px; position: relative; background-color: transparent;"></div>'
                      })
                  }).addTo(map);
                  // 基于准备好的dom，初始化echarts实例
                  var myChart = echarts.init(document.getElementById('marker' + val.id));
                  // 指定图表的配置项和数据
                  option = {
                      tooltip: {
                          trigger: 'axis'
                      },
                      xAxis: [{

                          type: 'category',
                          data: ['1月', '2月', '3月', '4月']
                      }],
                      yAxis: [{
                          type: 'value',
                          name: '水量',
                          min: 0,
                          max: 50,
                          interval: 50,
                          axisLabel: {
                              formatter: '{value} ml'
                          }
                      }, {
                          type: 'value',
                          name: '温度',
                          min: 0,
                          max: 10,
                          interval: 5,
                          axisLabel: {
                              formatter: '{value} °C'
                          }
                      }],
                      series: [{
                          name: '蒸发量',
                          type: 'bar',
                          data: [2.0, 4.9, 7.0, 23.2]
                      }, {
                          name: '降水量',
                          type: 'bar',
                          data: [2.6, 5.9, 9.0, 26.4]
                      }, {
                          name: '平均温度',
                          type: 'line',
                          yAxisIndex: 1,
                          data: [2.0, 2.2, 3.3, 4.5]
                      }]
                  };
                  
                  // 使用刚指定的配置项和数据显示图表。
                  myChart.setOption(option);
              });
          });
      }
      initMap();
  });