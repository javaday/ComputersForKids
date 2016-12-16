(function () {

    let app = angular.module('cfkMayTheFourth');

    app.factory('cosplayService', CosplayService);

    CosplayService.$inject = ['$q', '$http'];

    function CosplayService($q, $http) {

        function signUp(details) {

            let deferred = $q.defer();

            $http.post('/cosplay/signup', details)
                .then((response) => {
                    if (response.data) {
                        deferred.resolve(response.data);
                    }
                    else {
                        deferred.reject('Signup Failed');
                    }
                })
                .catch((err) => {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        return {
            signUp: signUp
        }
    }

})();