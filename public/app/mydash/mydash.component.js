angular
  .module('mydash')
  .component('mydash', {
    templateUrl: 'app/mydash/mydash.template.html',
    controller: ['$http', function DashBoardController($http) {
      this.orderProp = 'age';
      const basicData = ['YHOO', 'SLB', 'HAL', 'GE', 'GD', 'VZ', 'PG', 'AAL', 'LUV', 'AMD', 'BP', 'C',
        'WFC', 'CSCO', 'CMG', 'DIS', 'F', 'GM', 'FB', 'GIS', 'IBKC', 'HD', 'JPM', 'K', 'LMT', 'MMM', 'PEP',
        'PFE', 'PM', 'RCL', 'TEVA', 'WMT', 'XON'];

      let makeEndpoint = '/financials';
      basicData.forEach((stock) => { makeEndpoint += `/${stock}`; });
      console.log(makeEndpoint, 'this is your endpoint sire');
      $http.get(makeEndpoint)
        .then((resp) => {
          console.log(resp.data.data, 'this is doge response!');
          const fixedData = resp.data.data;
          fixedData.pop();
          this.stocks = fixedData;
        }).catch(err => console.error(err));
    }],
  });