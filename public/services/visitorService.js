(function () {

	let app = angular.module('cfkMayTheFourth');

	app.factory('visitorService', VisitorService);

	VisitorService.$inject = ['$q', '$http', 'LocalStorageId'];

	function VisitorService($q, $http, LocalStorageId) {

		let visitor = {};
		let storedId = localStorage.getItem(LocalStorageId) || '';

		activate();

		function activate() {

			if (storedId) {
				getVisitor(storedId);
			}
			else {
				createVisitor();
			}
		}

		function createVisitor() {

			let deferred = $q.defer();

			$http.get('/visitors/new')
				.then((response) => {
					if (response.data) {
						visitor = response.data;
						localStorage.setItem(LocalStorageId, visitor.id);
					}
				})
				.catch((err) => {

				});

			return deferred;
		}

		function getVisitor(id) {

			let deferred = $q.defer();

			$http.get('/visitors/' + id)
				.then((response) => {
					if (response.data) {
						visitor = response.data;
						localStorage.setItem(LocalStorageId, visitor.id);
					}
				})
				.catch((err) => {

				});

			return deferred;
		}

		return {
			visitor: visitor
		};
	}
})();