const DbRecord = require('./DbRecord');

class Donation extends DbRecord {

    constructor(props) {

        props = props || {};
        
        super(props);

        this.amount = props.amount || 0;
        this.body = props.body || {};
        this.query = props.query || {};
    }

    toJSON() {
        return Object.assign(super.toJSON(), {
            amount: this.amount
        })
    }
}

module.exports = Donation;