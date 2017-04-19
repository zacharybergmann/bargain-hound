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
  ])
  .run(['$rootScope', '$location', ($rootScope, $location) => {
    console.log($rootScope, 'this is a look at dolla rootscope');
    $rootScope.$on('$locationChangeStart', (event, next, current) => {
      // redirect to login page if not logged in
      if ($location.path() === '/mydash' && $rootScope.id === undefined) {
        $location.path('/login');
      }
    });
  }]);
