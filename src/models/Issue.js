module.exports = class Issue {
  constructor(body) {
      this.iid = body.object_attributes.iid, //número da issue
      this.state = body.object_attributes.state
  }
}
