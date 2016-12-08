const User = require('./models/User');

class UsersDb {

    constructor(db) {
        this.db = db;
        this.fb = db.fb;
        this.auth = db.auth
    }

    getUser(userId) {

        return new Promise((resolve, reject) => {

            try {
                this.fb.ref('/users/' + userId).once('value', (snapshot) => {
                    resolve(snapshot.val());
                });
            }
            catch (err) {
                reject(err);
            }

        });
    }

    createUser(props) {

        return new Promise((resolve, reject) => {

            try {
                this.auth.createUserWithEmailAndPassword(props.email, props.password)
                    .then((newAccount) => {

                        resolve({
                            id: newAccount.uid,
                            email: newAccount.email
                        }); 
                        
                    })
                    .catch((error) => {
                        reject(error);
                    });
            }
            catch (err) {
                reject(err);
            }

        });
    }

    updateUser(data) {

        data.modified = new Date().getTime();

        return this.db.updateRecord('users', data);
    }
}

module.exports = UsersDb;