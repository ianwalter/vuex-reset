workflow "CI" {
  on = "push"
  resolves = ["Lint", "Test"]
}

action "Install" {
  uses = "docker://node"
  runs = "yarn"
}

action "Lint" {
  uses = "docker://node"
  needs = ["Install"]
  runs = "yarn"
  args = "lint"
}

action "Test" {
  uses = "docker://node"
  needs = ["Install"]
  runs = "yarn"
  args = "test"
}
