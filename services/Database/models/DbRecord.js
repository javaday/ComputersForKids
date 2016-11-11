class DbRecord {

    constructor(props) {

        props = props || {};

        this.id = props.id || '';
        this.created = props.created || new Date().getTime();
        this.modified = props.modified || new Date().getTime();
        this.deleted = props.deleted || false;
    }

    toJSON() {
        return {
            id: this.id,
            created: this.created,
            modified: this.modified,
            deleted: this.deleted
        };
    }
}

module.exports = DbRecord;