const cosplay = require('./models/Cosplay)');

class CosplayDb {

    constructor(db) {

        this.db = db;
        this.fb = db.fb;
        this.auth = db.auth
    }

    findCosplay(email) {
        let self = this;

        return new Promise((resolve, reject) => {

            try {
                self.fb.ref('/coplay').once('value', (snapshot) => {
                    snapshot.forEach((childSnapshot) => {
                       let cosplay = childSnapshot.val();
                       if(cosplay.email === email) {
                           resolve(new Cosplay(cosplay));
                       }
                    })

                    resolve(null);
                });
            }
            catch (err) {
                reject(err);
            }
        });
    }
}
