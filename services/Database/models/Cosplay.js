const DbRecord = require('./DbRecord');

class Cosplay extends DbRecord {

    constructor(props) {

        props = props || {};
        
        super(props);

        this.startTime = props.startTime || 0;
        this.name = props.name || {};
        this.email = props.email || {};
        this.character = props.character || {};
    }

    toJSON() {
        return Object.assign(super.toJSON(), {
            startTime: this.startTime,
            name: this.name,
            email: this.email,
            character: this.character
        })
    }
}

module.exports = Cosplay;