angular
  .module('dashboard')
  .component('dashboard', {
    templateUrl: 'app/dashboard/dashboard.template.html',
    controller: ['$http', function DashBoardController($http) {
      const basicData = ['YHOO', 'SLB', 'HAL', 'GE', 'GD', 'VZ', 'PG', 'AAL', 'LUV', 'AMD', 'BP', 'C',
        'WFC', 'CSCO', 'CMG', 'DIS', 'F', 'GM', 'FB', 'GIS', 'IBKC', 'HD', 'JPM', 'K', 'LMT', 'MMM', 'PEP',
        'PFE', 'PM', 'RCL', 'TEVA', 'WMT', 'XON'];

      let makeEndpoint = '/financials';
      basicData.forEach((stock) => { makeEndpoint += `/${stock}`; });
      $http.get(makeEndpoint)
        .then((resp) => {
          const fixedData = resp.data.data;
          fixedData.pop();
          this.stocks = fixedData;
        }).catch(err => err);
    }],
  });
