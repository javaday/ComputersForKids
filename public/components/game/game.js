(function () {

	let app = angular.module('cfkMayTheFourth');

	app.component('spaceGame', {
		controller: GameController,
		controllerAs: 'gc',
		templateUrl: 'templates/game/game.html'
	});

	GameController.$inject = ['visitorService'];

	function GameController(visitorService) {

		let gc = this;

		gc.$onInit = function () {

			let levels = require('./levels');			

			gc.game = new Phaser.Game(800, 600, Phaser.AUTO, 'game-container');

            levels.loadGameLevels(gc.game);
            levels.startNext();
		}
	}

})();