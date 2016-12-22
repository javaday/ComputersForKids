(function () {

    let app = angular.module('cfkMayTheFourth');

    app.component('announcements', {
        bindings: {
            content: '<'
        },
        templateUrl: 'templates/announcements/announcements.html',
        controller: Announcements,
        controllerAs: 'ac'

    });

    //app.controller('cosplayModalCtrl', CosplayModalCtrl);

    Announcements.$inject = ['$uibModal', 'announcementsService'];
	
	function Announcements($uibModal, announcementsService) {
		
        let ac = this;

        ac.mde = new SimpleMDE({ element: document.getElementById('mde') });
	}
})();