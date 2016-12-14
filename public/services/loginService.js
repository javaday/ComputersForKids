(function () {

	let app = angular.module('cfkMayTheFourth');

	app.factory('loginService', LoginService);

	LoginService.$inject = ['$q', '$http'];

	function LoginService($q, $http) {

		function authenticate(credentials) {

			let deferred = $q.defer();

			$http.post('/users/login', credentials)
				.then((response) => {
					if (response.data) {
						deferred.resolve(response.data);
					}
					else {
						deferred.reject('Authentication failed.');
					}
				})
				.catch((err) => {
					deferred.reject(err);
				});

			return deferred;
		}

		return {
			authenticate: authenticate
		};
	}
})();