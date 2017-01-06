const Visitor = require('./models/Visitor');

class VisitorsDb {

	constructor(db) {
        this.db = db;
        this.fb = db.fb;
        this.auth = db.auth
	}

	getVisitor(visitorId) {

		let self = this;
		
		return new Promise((resolve, reject) => {

			try {
				self.fb.ref('/visitors/' + visitorId).once('value', (snapshot) => {
					resolve(snapshot.val());
				});
			}
			catch (err) {
				reject(err);
			}

		});
	}

	createVisitor() {

		let self = this;
		
		return new Promise((resolve, reject) => {

			let newRef = self.fb.ref('/visitors').push();
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

		let self = this;
		
		data.modified = new Date().getTime();

		return new Promise((resolve, reject) => {

			try {
				self.fb.ref('/visitors/' + data.id).update(data, () => {
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