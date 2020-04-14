module.exports = class MergeRequest {
    constructor(body) {
        this.id = body.object_attibutes.id,
            this.state = body.object_attibutes.state,
            this.merge_status = body.object_attibutes.merge_status,
            this.project_name = body.project.name,
            this.user = body.user.name,
            this.target_branch = body.object_attibutes.target_branch,
            this.source_branch = body.object_attibutes.source_branch
    }

}