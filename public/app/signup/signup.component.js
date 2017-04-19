angular
  .module('signup')
  .component('signup', {
    templateUrl: 'app/signup/signup.template.html',
    controller: ['$http', '$scope', function SignUpController($http, $scope) {
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
            $scope.id = success.data._id;
          }).catch(err => err);
        }
      };
      this.signup = signup;
    }],
  });