angular
  .module('dashboard')
  .component('dashboard', {
    templateUrl: 'app/dashboard/dashboard.template.html',
    controller: ['$http', function DashBoardController($http) {
      const basicData = ['YHOO', 'AAL', 'AMD', 'IBKC', 'FB', 'CSCO', 'SLB', 'HAL', 'GE', 'GD', 'VZ', 'PG', 'LUV', 'BP', 'C',
        'WFC', 'CMG', 'DIS', 'F', 'GM', 'GIS', 'HD', 'JPM', 'K', 'LMT', 'MMM', 'PEP',
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
