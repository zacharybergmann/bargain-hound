angular
  .module('app')
  .config(['$locationProvider', '$routeProvider',
    function config($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('!');

      $routeProvider
        .when('/dashboard', {
          template: '<dashboard></dashboard>',
        })
        .when('/mydash', {
          template: '<mydash></mydash>',
        })
        .when('/signup', {
          template: '<signup></signup>',
        })
        .when('/login', {
          template: '<login></login>',
        })
        .otherwise('/dashboard');
    },
  ]);
