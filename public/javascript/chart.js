
var price = [ 120, 118, 119, 117, 119, 121, 122, 121, 123, 120, 118, 119, 117, 119, 121, 122, 121, 123, 120, 118, 119, 117, 119, 121, 122, 121, 123, 120, 121, 123, 121];

var stocks = [
	{value:335, name:'Stock1'},
	{value:310, name:'Stock2'},
	{value:234, name:'Stock3'},
	{value:135, name:'Stock4'},
	{value:1548, name:'Stock5'},
	{value:1218, name:'Stock6'}
]

barChart('chart-stock', 'GOOG', 'Google', price);
barChart('chart-stock', 'APPL', 'Apple, Inc', price);


barChart('chart-market', 'IBM', 'International Business Machines Corporation', price);
pieChart('portfolio', stocks);

// pie chart generator
function pieChart(canvas, stocks){
	var dom = document.getElementById(canvas);
	var myChart = echarts.init(dom);

	option = {
		title: {
	      text: 'Distribution'
	    },
	    tooltip: {
	        trigger: 'item',
	        formatter: "{a} <br/>{b}: {c} ({d}%)"
	    },
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
	            data: stocks
	        }
	    ],
	    color: ['#e3f2fd', '#bbdefb','#90caf9','#42a5f5', '#1e88e5', '#0d47a1']
	};

	myChart.setOption(option, true);
}


// bar chart generator
function barChart(canvas, symbol, company, price){
	var dom = document.getElementById(canvas);
	var myChart = echarts.init(dom);
	var increase = [];
	var decrease = [];
	var max = Math.max(...price) + 10 - Math.max(...price)%5;
	var min = Math.min(...price) - Math.min(...price)%5;

	function change(){
		for (var i = 1; i < price.length; i++) {
			var difference = price[i] - price[i-1];
			if (difference >= 0) {
				decrease.push('-');
				increase.push(difference);
			} else {
				difference = Math.abs(difference);
				decrease.push(difference);
				increase.push('-');
			}
		}
	}
	change();

	var option = {
		title: {
			text: symbol,
			subtext: company,
			// sublink: 'https://www.ibm.com/'
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
				for (var i = 31; i > 1; i--) {
					list.push(moment().subtract(i, 'days').format('l'));
				}
				return list;
			}()
		},
		yAxis: {
			type : 'value',
			max: max,
			min: min,
			interval: 5
		},
		series: [
			{
				name: 'Total-line',
				type: 'line',
				itemStyle: {
					barBorderColor: 'rgba(100,0,255,1)',
					color: 'rgba(100,0,255,1)'
				},
				data: price
			},
			{
				name: 'Price',
				type: 'bar',
				stack: 'total',
				itemStyle: {
					barBorderColor: 'rgba(0,0,0,0)',
					color: 'rgba(0,0,0,0)'
				},
				data: price
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
		        barBorderColor: 'rgba(0,0,0,0)',
		        color: 'rgba(0, 200, 255, 1)'
		      },
		      data: increase
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
		        barBorderColor: 'rgba(0,0,0,0)',
		        color: 'rgba(255,100,0,1)'
		      },
		      data: decrease
		    }
		]
	};

	myChart.setOption(option, true);
}