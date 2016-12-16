module.exports = (function () {

    let Player = require('./../player');
    let EnemyBuilder = require('./enemy');
		let config = require('../config')

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
					  let game = this
            this.load.image('ship', 'assets/game/player.png');
            this.load.image('bullet', 'assets/game/bullet.png');
            this.load.image('enemy-green', 'assets/game/enemy-green.png');
            this.load.image('enemy-blue', 'assets/game/enemy-blue.png');
            this.load.image('blueEnemyBullet', 'assets/game/enemy-blue-bullet.png');
            this.load.spritesheet('explosion', 'assets/game/explode.png', 128, 128);
            this.load.bitmapFont('spacefont', 'assets/game/spacefont/spacefont.png', 'assets/game/spacefont/spacefont.xml');
            this.load.image('boss', 'assets/game/boss.png');
            this.load.image('deathRay', 'assets/game/death-ray.png');

						config.assets.sprites.empire.ships.forEach((ship, i)=>{
							game.load.image(`ship${i}`, ship)
						})

						config.assets.sprites.rebels.ships.forEach((ship, i)=>{
							game.load.image(`rebel-ship${i}`, ship)
						})

        },

        create: function () {
            let game = this;

            this.physics.startSystem(Phaser.Physics.ARCADE);
            this.physics.arcade.gravity.y = 0;

            this.player = new Player(this);
            
            this.greenEnemies = new EnemyBuilder(this).green.buildGroup({
                shipCount: 14,
                damage: 100,
                speed: 65,
                health: 50,
                colliders: [{
                    name:'player',
                    damage: 50 
                },{
                    name: 'bullet',
                    damage: 100
                }]
            });
            setInterval(game.greenEnemies.launchEnemy, 1000)
            

            

            //this.hudText = this.game.add.text(10, 670, '', { font: '15px Arial', fill: '#ffffff' });

            //this.asteroids = new Asteroids(this);
        },

        update: function () {

            this.player.update();
        }
    };

    return state;

})();