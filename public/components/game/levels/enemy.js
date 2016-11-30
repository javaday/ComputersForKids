; (function () {

    module.exports = EnemyBuilder

    function EnemyBuilder(game) {
        let greenEnemyLaunchTimer;
        
        this.green = {
            buildGroup(config) {
                greenEnemies = game.add.group();
                greenEnemies.enableBody = true;
                greenEnemies.physicsBodyType = Phaser.Physics.ARCADE;
                greenEnemies.createMultiple(config.shipCount, 'enemy-green');
                greenEnemies.setAll('anchor.x', 0.5);
                greenEnemies.setAll('anchor.y', 0.5);
                greenEnemies.setAll('scale.x', 0.5);
                greenEnemies.setAll('scale.y', 0.5);
                greenEnemies.setAll('angle', 180);
                greenEnemies.forEach(function (enemy) {
                    addEnemyEmitterTrail(enemy);
                    enemy.config = config;
                    enemy.body.setSize(enemy.width * 3 / 4, enemy.height * 3 / 4);
                    enemy.damageAmount = config.damage;
                    enemy.events.onKilled.add(function () {
                        enemy.trail.kill();
                    });
                });
                function addEnemyEmitterTrail(enemy) {
                    var enemyTrail = game.add.emitter(enemy.x, enemy.y - 10, 100);
                    enemyTrail.width = 10;
                    enemyTrail.makeParticles('explosion', [1, 2, 3, 4, 5]);
                    enemyTrail.setXSpeed(20, -20);
                    enemyTrail.setRotation(50, -50);
                    enemyTrail.setAlpha(0.4, 0, 800);
                    enemyTrail.setScale(0.01, 0.1, 0.01, 0.1, 1000, Phaser.Easing.Quintic.Out);
                    enemy.trail = enemyTrail;
                }
                return this
            },
            launchEnemy() {
                var enemy = greenEnemies.getFirstExists(false);
                if (enemy) {
                    enemy.reset(game.rnd.integerInRange(0, game.width), -20);
                    enemy.body.velocity.x = game.rnd.integerInRange(-300, 300);
                    enemy.body.velocity.y = enemy.config.speed;
                    enemy.body.drag.x = 100;
                    enemy.trail.start(false, 800, 1);

                    //  Update function for each enemy ship to update rotation etc
                    enemy.update = function () {
                        enemy.angle = 180 - game.math.radToDeg(Math.atan2(enemy.body.velocity.x, enemy.body.velocity.y));

                        enemy.trail.x = enemy.x;
                        enemy.trail.y = enemy.y - 10;

                        //  Kill enemies once they go off screen
                        if (enemy.y > game.height + 200) {
                            enemy.kill();
                            enemy.y = -20;
                        }
                    }
                }
                return this
            },
            stop() {
                game.time.events.remove(greenEnemyLaunchTimer)
                return this
            }

        }
    }
} ())




//game.time.events.add(1000, launchGreenEnemy);
