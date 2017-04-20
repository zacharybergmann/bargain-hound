angular
  .module('mydash')
  .component('mydash', {
    templateUrl: 'app/mydash/mydash.template.html',
    controller: ['$http', '$rootScope', function DashBoardController($http, $rootScope) {
      // get data from the server of what stocks the user tracks
      const init = () => {
        $http.get(`/users/${$rootScope.id}`).then((response) => {
          const stocksToTrack = response.data.trackedStocks;
          if (stocksToTrack.length === 0) {
            return;
          }
          let makeEndpoint = '/financials';
          stocksToTrack.forEach((stock) => { makeEndpoint += `/${stock}`; });
          $http.get(makeEndpoint)
            .then((resp) => {
              const fixedData = resp.data.data;
              fixedData.pop();
              this.stocks = fixedData;
            }).catch(err => err);
        });
      };
      init();

      const addStock = (stockToAdd) => {
        if (stockToAdd !== '') {
          $http.put(`/users/id/${$rootScope.id}/stock/${stockToAdd.toUpperCase()}/type/add`)
            .then((res) => {
              this.init();
            }).catch(err => err);
        }
      };

      const deleteStock = (symb) => {
        $http.put(`/users/id/${$rootScope.id}/stock/${symb}/type/remove`)
          .then((res) => {
            this.init();
          }).catch(err => err);
      };

      this.deleteStock = deleteStock;
      this.addStock = addStock;
      this.init = init;
    }],
  });
