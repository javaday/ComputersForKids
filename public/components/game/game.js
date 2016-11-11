(function () {

	let app = angular.module('cfkMayTheFourth');

	app.component('spaceGame', {
		controller: GameController,
		controllerAs: 'gc',
		templateUrl: 'templates/game/game.html'
	});

	GameController.$inject = [];

	function GameController() {

		let gc = this;

		gc.$onInit = function () {

			let levels = require('./levels');			
			let preloader = require('./preloader');

			gc.game = new Phaser.Game(800, 600, Phaser.AUTO, 'game-container');

			gc.game.state.add('level1', levels.level1);			
			gc.game.state.add('preloader', preloader, true);			
		}
	}

})();