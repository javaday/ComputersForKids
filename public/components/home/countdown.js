(function () {

	let app = angular.module('cfkMayTheFourth');

	app.component('countdown', {
		controller: CountdownController,
		controllerAs: 'cd',
		templateUrl: 'templates/home/countdown.html',
        bindings: {
			caption: '@',
			targetDate: '@'
		}
	});

	CountdownController.$inject = ['$timeout', 'ngAudio'];

	function CountdownController($timeout, ngAudio) {

		let cd = this;

		cd.days = 0;
		cd.hours = 0;
		cd.minutes = 0;
		cd.seconds = 0;
		cd.muted = false;
		cd.sound = ngAudio.load('assets/audio/preparing-for-battle.wav');

		cd.$onInit = function () {
			setInterval(tick, 1000);
			cd.sound.play();
			//cd.sound.muting = false;
		}

		cd.toggleSound = function () {
			cd.muted = !cd.muted;
			cd.sound.muting = cd.muted;
		}	
		
		function tick() {

            $timeout(function() {

				let currentDate = moment();
				let targetDate = moment(cd.targetDate);

				let seconds = Math.abs(currentDate.diff(targetDate, 'seconds'));
				let duration = moment.duration(seconds, 'seconds');

				cd.days = Math.floor(duration.asDays());
				cd.hours = Math.floor(duration.asHours() - cd.days * 24);
				cd.minutes = Math.floor(duration.asMinutes() - (cd.days * 24 * 60) - (cd.hours * 60));
                cd.seconds = 60 - currentDate.seconds();
				
            }, 0);

		}
	}

})();