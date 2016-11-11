const DbRecord = require('./DbRecord');
const moment = require('moment');

class Visitor extends DbRecord {

    constructor(props) {

        props = props || {};
        
        super(props);

        this.email = props.email || '';
    }

    get firstVisit() {
        return moment(this.created).format('MM/DD/YYYY h:m A');
    }

    get lastVisit() {
        return moment(this.modified).format('MM/DD/YYYY h:m A');
    }

    toJSON() {
        return Object.assign(super.toJSON(), {
            email: this.email
        })
    }
}

module.exports = Visitor;