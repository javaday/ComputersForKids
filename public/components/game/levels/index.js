module.exports = (function () {

	function LevelManager() {

		this.levels = [
			{
				order: 1,
				name: 'preloader',
				state: require('./preloader')
			},
			{
				order: 2,
				name: 'opening',
				state: require('./opening')
			},
			{
				order: 3,
				name: 'level1',
				state: require('./level1')
			}
		];
		this.game = null;
		this.currentIndex = -1;
	}

	LevelManager.prototype.loadGameLevels = function (game) {

		this.game = game;

		this.levels.forEach((level) => {
			game.state.add(level.name, level.state);
		});

		game.levels = this;
	};

	LevelManager.prototype.startNext = function () {

		this.currentIndex += 1;
		this.game.state.start(this.levels[this.currentIndex].name);
	};

	return new LevelManager();
})();
