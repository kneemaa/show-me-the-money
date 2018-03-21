var dom = document.getElementById("portfolio");
var myChart = echarts.init(dom);
var app = {};

option = {
	title: {
      text: 'Distribution'
      // subtext: 'International Business Machines Corp',
      // sublink: 'https://www.ibm.com/'
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    // legend: {
    //     orient: 'vertical',
    //     x: '50px',
    //     y: 'center',
    //     data:['Stock1','Stock2','Stock3','Stock4','Stock5', 'Stock6']
    // },
    series: [
        {
            name:'Distribution',
            type:'pie',
            radius: ['40%', '50%'],
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '20',
                        fontWeight: 'bold'
                    }
                }
            },
            data:[
                {value:335, name:'Stock1'},
                {value:310, name:'Stock2'},
                {value:234, name:'Stock3'},
                {value:135, name:'Stock4'},
                {value:1548, name:'Stock5'},
                {value:1218, name:'Stock6'}
            ]
        }
    ],
    color: ['#e3f2fd', '#bbdefb','#90caf9','#42a5f5', '#1e88e5', '#0d47a1']
};

myChart.setOption(option, true);
