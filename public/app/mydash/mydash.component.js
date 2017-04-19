angular
  .module('mydash')
  .component('mydash', {
    templateUrl: 'app/mydash/mydash.template.html',
    controller: ['$http', '$rootScope', function DashBoardController($http, $rootScope) {
      //get data from the server of what stocks the user tracks
      $http.get(`/users/${$rootScope.id}`).then((response) => {
        console.log(response.data, 'this is a response');
        const stocksToTrack = response.data.trackedStocks;
        console.log(stocksToTrack, 'stockies');
        let makeEndpoint = '/financials';
        stocksToTrack.forEach((stock) => { makeEndpoint += `/${stock}`; });
        console.log(makeEndpoint, 'this is your endpoint sire');
        $http.get(makeEndpoint)
          .then((resp) => {
            console.log(resp.data.data, 'this is doge response!');
            const fixedData = resp.data.data;
            fixedData.pop();
            this.stocks = fixedData;
          }).catch(err => console.error(err));
      });
    }],
  });
