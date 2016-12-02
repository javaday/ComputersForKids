module.exports = (function () {
   
	 let player = require('./player')
	 let assets = require('./game-assets')
	 console.log(assets)
    return {
			state: {},
			assets,
			objects: {
				player
			},
			methods: {

			}
		} 

})();