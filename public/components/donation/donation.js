(function () {
	let app = angular.module('cfkMayTheFourth');

	app.component('formControl', {
		controller: FormControl,
		controllerAs: 'li',
		bindings: {
			item: '<'
		},
		templateUrl: 'templates/donation/donation.html'
	})

	FormControl.$inject = ['$scope', 'formService'];

	function FormControl($scope, formService) {
		let li = this;

		li.acceptableItems = [];
		li.notAcceptable = [];
		li.hddNote;

		formService.getItems().then(function (response) {
			li.acceptableItems = response.acceptableItems;
			li.notAcceptable = response.notAcceptable;
			li.hddNote = response.hddNote;
			$scope.$apply()
		})

	}
})()