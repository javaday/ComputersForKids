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

			let level = require('./level');			
			let preloader = require('./preloader');

			gc.game = new Phaser.Game(800, 600, Phaser.AUTO, 'game-container');

			gc.game.state.add('level', level);			
			gc.game.state.add('preloader', preloader, true);			
		}
	}

})();