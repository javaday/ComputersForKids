(function () {

    let app = angular.module('cfkMayTheFourth');

    app.factory('cosplayService', CosplayService);

    CosplayService.$inject = ['$q', '$http', 'LocalStorageId'];

    function CosplayService($q, $http, LocalStorageId) {



    }
})();