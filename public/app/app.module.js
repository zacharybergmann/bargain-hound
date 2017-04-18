angular.module('app', [
  'ngRoute',
  'ngResource',
  'dashboard',
])
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
