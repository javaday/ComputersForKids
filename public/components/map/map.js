(function () {

	let app = angular.module('cfkMayTheFourth');
	app.component('storeLocator', {
		controller: StoreLocator,
		controllerAs: 'slc',
		bindings: {
		},
		templateUrl: 'public/templates/map/map.html'
	});

	StoreLocator.$inject = ['$rootScope', 'NgMap'];

	function StoreLocator($rootScope, NgMap) {

		let slc = this;

		slc.markers = [{
			"name": "Computer For Kids",
			"country": "US",
			"coordinates": [-116.288543, 43.578843],
			"streetAddress": "8540 W Elisa St",
			"city": "Boise",
			"stateProvCode": "ID",
			"zip": "83709",
			"phoneNumber": "(208) 345-0346",
			"sundayOpen": false,
			"timezone": "MST"
		}]

	}
})();