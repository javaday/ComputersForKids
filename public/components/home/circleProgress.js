(function () {

	let app = angular.module('cfkMayTheFourth');

	app.component('circleProgress', {
		controller: CircleProgressController,
		controllerAs: 'cp',
		templateUrl: 'templates/home/circleProgress.html',
		bindings: {
			caption: '@',
			value: '@',
			total: '@',
			radius: '@',
			strokeWidth: '@'
		}
	});

	CircleProgressController.$inject = [];

	function CircleProgressController() {

		let cp = this;

		cp.$onInit = function () {

            cp.percentage = parseInt(cp.value) / parseInt(cp.total);
			cp.height = parseInt(cp.radius) * 2;
			cp.width = parseInt(cp.radius) * 2;
			cp.viewBox = `0 0 ${cp.width} ${cp.height}`;
			cp.cx = parseInt(cp.radius);
            cp.cy = parseInt(cp.radius);
            cp.captionY = parseInt(cp.radius) - 10;
			cp.valueY = parseInt(cp.radius) + 10;
			cp.circleRadius = parseInt(cp.radius) - parseInt(cp.strokeWidth) / 2;
			cp.dashArray = parseInt(cp.radius) * Math.PI * 2;
			cp.dashOffset = cp.dashArray - cp.dashArray * cp.percentage;
        }
		
        cp.$onChanges = function(changes) {
            if (changes.value) {
                cp.percentage = parseInt(changes.value.currentValue) / parseInt(cp.total);
				cp.dashOffset = cp.dashArray - cp.dashArray * cp.percentage;
			}
		}
	}

})();