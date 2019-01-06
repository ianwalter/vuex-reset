workflow "CI" {
  on = "push"
  resolves = ["Lint", "Test"]
}

action "Install" {
  uses = "ianwalter/docker-node"
  runs = "yarn"
}

action "Lint" {
  uses = "ianwalter/docker-node"
  needs = ["Install"]
  runs = "yarn"
  args = "lint"
}

action "Test" {
  uses = "ianwalter/docker-node"
  needs = ["Install"]
  runs = "yarn"
  args = "test"
}
