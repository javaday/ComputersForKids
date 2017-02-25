(function () {
	
	let app = angular.module('cfkMayTheFourth');

	app.component('intro', {
		controller: IntroController,
		controllerAs: 'ic',
		templateUrl: 'templates/intro/intro.html'
	});

	IntroController.$inject = ['$timeout'];

	function IntroController($timeout) {

		let ic = this;
	}

})();