angular
  .module('app')
  .config(['$locationProvider', '$routeProvider', function config($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider
      .when('/signup', {
        templateUrl: 'app/templates/signup.template.html',
        controller: 'signUp',
      })
      .when('/login', {
        templateUrl: 'app/templates/login.template.html',
        controller: 'logIn',
      })
      .when('/mydash', {
        templateUrl: 'app/templates/my_stock.template.html',
        controller: 'myStock',
      }).otherwise({
        redirectTo: '/',
      });
  }]);
