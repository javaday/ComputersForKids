module.exports = (function () {

    let Player = require('./../player');

    let state = function () {

        let starField = null;
        let hudText = null;
        let player = null;
        let asteroids = null;

    };

    state.prototype = {

        init: function () {

        },

        preload: function () {

            this.load.image('starfield', 'assets/game/starfield.png');
            this.load.image('ship', 'assets/game/player.png');
            this.load.image('bullet', 'assets/game/bullet.png');
            this.load.image('enemy-green', 'assets/game/enemy-green.png');
            this.load.image('enemy-blue', 'assets/game/enemy-blue.png');
            this.load.image('blueEnemyBullet', 'assets/game/enemy-blue-bullet.png');
            this.load.spritesheet('explosion', 'assets/game/explode.png', 128, 128);
            this.load.bitmapFont('spacefont', 'assets/game/spacefont/spacefont.png', 'assets/game/spacefont/spacefont.xml');
            this.load.image('boss', 'assets/game/boss.png');
            this.load.image('deathRay', 'assets/game/death-ray.png');

        },

        create: function () {

            this.physics.startSystem(Phaser.Physics.ARCADE);
            this.physics.arcade.gravity.y = 0;

            this.starField = this.add.tileSprite(0, 0, 800, 700, 'starfield');

            this.player = new Player(this);
            //this.hudText = this.game.add.text(10, 670, '', { font: '15px Arial', fill: '#ffffff' });

            //this.asteroids = new Asteroids(this);
        },

        update: function () {

            this.starField.tilePosition.y += 0.125;
            this.player.update();
        }
    };

    return state;

})();