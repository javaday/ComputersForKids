module.exports = (function () {

    let state = function () {

    }

    state.prototype = {

        init: function () {
            this.scale.pageAlignHorizontally = true;
            this.scale.pageAlignVertically = true;
        },

        preload: function () {

            this.load.audio('music', ['assets/game/audio/music.m4a', 'assets/game/audio/music.ogg']);

            this.showLoadingText();
        },

        create: function () {
            //this.starField = this.add.tileSprite(0, 0, 900, 600, 'starfield');
            //this.game.levels.startNext();
        },

        update: function () {
            if (this.cache.isSoundDecoded('music') && !this.ready) {
                this.ready = true;
                this.showIntro();
            }
        },

        showLoadingText: function () {

            this.loadingText = this.game.add.text(this.game.world.bounds.width * 0.5, this.game.world.bounds.height * 0.5, 'Loading...', {
                font: '40px "Arial"',
                fill: 'rgb(75, 213, 238)'
            });

            this.loadingText.anchor.setTo(0.5, 0.5);

            this.loadingText.inputEnabled = true;
        },

        showIntro: function () {

            this.loadingText.destroy();

            this.introText = this.game.add.text(this.game.width * 0.5, this.game.height * 0.5, 'A long time ago, in a galaxy\nfar far away...', {
                font: '40px "Arial"',
                fill: 'rgb(75, 213, 238)'
            });

            this.introText.anchor.setTo(0.5, 0.5);
            this.introText.alpha = 0;
            this.introTweenIn = this.game.add.tween(this.introText).to({ alpha: 1 }, 1500, Phaser.Easing.Linear.Out);
            this.introTweenIn.onComplete.add(() => {
                this.hideIntro();
            });

            this.introTweenIn.start();
        },

        hideIntro: function () {
            
            this.introText.alpha = 1;
            this.introTweenOut = this.game.add.tween(this.introText).to({ alpha: 0 }, 1500, Phaser.Easing.Linear.Out).delay(5000);
            this.introTweenOut.onComplete.add(this.start, this);
            this.introTweenOut.start();
        },

        start: function () {
            this.game.time.events.add(1000, () => {
                this.game.levels.startNext();
            });
        }
    };

    return state;

})();