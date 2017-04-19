angular
  .module('signup')
  .component('signup', {
    templateUrl: 'app/signup/signup.template.html',
    controller: ['$http', '$rootScope', function SignUpController($http, $rootScope) {
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
          }).catch(err => err);
        }
      };
      this.signup = signup;
    }],
  });