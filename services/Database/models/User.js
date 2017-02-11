const Visitor = require('./Visitor');
const moment = require('moment');

class User extends Visitor {

    constructor(props) {

        props = props || {};
        
        super(props);

		this.roles = props.roles || [];
    }

    toJSON() {
        return Object.assign(super.toJSON(), {
            roles: this.roles
        })
    }
}

module.exports = User;