const firebase = require('firebase');
const path = require('path');

let instance = null;

class Database {

	constructor() {

		firebase.initializeApp({
			databaseURL: 'https://may-the-fourth.firebaseio.com/',
			serviceAccount: path.join(__dirname, '/fbServiceAccount.json')
		});

		this.db = firebase.database();
	}

	create(path, data) {

		return new Promise((resolve, reject) => {

			let newRef = this.db.ref('/' + path).push();

			data.id = newRef.key;

			newRef.set(data)
				.then(() => {
					resolve({
						success: true,
						data: data
					});
				})
				.catch((err) => {
					reject(err);
				});

		});

	}

	static get instance() {

		if (!instance) {
			instance = new Database();
		}

		return instance;
	}
}

module.exports = Database.instance;