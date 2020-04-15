module.exports = class MergeRequest {
    constructor(body) {
        this.iid = body.object_attributes.iid,
            this.state = body.object_attributes.state,
            this.merge_status = body.object_attributes.merge_status,
            this.project_name = body.project.name,
            this.user = body.user.name,
            this.target_branch = body.object_attributes.target_branch,
            this.source_branch = body.object_attributes.source_branch
    }

}