(function() {

    let app = angular.module('cfkMayTheFourth');

    app.component('login', {
        controller: LoginController,
        controllerAs: 'lc',
        templateUrl: 'templates/home/login.html'
    });

    app.controller('loginModalController', LoginModalController);

    LoginController.$inject = ['$uibModal', 'profile', 'loginService'];
    LoginModalController.$inject = ['$uibModalInstance', 'loginService'];

    function LoginController($uibModal, profile, loginService) {

        let lc = this;

        lc.user = null;

        lc.$onInit = function() {

        }

        lc.login = function() {

            var modalInstance = $uibModal.open({
                templateUrl: 'loginModal.html',
                size: 'sm',
                controller: 'loginModalController',
                controllerAs: 'lm',
                resolve: {}
            });

            modalInstance.result.then(
                function(user) {

                    profile.id = user.id;
                    profile.email = user.email;
                    profile.firstName = user.firstName;
                    profile.lastName = user.lastName;

                    lc.user = user;
                },
                function() {
                    // cancelled
                }
            );
        };

        lc.logout = function() {

            profile.id = '';
            profile.email = '';
            profile.firstName = '';
            profile.lastName = '';

            lc.user = null;
			
            loginService.logout()
                .then(() => {
                })
                .catch((err) => {
                    console.log('logout: ', err);
                });
        };
    }

    function LoginModalController($uibModalInstance, loginService) {

        let lm = this;

        lm.credentials = {
            email: '',
            password: ''
        };
        lm.error = '';

        lm.ok = function() {

            lm.error = '';

            loginService.authenticate(lm.credentials)
                .then((user) => {
                    $uibModalInstance.close(user);
                })
                .catch((err) => {
                    console.log('login: ', err);
                    lm.error = err.data;
                });
        };

        lm.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    }

})();