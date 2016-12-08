const firebase = require('firebase');

class Authenticator {

	constructor() {

		this.config = require('./../Database/fbAccountConfig.json');
	}

	authenticate(email, password, done) {

		let self = this;
		
		authStrategy(email, password)
			.then((user) => {
				done(null, user);
			})
			.catch((error) => {
				return done(error);
			});
	
		function authStrategy(email, pasword) {

			return new Promise((resolve, reject) => {

				let userApp = firebase.initializeApp(self.config, email);

				userApp.auth().signInWithEmailAndPassword(email, password)
					.then((account) => {

						let user = {
							id: account.uid,
							email: account.email
						};

						userApp.auth().signOut();
						userApp.delete();

						resolve(user);
					})
					.catch((error) => {
						reject(error);
					});
			});

		}
	}	
}

module.exports = Authenticator;