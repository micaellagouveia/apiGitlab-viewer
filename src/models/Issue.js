module.exports = class Issue {
  constructor(body) {
    this.id = body.object_attributes.id,
      this.iid = body.object_attributes.iid, //número da issue
      this.title = body.object_attributes.title,
      this.state = body.object_attributes.state,
      this.project_id = body.project.id,
      this.project_name = body.project.name,
      this.action = body.object_attributes.action,
      this.created_at = body.object_attributes.created_at,
      this.updated_at = body.object_attributes.updated_at
  }
}
