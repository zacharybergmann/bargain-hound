angular.
  module('dashboard').
  component('dashboard', {
    templateUrl: 'app/dashboard/dashboard.template.html',
    controller: ['$http', function DashBoardController($http) {
      var self = this;
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

      $http.get('/financials').then(function(response) {
        console.log(response);
        //start rendering content to the page by assigning to scope
      });
    }]
  });
