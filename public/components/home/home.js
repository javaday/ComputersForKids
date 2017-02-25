(function () {

	let app = angular.module('cfkMayTheFourth');

	app.component('home', {
		controller: HomeController,
		controllerAs: 'hc',
		templateUrl: 'templates/home/home.html'
	});

	HomeController.$inject = ['$timeout'];

	function HomeController($timeout) {

		let hc = this;
		let intro = $('#intro');
		let splash = $('#splash');
		let story = $('#story');

		hc.showIntro = false;
		hc.showSplash = false;
		hc.showStory = false;

		hc.$onInit = function () {

			showStory();
		}

		function showIntro() {

			hc.showIntro = true;

			$timeout(() => {
				intro.animate({
					opacity: 1
				}, 3000, () => {
					setTimeout(() => {
						intro.animate({
							opacity: 0
						}, 3000, () => {
							showSplash();
						});
					}, 1000);
				});
			}, 1000);
		}

		function showSplash() {

			hc.showIntro = false;
			hc.showSplash = true;

			$timeout(() => {
				splash.animate({
					opacity: 0,
					zoom: 0.52
				}, 5000, () => {
					//hc.showSplash = false;
				});
			}, 1000);
		}

		function showStory() {

			hc.showSplash = false;
			hc.showStory = true;

			$timeout(() => {
				story.animate({
					marginTop: -500
				}, 5000, () => {

				});
			}, 1000);
			
		}
	}

})();