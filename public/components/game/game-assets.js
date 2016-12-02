module.exports = (function () {
  let basePath = 'assets/game/sprites/'

  let empireShips = [...Array(14)].map((x, i) => {
    return `${basePath}ships/empire (${i + 1}).png`})
  let rebelShips = [...Array(24)].map((x, i) => {
    return `${basePath}ships/rebel (${i + 1}).png`})

  let empireTroops = [...Array(42)].map((x, i) => {
    return `${basePath}troopers/trooper (${i + 1}).png`})
  let rebelTroops = [...Array(5)].map((x, i) => {
    return `${basePath}troopers/rebel (${i + 1}).png`})

  return {
    sprites: {
      empire: {
        ships: empireShips,
        troopers: empireTroops
      },
      rebels: {
        ships: rebelShips,
        troopers: rebelTroops
      }

    }
  }
}())

// this.load.image('ship', 'assets/game/player.png')
// this.load.image('bullet', 'assets/game/bullet.png')
// this.load.image('enemy-green', 'assets/game/enemy-green.png')
// this.load.image('enemy-blue', 'assets/game/enemy-blue.png')
// this.load.image('blueEnemyBullet', 'assets/game/enemy-blue-bullet.png')
// this.load.spritesheet('explosion', 'assets/game/explode.png', 128, 128)
// this.load.bitmapFont('spacefont', 'assets/game/spacefont/spacefont.png', 'assets/game/spacefont/spacefont.xml')
// this.load.image('boss', 'assets/game/boss.png')
// this.load.image('deathRay', 'assets/game/death-ray.png')
