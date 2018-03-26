
// on page load, render bar chart
var firstStock = $('.btn-chart:nth-of-type(1)')[0];
var symbol = $(firstStock).attr('symbol');
renderBarChart(symbol, 'chart-stock');


// render pie chart
renderPieChart();
function renderPieChart(){
	var stocks = []
	var stockNum = document.getElementById('my-stocks').childElementCount;

	for (var i = 1; i <= stockNum; i++) {
		var stock = $('#my-stocks tr:nth-of-type('+i+') td:nth-of-type(1)').html();
		var value = $('#my-stocks tr:nth-of-type('+i+') td:nth-of-type(5)').html();
		stocks.push({
			value: parseFloat(value),
			name: stock
		});
	}
	pieChart('portfolio', stocks);
}

// click to switch stock
$('#panel-portfolio .btn-chart').on('click', function(){
	var symbol = $(this).attr('symbol');
	renderBarChart(symbol, 'chart-stock');
	$('html, body').animate({scrollTop : 240},800);
});

// search
$(document).on('click', '#panel-search .btn-chart', function(){
	var symbol = $(this).attr('symbol');
	$('#result-chart').toggleClass('show-hide');
	renderBarChart(symbol, 'result-chart');
});

function renderBarChart(symbol, div){
	var queryURL = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + symbol + '&apikey=GNC3G50UKYCQIXVN';

	$.ajax({
		url: queryURL,
		method: 'GET'
	}).done(function(data){
		var timeSeries = data["Time Series (Daily)"];
		var dates = Object.keys(timeSeries);
		var priceArray = [];

		for (var i = 1; i < 32; i++) {
			var price = timeSeries[dates[i]]['4. close'];
			priceArray.push(parseFloat(price));
		}

		// console.log(priceArray);
		barChart(div, symbol, priceArray);
	});
}


// pie-chart generator
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
	            radius: ['40%', '60%'],
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
function barChart(canvas, symbol, price){
	var dom = document.getElementById(canvas);
	var myChart = echarts.init(dom);
	var increase = [];
	var decrease = [];
	var max = Math.max(...price) + 10 - Math.max(...price)%5;
	var min = Math.min(...price) - Math.min(...price)%5;

	function change(){
		for (var i = 1; i < price.length; i++) {
			var difference = (price[i] - price[i-1]).toFixed(2);
			// console.log(difference);

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
			// subtext: company,
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
				for (var i = 31; i > 0; i--) {
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
					color: '#546dd0'
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
		        color: '#00BDD4'
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
		        color: '#FF6300'
		      },
		      data: decrease
		    }
		]
	};

	myChart.setOption(option, true);
}