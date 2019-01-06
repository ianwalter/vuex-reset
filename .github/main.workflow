workflow "CI" {
  on = "push"
  resolves = ["Lint", "Test"]
}

action "Install" {
  uses = "ianwalter/docker-node@master"
  runs = "yarn"
}

action "Lint" {
  uses = "ianwalter/docker-node@master"
  needs = ["Install"]
  runs = "yarn"
  args = "lint"
}

action "Test" {
  uses = "ianwalter/docker-node@master"
  needs = ["Install"]
  runs = "yarn"
  args = "test"
}
