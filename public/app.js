const app = angular.module('app', [])
.config(($routeProvider) => {
  $routeProvider
    .when('/mystocks', {
      templateUrl: 'app/templates/my_stock.template.html',
      controller: 'MyStockController'
    })
    .when('/stocksummary', {
      templateUrl: 'app/templates/stock_summary.template.html',
      controller: 'SummaryController'
    }).otherwise({
      redirectTo: '/'
    });
});
