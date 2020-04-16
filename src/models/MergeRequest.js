module.exports = class MergeRequest {
    constructor(body) {
        this.iid = body.object_attributes.iid,
            this.state = body.object_attributes.state,
            this.source_branch = body.object_attributes.source_branch
    }
}