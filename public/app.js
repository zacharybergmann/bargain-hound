const app = angular.module('app', [
  'ngRoute',
  'ngResource',
])
.controller('DashboardController', ($scope) => {
  $scope.stocks = [
    {
      name: 'AAPL',
      price: '$140.00',
    },
    {
      name: 'SLB',
      price: '$80.00',
    },
  ];
})
.config(($routeProvider) => {
  $routeProvider
    .when('/signup', {
      templateUrl: 'app/templates/signup.template.html',
      controller: 'SignUpController',
    })
    .when('/login', {
      templateUrl: 'app/templates/login.template.html',
      controller: 'LogInController',
    })
    .when('/mydash', {
      templateUrl: 'app/templates/my_stock.template.html',
      controller: 'MyStockController',
    }).otherwise({
      redirectTo: '/',
    });
});
