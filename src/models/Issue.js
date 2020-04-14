module.exports = class Issue {
    constructor(body) {
        this.id = body.object_attributes.id,
        this.iid = body.object_attributes.iid, //número da issue
        this.state = body.object_attributes.state,
        this.project_id = body.project.id,
        this.project_name = body.project.name
    }
}

// event_type: issue