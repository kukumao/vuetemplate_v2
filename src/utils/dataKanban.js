import { nineList, toFixedTwo } from '@/utils';

// 绘制折线图
export const lineChart = (that, chartData, contentId) => {
  let _this = that;
  // 数据
  let numList;
  let dateList;
  let lineData = chartData || [];
  if (lineData.length > 0) {
    numList = lineData.map(n => n.member);
    dateList = lineData.map(d => {
      let dateTime = new Date(d.date);
      let year = dateTime.getFullYear();
      let month = dateTime.getMonth() + 1;
      let date = dateTime.getDate();
      let dateText = `${year}/${month}/${date}`;
      return dateText;
    });
  } else {
    numList = [];
    dateList = [];
  };

  // 基于准备好的dom，初始化echarts实例
  let lineCharts = _this.$echarts.init(
    document.getElementById(contentId)
  );
  // 绘制图表
  lineCharts.setOption({
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: dateList,
      axisLine: {
        show: false
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        show: false
      }
    },
    tooltip: {
      trigger: 'axis'
    },
    series: [
      {
        data: numList,
        type: 'line',
        smooth: true,
        areaStyle: {},
        itemStyle: {
          normal: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#92C6FC' // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: '#fff' // 100% 处的颜色
                }
              ],
              globalCoord: false // 缺省为 false
            },
            lineStyle: {
              color: '#1a94ff'
            }
          }
        }
      }
    ]
  });
};

// 绘制饼状体
export const pieChart = (that, chartData, contentId) => {
  let _this = that;
  // 基于准备好的dom，初始化echarts实例
  let pieChart2 = chartData;
  // 截取前面9个数据，其余的放到新数据“其它”中；
  pieChart2.list = nineList(pieChart2.list);
  // 截取完毕，继续往下走
  let title2 = pieChart2.memberSourceItem;
  let legendData2;
  let seriesData2;
  if (pieChart2.list.length > 0) {
    seriesData2 = pieChart2.list.map(d => {
      let item = {
        value: d.member,
        name: d.memberSourceName
      };
      return item;
    });
  } else {
    seriesData2 = [];
  }
  if (pieChart2.list.length > 0) {
    let legendData2 = [];
    let allCount2 = 0;
    seriesData2.forEach(item => {
      allCount2 = allCount2 + item.value;
    });
    for (let n in seriesData2) {
      let per2 = allCount2 ? toFixedTwo(Number((seriesData2[n]['value'] / allCount2) * 100)) + '%' : '0%';
      seriesData2[n]['name'] =
        seriesData2[n]['name'] +
        ' ' +
        ' ' +
        ' ' + per2;
      legendData2.push(seriesData2[n]['name']);
    }
  } else {
    legendData2 = [];
  }
  let circlularChart2 = _this.$echarts.init(
    document.getElementById(contentId)
  );
  // 绘制图表
  circlularChart2.setOption({
    title: {
      right: 0,
      text: title2
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c}'
    },
    legend: {
      type: 'scroll',
      orient: 'vertical',
      x: 'right',
      top: 30,
      data: legendData2,
      icon: 'circle'
    },
    series: [
      {
        name: title2,
        type: 'pie',
        radius: ['50%', '70%'],
        center: ['30%', '50%'],
        avoidLabelOverlap: false,
        label: {
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '16',
              fontWeight: 'bold'
            }
          },
          normal: {
            // formatter: '{b|{b}}\n{c|( {c} )}\n{per|{d}%}',
            formatter: '',
            show: false,
            position: 'center',
            rich: {
              b: {
                fontSize: 16,
                lineHeight: 33
              },
              per: {
                fontSize: 16,
                lineHeight: 33
              },
              c: {
                fontSize: 16,
                lineHeight: 33
              }
            }
          }
        },
        data: seriesData2,
        itemStyle: {
          normal: {
            color: function(params) {
              // build a color map as your need.
              var colorList = [
                '#1a94ff',
                '#00de8d',
                '#00b877',
                '#9bde00',
                '#ffcd03',
                '#ff922b',
                '#0b75d9',
                '#00448c',
                '#7921de',
                '#858dff'
              ];
              return colorList[params.dataIndex];
            }
          }
        }
      }
    ]
  });
};
