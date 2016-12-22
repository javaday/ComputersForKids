(function () {
	
	let app = angular.module('cfkMayTheFourth');

	app.controller('confirmModalController', ConfirmModalController);

	ConfirmModalController.$inject = ['$uibModalInstance', 'title', 'message', 'okText', 'cancelText'];

	function ConfirmModalController($uibModalInstance, title, message, okText, cancelText) {

		let cm = this;

		cm.title = title;
		cm.message = message;
		cm.okText = okText || 'Ok';
		cm.cancelText = cancelText || 'Cancel';
		
		cm.ok = function () {
			$uibModalInstance.close();
		};

		cm.cancel = function () {
			$uibModalInstance.dismiss();
		};
	}	
})();