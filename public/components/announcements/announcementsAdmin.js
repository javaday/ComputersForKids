(function () {

    let app = angular.module('cfkMayTheFourth');

    app.component('announcementsAdmin', {
        bindings: {
            content: '<'
        },
        templateUrl: 'templates/announcements/announcementsAdmin.html',
        controller: AnnouncementsAdmin,
        controllerAs: 'aa'

    });


	AnnouncementsAdmin.$inject = ['$uibModal', 'announcementsService'];
	
	function AnnouncementsAdmin($uibModal, announcementsService) {
		
		let aa = this;
		
		aa.announcements = [
			{
				title: 'This Is A Test',
				description: 'This is a test of the emergency broadcast system.'
			}
		];

		aa.delete = function (event, announcement) {

			event.preventDefault();
			
			let confirmTitle = 'Delete Announcement';
			let confirmMessage = `Do you really want to delete the '${ announcement.title }' announcement?`;
			let confirmOk = 'Yes';
			let confirmCancel = 'No';

            var modalInstance = $uibModal.open({
                templateUrl: 'templates/core/confirmModal.html',
                size: 'md',
                controller: 'confirmModalController',
                controllerAs: 'cm',
				resolve: {
					title: function () { return confirmTitle; },
					message: function () { return confirmMessage; },
					okText: function () { return confirmOk; },
					cancelText: function () { return confirmCancel; }
				}
            });

            modalInstance.result.then(
                function() {
                },
                function() {
                }
            )
		};

	}

})();