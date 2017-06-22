angular
  .module('signup')
  .component('signup', {
    templateUrl: 'app/signup/signup.template.html',
    controller: ['$http', '$rootScope', '$location', function SignUpController($http, $rootScope, $location) {
      const signup = (username, password) => {
        if (username !== '' && password !== '') {
          $http({
            method: 'POST',
            url: '/users',
            data: JSON.stringify({
              username,
              password,
            }),
          }).then((success) => {
            $rootScope.id = success.data._id;
            $location.path('/mydash');
          }).catch(err => console.log('not ok'));
        }
      };
      this.signup = signup;
    }],
  });
