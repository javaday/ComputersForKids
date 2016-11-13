module.exports = (function () {

	let state = function () {

		let music = null;
	};

	state.prototype = {

		init: function () {

		},

		preload: function () {

		},

		create: function () {
			this.playMusic();
			this.showLogo();
			this.game.time.events.add(12000, this.showStory, this );
		},

		update: function () {

		},

		playMusic: function () {
			this.music = this.game.add.audio('music');
			this.music.play();

			this.game.onPause.add(this.pauseMusic, this);
			this.game.onResume.add(this.resumeMusic, this);
		},

		pauseMusic: function () {
			this.music.pause();
		},

		resumeMusic: function () {
			this.music.resume();
		},

		showLogo: function () {

			//document.body.classList.add('body-stars');

			this.logoText = this.game.add.text(
				this.game.width * 0.5,
				this.game.height * 0.5,
				'Computer\nWars',
				{
					font: '140px sf_distant_galaxyregular',
					fill: 'rgb(0,0,0)',
					stroke: '#ff6',
					strokeThickness: 10,
					align: 'center'
				}
			);

			this.logoText.anchor.setTo(0.5, 0.5);
			this.logoText.scale.setTo(1.5, 1.5);
			this.positionTween = this.game.add.tween(this.logoText).to({ y: '-50' }, 14000, Phaser.Easing.Linear.Out, true);
			this.logoTween = this.game.add.tween(this.logoText.scale).to({ x: 0, y: 0 }, 12000, Phaser.Easing.Linear.Out, true);
			this.alphaTween = this.game.add.tween(this.logoText).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.In, true, 10500);
		},

		showStory: function () {

			let gameContainer = document.getElementById('game-container');
			
			gameContainer.classList.add('container-story');
			
			this.storyGroup = this.game.add.group();

			this.storyText1 = this.game.add.text(
				this.game.width * 0.5,
				this.game.height * 1.4,
				'Episode MMXVII\n\nComputers For Kids',
				{
					font: '700 60px "Arial"',
					fill: '#ff6',
					wordWrap: true,
					wordWrapWidth: this.game.width - 50,
					align: 'center'
				}
			);

			this.storyText1.anchor.setTo(0.5, 1);

			this.storyGroup.add(this.storyText1);

			this.storyText2 = this.game.add.text(
				this.game.width * 0.5,
				this.storyText1.y + this.storyText1.height + 85,
				"It is a time of conflict. A group of unlikely heroes have band together on a mission to provide critical training tools to Jedi Younglings.",
				{
					font: '700 44px "Arial"',
					fill: '#ff6',
					wordWrap: true,
					wordWrapWidth: this.game.width - 50,
					align: 'center'
				}
			);

			this.storyText2.anchor.setTo(0.5, 1);

			this.storyGroup.add(this.storyText2);

			this.storyText3 = this.game.add.text(
				this.game.width * 0.5,
				this.storyText2.y + this.storyText2.height + 50,
				"In an effort to prevent the training of future Jedis, the Empire is sending Imperial Pilots to intercept shipments of computers.",
				{
					font: '700 44px "Arial"',
					fill: '#ff6',
					wordWrap: true,
					wordWrapWidth: this.game.width - 50,
					align: 'center'
				}
			);

			this.storyText3.anchor.setTo(0.5, 1);

			this.storyGroup.add(this.storyText3);

			this.storyText4 = this.game.add.text(
				this.game.width * 0.5,
				this.storyText3.y + this.storyText3.height + 50,
				"As an escort fighter, your job is to protect the shipping caravan from attack.",
				{
					font: '700 44px "Arial"',
					fill: '#ff6',
					wordWrap: true,
					wordWrapWidth: this.game.width - 50,
					align: 'center'
				}
			);

			this.storyText4.anchor.setTo(0.5, 1);

			this.storyGroup.add(this.storyText4);

			this.storyText5 = this.game.add.text(
				this.game.width * 0.5,
				this.storyText4.y + this.storyText4.height + 50,
				"In doing so, you will become part of something greater than yourself...",
				{
					font: '700 44px "Arial"',
					fill: '#ff6',
					wordWrap: true,
					wordWrapWidth: this.game.width - 50,
					align: 'center'
				}
			);

			this.storyText5.anchor.setTo(0.5, 1);

			this.storyGroup.add(this.storyText5);

			this.storyTween = this.game.add.tween(this.storyGroup).to({ y: -(this.game.height * 3) }, 71000, Phaser.Easing.Linear.InOut, true);
			this.storyTween.onComplete.add((target, tween) => {
				gameContainer.classList.remove('container-story');
				this.game.levels.startNext();
			});
		},
	};

	return state;

})();