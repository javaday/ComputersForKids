module.exports = (function () {

	let ACCLERATION = 600;
	let MAXSPEED = 400;
	let DRAG = 400;

	let game = null;
	let player = null;
	let shipTrail = null;
	let bullets = null;
	let cursors = null;
	let fireButton = null;
	let bulletTimer = 0;

	let Player = function (gameRef) {

		game = gameRef;

		player = game.add.sprite(400, 500, 'ship');
		player.health = 100;
		player.anchor.setTo(0.5, 0.5);
		game.physics.enable(player, Phaser.Physics.ARCADE);
		player.body.maxVelocity.setTo(MAXSPEED, MAXSPEED);
		player.body.drag.setTo(DRAG, DRAG);
		player.weaponLevel = 1

		player.events.onKilled.add(function () {
			shipTrail.kill();
		});

		player.events.onRevived.add(function () {
			shipTrail.start(false, 5000, 10);
		});

		shipTrail = game.add.emitter(player.x, player.y + 10, 400);
		shipTrail.width = 10;
		shipTrail.makeParticles('bullet');
		shipTrail.setXSpeed(30, -30);
		shipTrail.setYSpeed(200, 180);
		shipTrail.setRotation(50, -50);
		shipTrail.setAlpha(1, 0.01, 800);
		shipTrail.setScale(0.05, 0.4, 0.05, 0.4, 2000, Phaser.Easing.Quintic.Out);
		shipTrail.start(false, 5000, 10);

		//  Our bullet group
		bullets = game.add.group();
		bullets.enableBody = true;
		bullets.physicsBodyType = Phaser.Physics.ARCADE;
		bullets.createMultiple(30, 'bullet');
		bullets.setAll('anchor.x', 0.5);
		bullets.setAll('anchor.y', 1);
		bullets.setAll('outOfBoundsKill', true);
		bullets.setAll('checkWorldBounds', true);

		cursors = game.input.keyboard.createCursorKeys();
		fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	};

	Player.prototype.update = function () {

		//  Reset the player, then check for movement keys
		player.body.acceleration.x = 0;

		if (cursors.left.isDown) {
			player.body.acceleration.x = -ACCLERATION;
		}
		else if (cursors.right.isDown) {
			player.body.acceleration.x = ACCLERATION;
		}

		//  Move ship towards mouse pointer
		if (game.input.x < game.world.bounds.width - 20 &&
			game.input.x > 20 &&
			game.input.y > 20 &&
			game.input.y < game.world.bounds.height - 20) {
			var minDist = 200;
			var dist = game.input.x - player.x;
			player.body.velocity.x = MAXSPEED * game.math.clamp(dist / minDist, -1, 1);
		}

		//  Stop at screen edges
		if (player.x > game.world.bounds.width - 25) {
			player.x = game.world.bounds.width - 25;
			player.body.acceleration.x = 0;
		}

		if (player.x < 25) {
			player.x = 25;
			player.body.acceleration.x = 0;
		}

		if (player.alive && (fireButton.isDown || game.input.activePointer.isDown)) {
			fireBullet();
		}

		//  Squish and rotate ship for illusion of "banking"
		let bank = player.body.velocity.x / MAXSPEED;
		player.scale.x = 1 - Math.abs(bank) / 2;
		player.angle = bank * 30;

		//  Keep the shipTrail lined up with the ship
		shipTrail.x = player.x;
	};

	function fireBullet() {

		switch (player.weaponLevel) {

			case 1:
				//  To avoid them being allowed to fire too fast we set a time limit
				if (game.time.now > bulletTimer) {
					var BULLET_SPEED = 400;
					var BULLET_SPACING = 250;
					//  Grab the first bullet we can from the pool
					var bullet = bullets.getFirstExists(false);

					if (bullet) {
						//  And fire it
						//  Make bullet come out of tip of ship with right angle
						var bulletOffset = 20 * Math.sin(game.math.degToRad(player.angle));

						bullet.reset(player.x + bulletOffset, player.y);
						bullet.angle = player.angle;
						game.physics.arcade.velocityFromAngle(bullet.angle - 90, BULLET_SPEED, bullet.body.velocity);
						bullet.body.velocity.x += player.body.velocity.x;

						bulletTimer = game.time.now + BULLET_SPACING;
					}
				}
				break;

			case 2:
				if (game.time.now > bulletTimer) {
					var BULLET_SPEED = 400;
					var BULLET_SPACING = 550;


					for (var i = 0; i < 3; i++) {
						var bullet = bullets.getFirstExists(false);
						if (bullet) {
							//  Make bullet come out of tip of ship with right angle
							var bulletOffset = 20 * Math.sin(game.math.degToRad(player.angle));
							bullet.reset(player.x + bulletOffset, player.y);
							//  "Spread" angle of 1st and 3rd bullets
							var spreadAngle;
							if (i === 0) spreadAngle = -20;
							if (i === 1) spreadAngle = 0;
							if (i === 2) spreadAngle = 20;
							bullet.angle = player.angle + spreadAngle;
							game.physics.arcade.velocityFromAngle(spreadAngle - 90, BULLET_SPEED, bullet.body.velocity);
							bullet.body.velocity.x += player.body.velocity.x;
						}

						bulletTimer = game.time.now + BULLET_SPACING;
					}
				}
		}
	}


	return Player;

})();