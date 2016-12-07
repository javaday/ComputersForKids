const firebase = require('firebase');
const path = require('path');
const VisitorsDb = require('./visitors');
const UsersDb = require('./users');

let instance = null;

class Database {

	constructor() {

        const config = require('./fbAccountConfig.json');

		firebase.initializeApp(config);

        this.fb = firebase.database();
        this.auth = firebase.auth();
        this.visitors = new VisitorsDb(this);
		this.users = new UsersDb(this);
	}

	createRecord(node, data) {

		return new Promise((resolve, reject) => {

			let newRef = this.fb.ref('/' + node).push();

			data.id = newRef.key;

			newRef.set(data)
				.then(() => {
					resolve(data.toJSON());
				})
				.catch((err) => {
					reject(err);
				});
		});
	}

	updateRecord(node, data) {

		data.modified = new Date().getTime();

		return new Promise((resolve, reject) => {

			try {
				this.fb.ref('/' + node + '/' + data.id).update(data, () => {
					resolve(data);
				});
			}
			catch (err) {
				reject(err);
			}
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