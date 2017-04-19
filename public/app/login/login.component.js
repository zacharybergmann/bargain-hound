angular
  .module('login')
  .component('login', {
    templateUrl: 'app/login/login.template.html',
    controller: ['$http', '$rootScope', function LogInController($http, $rootScope) {
      const login = (username, password) => {
        if (username !== '' && password !== '') {
          $http({
            method: 'GET',
            url: `/login/${username}/${password}`,
            data: JSON.stringify({
              username,
              password,
            }),
          }).then((success) => {
            $rootScope.id = success.data._id;
          }).catch(err => err);
        }
      };
      this.login = login;
    }],
  });