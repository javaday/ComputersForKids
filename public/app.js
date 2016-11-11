(function () {
	
	let app = angular.module('cfkMayTheFourth', ['ui.router', 'ui.bootstrap']);

	app.config(AppConfiguration);

	AppConfiguration.$inject = ['$stateProvider', '$urlRouterProvider'];

	function AppConfiguration($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('home', {
				url: '/',
				component: 'home'
			})
			.state('game', {
				url: '/game',
				component: 'spaceGame'
			});
	}

})();