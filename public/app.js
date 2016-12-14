(function () {
	
	let app = angular.module('cfkMayTheFourth', ['ui.router', 'ui.bootstrap']);

	app.value('profile', {
        id: '',
        email: '',
        firstName: '',
        lastName: '',
        roles: {}
	});

    app.constant('LocalStorageId', 'CFK-VISITOR');
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
			})
			.state('cosplay', {
				url: '/cosplay',
				component: 'cosplayDetail'
			});
	}

})();