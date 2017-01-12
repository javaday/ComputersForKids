const Donation = require('./models/Donation');

class DonationsDb {

	constructor(db) {
        this.db = db;
        this.fb = db.fb;
        this.auth = db.auth
	}

	getDonation(donationId) {

		let self = this;
		
		return new Promise((resolve, reject) => {

			try {
				self.fb.ref('/donations/' + donationId).once('value', (snapshot) => {
					resolve(new Donation(snapshot.val()));
				});
			}
			catch (err) {
				reject(err);
			}

		});
	}

	createDonation(props) {

		let self = this;
		
		return new Promise((resolve, reject) => {

			let newRef = self.fb.ref('/donations').push();
			let data = new Donation(props);

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

	updateDonatiion(data) {

		let self = this;
		
		data.modified = new Date().getTime();

		return new Promise((resolve, reject) => {

			try {
				self.fb.ref('/donations/' + data.id).update(data, () => {
					resolve(data);
				});
			}
			catch (err) {
				reject(err);
			}
		});
	}
}

module.exports = DonationsDb;