(function () {

	let app = angular.module('cfkMayTheFourth');

	app.component('login', {
		controller: LoginController,
		controllerAs: 'lc',
		templateUrl: 'templates/home/login.html'
	});

	app.controller('loginModalController', LoginModalController);

	LoginController.$inject = ['$uibModal'];
	LoginModalController.$inject = ['$uibModalInstance'];

	function LoginController($uibModal) {

		let lc = this;

		lc.$onInit = function () {

		}

		lc.login = function () {

			var modalInstance = $uibModal.open({
				templateUrl: 'loginModal.html',
				size: 'sm',
				controller: 'loginModalController',
				controllerAs: 'lm',
				resolve: {}
			});

			modalInstance.result.then(
				function (credentials) {
					$ctrl.selected = selectedItem;
				},
				function () {
					// cancelled
				}
			);
		}
	}

	function LoginModalController($uibModalInstance) {

		let lm = this;

		lm.credentials = {
			email: '',
			password: ''
		};
		
		lm.ok = function () {
			$uibModalInstance.close(lm.credentials);
		};

		lm.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	}

})();