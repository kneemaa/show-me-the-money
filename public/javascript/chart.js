
var dom = document.getElementById("chart");
var myChart = echarts.init(dom);
var app = {};
var option = {
    title: {
        text: 'IBM',
        subtext: 'International Business Machines Corp',
        sublink: 'https://www.ibm.com/'
    },
    tooltip : {
        trigger: 'axis',
        axisPointer : {
            type : 'shadow'
        },
        formatter: function (params) {
            var tar;
            if (params[1].value != '-') {
                tar = params[1];
            }
            else {
                tar = params[0];
            }
            return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
        }
    },
    legend: {
        data:['Down','Up']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        splitLine: {show:false},
        data:  function (){
            var list = [];
            for (var i = 1; i <= 31; i++) {
                list.push('Mar,' + i);
            }
            return list;
        }()
    },
    yAxis: {
        type : 'value',
        min: 110,
        max: 130
    },
    series: [
      {
          name: 'Total-line',
          type: 'line',
          itemStyle: {
              normal: {
                  barBorderColor: 'rgba(100,0,255,1)',
                  color: 'rgba(100,0,255,1)'
              },
              emphasis: {
                  barBorderColor: 'rgba(100,0,255,1)',
                  color: 'rgba(100,0,255,1)'
              }
          },
          data: [ 120, 118, 119, 117, 119, 121, 122, 121, 123, 120]
      },
        {
            name: 'Total',
            type: 'bar',
            stack: 'total',
            itemStyle: {
                normal: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: 'rgba(0,0,0,0)'
                }
            },
            data: [ 120, 118, 119, 117, 119, 121, 122, 121, 123, 120]
        },
        {
            name: 'Up',
            type: 'bar',
            stack: 'total',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            itemStyle: {
                normal: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: 'rgba(0, 200, 255, 1)'
                }
            },
            data: [ '-', 1, '-', 2, 2, 1, '-', 2, '-']
        },
        {
            name: 'Down',
            type: 'bar',
            stack: 'total',
            label: {
                normal: {
                    show: true,
                    position: 'bottom'
                }
            },
            itemStyle: {
                normal: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: 'rgba(0,100,255,1)'
                }
            },
            data: [2, '-', 2, '-', '-', '-', 1, '-', 3]
        }
    ]
};
;
myChart.setOption(option, true);
