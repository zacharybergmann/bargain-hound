angular
  .module('dashboard')
  .component('dashboard', {
    templateUrl: 'app/dashboard/dashboard.template.html',
    controller: function DashboardController() {
      this.stocks = [
        {
          name: 'AAPL',
          price: '$140.00',
        },
        {
          name: 'SLB',
          price: '$80.00',
        },
      ];
    },
  });
