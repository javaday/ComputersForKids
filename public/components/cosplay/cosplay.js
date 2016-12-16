(function () {

    let app = angular.module('cfkMayTheFourth');

    app.component('cosplayDetail', {
        bindings: {
            content: '<'
        },
        templateUrl: 'templates/cosplay/cosplay.html',
        controller: CosplayDetail,
        controllerAs: 'cd'

    });

    app.controller('cosplayModalCtrl', CosplayModalCtrl);

    CosplayDetail.$inject = ['$uibModal', 'cosplayService'];
    CosplayModalCtrl.$inject = ['$uibModalInstance'];

    function CosplayDetail($uibModal, cosplayService) {

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

        cd.signup = function (startTime) {

            var modalInstance = $uibModal.open({
                templateUrl: 'cosplayModal.html',
                size: 'md',
                controller: 'cosplayModalCtrl',
                controllerAs: 'cm',
                resolve: {}
            });

            modalInstance.result.then(
                function(details) {

                    details.startTime = startTime;
                    cosplayService.signUp(details);
                },

                function() {
                    //cancelled modal
                }
            )
        }

    }

    function CosplayModalCtrl($uibModalInstance) {

        let cm = this;

        cm.signup = {
            name: '',
            email: '',
            character: ''
        };
        cm.errors = [];

        cm.ok = function() {
            
            cm.errors = [];

            if(!cm.signup.name) {
                cm.errors.push = 'Please enter your name.'
            }

            if(!cm.signup.email) {
                cm.errors.push = 'Please enter your email.'
            }

            if(!cm.signup.character) {
                cm.errors.push = 'Please select a character.'
            }

            if(cm.errors.length < 1) {
                $uibModalInstance.close(cm.signup);
            }
        }
        
        cm.cancel = function () {
            $uibModalInstance.dismiss();
        }
    }
})();