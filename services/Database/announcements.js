const Announcement = require('./models/Announcement');

class AnnouncementsDb {

	constructor(db) {
        this.db = db;
        this.fb = db.fb;
        this.auth = db.auth
	}

	getAnnouncement(announcementId) {

		let self = this;
		
		return new Promise((resolve, reject) => {

			try {
				self.fb.ref('/announcements/' + announcementId).once('value', (snapshot) => {
					resolve(new Announcement(snapshot.val()));
				});
			}
			catch (err) {
				reject(err);
			}

		});
	}

	createAnnouncement(props) {

		let self = this;
		
		return new Promise((resolve, reject) => {

			let newRef = self.fb.ref('/announcements').push();
			let data = new Announcement(props);

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

	updateAnnouncement(data) {

		let self = this;
		
		data.modified = new Date().getTime();

		return new Promise((resolve, reject) => {

			try {
				self.fb.ref('/announcements/' + data.id).update(data, () => {
					resolve(data);
				});
			}
			catch (err) {
				reject(err);
			}
		});
	}
}

module.exports = AnnouncementsDb;