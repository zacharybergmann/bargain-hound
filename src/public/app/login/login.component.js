angular
  .module('login')
  .component('login', {
    templateUrl: 'app/login/login.template.html',
    controller: ['$http', '$rootScope', '$location', function LogInController($http, $rootScope, $location) {
      const login = (username, password) => {
        if (username !== '' && password !== '') {
          $http({
            method: 'GET',
            url: `/login/${username}/${password}`,
          }).then((success) => {
            $rootScope.id = success.data._id;
            $location.path('/mydash');
          }).catch(err => err);
        }
      };
      this.login = login;
    }],
  });
