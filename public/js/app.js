
var lock = new Auth0Lock('aJPXuic5MPSYv35id6DoDxl7ZJJP2rtT', 'devious.auth0.com', {
  auth: {
  	domain: 'devious.auth0.com',
  	audience: 'https://devious.auth0.com/userinfo',
    redirectUrl: (process.env.AUTH0_CALLBACK_URL + '/callback' || 'http://localhost:5000/callback'),
    responseType: 'code',
    params: {
      scope: 'openid profile' // Learn about scopes: https://auth0.com/docs/scopes
    }
  }
});

// clear search
$('.search-nav').on('click', function(){
	$('#search-result').removeClass('show-hide');
});

// menu search
$('#menu-search').on('click', function(){
	searchStock('menu-search-input');
	$('.nav-tab a').removeClass('active');
	$('.search-nav a').addClass('active');

	$('.tab-pane').removeClass('in show active');
	$('#panel-search').addClass('in show active');
	$('html, body').animate({scrollTop : 200},800);
});

// search in tab
$('#search-btn').on('click', function(){
	searchStock('search-input');
});

function searchStock(inputId){
	var searchKey = $('#'+inputId).val().trim().toUpperCase();
	var queryURL = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + searchKey.replace(/ /g,'') + '&apikey=GNC3G50UKYCQIXVN';

	$.ajax({
		url: queryURL,
		method: 'GET'
	}).done(function(data){
		if(data['Meta Data'] === undefined){
			$('#search-keyword').html(searchKey + ' - No stock found. Please enter a correct symbol');
			$('#search-result tbody').html('');
			$('#search-result table').addClass('show-hide');
		} else {
			var today = moment().format('YYYY-MM-DD');
			if (data["Time Series (Daily)"][today] === undefined) {
				today = moment().subtract(1, 'days').format('YYYY-MM-DD');
				if (data["Time Series (Daily)"][today] === undefined) {
					today = moment().subtract(2, 'days').format('YYYY-MM-DD');
				}
			}
			var price = parseFloat(data["Time Series (Daily)"][today]['1. open']);
			var symbol = data['Meta Data']['2. Symbol'].toUpperCase();

			var resultTr = `<tr>
			<td>${symbol}</td>
			<td>${price}</td>
			<td><a class="btn btn-indigo btn-custom-small btn-chart" href="#0" symbol="${symbol}">Detail</a>
			<a class="btn btn-cyan btn-custom-small" href="#0">Buy</a></td>
			</tr>`

			$('#search-keyword').html(searchKey);
			$('#search-result tbody').html(resultTr);
			$('#search-result table').removeClass('show-hide');
		}
		$('#'+inputId).val('');
		$('#search-result').removeClass('show-hide');
	});
}
