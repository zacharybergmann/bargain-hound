angular
  .module('dashboard')
  .component('dashboard', {
    templateUrl: 'app/dashboard/dashboard.template.html',
    controller: ['$http', function DashboardController($http) {
      const thisRef = this;

      $http({
        // Access-Control-Allow-Origin
        method: 'JSONP',  //????? not GET???
        url: 'http://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=1min&apikey=54G6', //fix this URL
        headers: { 'Access-Control-Allow-Origin': 'localhost:8080' },
      }).then((response) => {
        console.log(response, 'response from yahoo!'); //need to fix this!!
        thisRef.stocks.push(response);
      })
        .catch(err => err);






      // this.stocks = [
      //   {
      //     name: 'AAPL',
      //     price: '$140.00',
      //   },
      //   {
      //     name: 'SLB',
      //     price: '$80.00',
      //   },
      // ];
    }],
  });
