(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
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
},{"./level":3,"./preloader":4}],3:[function(require,module,exports){
module.exports = (function() {
    
    let state = function() {
        
        var starField = null;
        var hudText = null;
        var player = null;
        var asteroids = null;
    };
    
    state.prototype = {
        
        init: function() {
            
        },
        
        preload: function() {
            
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
        
        create: function() {
            
            this.physics.startSystem(Phaser.Physics.ARCADE);
            this.physics.arcade.gravity.y = 0;
            
            this.starField = this.add.tileSprite(0, 0, 800, 700, 'starfield');
            
            //this.player = new Player(this);
            //this.hudText = this.game.add.text(10, 670, '', { font: '15px Arial', fill: '#ffffff' });
            
            //this.asteroids = new Asteroids(this);
            
        },
        
        update: function() {
            this.starField.tilePosition.y += 0.125;
        }
    };
    
    return state;
    
})();
},{}],4:[function(require,module,exports){
module.exports = (function() {
    
    let state = function() {
        
    }
    
    state.prototype = {
        
        init: function() {
            this.scale.pageAlignHorizontally = true;
        },
        
        create: function() {
            this.state.start('level');
        }
        
    };
    
    return state;
    
})();
},{}],5:[function(require,module,exports){
(function () {

	let app = angular.module('cfkMayTheFourth');

	app.component('home', {
		controller: HomeController,
		controllerAs: 'hc',
		templateUrl: 'templates/home/home.html'
	});

	HomeController.$inject = [];

	function HomeController() {

		let hc = this;

		hc.$onInit = function () {
			
		}
	}

})();
},{}]},{},[1,2,3,4,5]);
