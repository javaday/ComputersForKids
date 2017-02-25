const DbRecord = require('./DbRecord');

class Announcement extends DbRecord {

    constructor(props) {

        props = props || {};
        
        super(props);

        this.name = props.name || '';
        this.description = props.description || '';
        this.image = props.image || '';
    }

    toJSON() {
        return Object.assign(super.toJSON(), {
            name: this.name,
            description: this.description,
            image: this.image
        })
    }
}

module.exports = Announcement;