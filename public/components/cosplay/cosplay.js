(function () {

    let app = angular.module('test');

    app.component('cosplayDetail', {
        bindings: {
            content: '<'
        },
        templateUrl: 'templates/cosplay.html',
        controller: CosplayDetail,
        controllerAs: 'cd'

    });

    CosplayDetail.$inject = [];

    function CosplayDetail() {

        let cd = this;

        cd.$onInit = function () {

            //Drop down div
            $("#sign-up").click(function () {

                let door = document.getElementById('door-sound');
                door.play();
                $("#div-slide").slideToggle(2030, function () {

                });
            });

        }

    };

})();