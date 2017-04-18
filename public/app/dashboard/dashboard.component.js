angular.
  module('dashboard').
  component('dashboard', {
    templateUrl: 'app/dashboard/dashboard.template.html',
    controller: ['$http', '$scope', function DashBoardController($http, $scope) {
      const self = this;
      self.orderProp = 'age';
      const basicData = ['YHOO', 'SLB', 'HAL', 'GE', 'GD', 'VZ', 'PG', 'AAL', 'LUV', 'AMD', 'BP', 'C',
        'WFC', 'CSCO', 'CMG', 'DIS', 'F', 'GM', 'FB', 'GIS', 'IBKC', 'HD', 'JPM', 'K', 'LMT', 'MMM', 'PEP',
        'PFE', 'PM', 'RCL', 'TEVA', 'WMT', 'XON'];

      this.stocks = [
        {
          name: 'WC',
          price: '$50.00',
        },
        {
          name: 'WFC',
          price: '$60.00',
        },
      ];

      let makeEndpoint = '/financials';
      basicData.forEach((stock) => { makeEndpoint += `/${stock}`; });
      console.log(makeEndpoint, 'this is your endpoint sire');
      $http.get(makeEndpoint)
        .then((resp) => {
          console.log(resp, 'this is doge response!');
        }).catch(err => console.error(err));

    }],
  });
