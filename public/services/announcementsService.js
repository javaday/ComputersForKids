(function () {

    let app = angular.module('cfkMayTheFourth');

    app.factory('announcementsService', AnnouncementsService);

    AnnouncementsService.$inject = ['$q', '$http'];

    function AnnouncementsService($q, $http) {

        function getActive() {

            let deferred = $q.defer();

            $http.get('/announcements')
                .then((response) => {
                    if (response.data) {
                        deferred.resolve(response.data);
                    }
                    else {
                        deferred.reject('Get Announcements Failed');
                    }
                })
                .catch((err) => {
                    deferred.reject(err);
                });

            return deferred.promise;
        }

        return {
            getActive: getActive
        }
    }

})();