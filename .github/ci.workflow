workflow "CI" {
  on = "push"
  resolves = ["Test"]
}

action "Test" {
  uses = "docker://node"
  runs = "yarn && yarn lint && yarn test"
}
