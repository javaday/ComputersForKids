const firebase = require('firebase');
const db = require('../Database');

let instance = null;

class Authenticator {

    constructor() {

        const config = require('../fbAccountConfig.json');

        this.app = firebase.initializeApp(config, 'Authenticator');
        this.auth = this.app.auth();
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

                self.auth.signInWithEmailAndPassword(email, password)
                    .then((account) => {

                        self.auth.signOut();
                        
                        db.users.getUser(account.uid)
                            .then((user) => {
                                resolve(user);
                            })
                            .catch((error) => {
                                reject(error);
                            });
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });

        }
    }

    static get instance() {

        if (!instance) {
            instance = new Authenticator();
        }

        return instance;
    }
}

module.exports = Authenticator.instance;