const Visitor = require('./models/Visitor');

class VisitorsDb {

	constructor(firebase) {
		this.db = firebase;
	}

	getVisitor(visitorId) {

		return new Promise((resolve, reject) => {

			try {
				this.db.ref('/visitors/' + visitorId).once('value', (snapshot) => {
					resolve(snapshot.val());
				});
			}
			catch (err) {
				reject(err);
			}

		});
	}

	createVisitor() {

		return new Promise((resolve, reject) => {

			let newRef = this.db.ref('/visitors').push();
			let data = new Visitor();

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

	updateVisitor(data) {

		data.modified = new Date().getTime();

		return new Promise((resolve, reject) => {

			try {
				this.db.ref('/visitors/' + data.id).update(data, () => {
					resolve(data);
				});
			}
			catch (err) {
				reject(err);
			}
		});
	}
}

module.exports = VisitorsDb;