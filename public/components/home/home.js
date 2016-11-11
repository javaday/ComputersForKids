(function () {

	let app = angular.module('cfkMayTheFourth');

	app.component('home', {
		controller: HomeController,
		controllerAs: 'hc',
		templateUrl: 'templates/home/home.html'
	});

	HomeController.$inject = [];

	function HomeController() {

		let hc = this;

		hc.$onInit = function () {
			
		}
	}

})();