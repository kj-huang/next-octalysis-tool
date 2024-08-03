# Branch naming convention

Go to the `main` or base branch where you want to create your new branch. Make sure that either the main or the base branch is **up to date**. Then, create the branch using the **Feature name** you're working on and **add a descriptive title**.

## Example

Create your new branch by using
```
git checkout -b <feature-name>
```

# Commit naming convention

- Commits **MUST** be prefixed with a **type**, which consists of a noun, `feat`, `fix`, etc., followed by the **OPTIONAL scope**, and **REQUIRED terminal colon and space**

- A scope **MAY** be provided after a type. A scope **MUST** consist of a noun surrounded by parenthesis, e.g., `fix(parser): `

- A description **MUST** immediately follow the colon and space after the type/scope prefix. The description is a short summary of the code changes, e.g., `fix(parser): fix array parsing issue when multiple spaces were contained in string`
    - Use the imperative, present tense: `change` not `changed` nor `changes`
    - Don't capitalize the first letter
    - No dot (.) at the end

- Here's a non-exhaustive list of types:
    - `feat`: add or remove a new feature
    - `fix`: fix a bug
    - `refactor`: rewrite/restructure code without changing its behaviour
    - `perf`: improve performance
    - `style`: white-space, formatting, missing semi-colons, etc.
    - `test`: add missing tests or correcting/deleting existing tests
    - `docs`: affect only documentation
    - `build`: affect build components like build tool, ci pipeline, dependencies, project version, etc.
    - `ops`: affect operational components like infrastructure, deployment, backup, recovery, etc.
    - `chore` miscellaneous commits e.g. modifying `.gitignore`


**Full example:**

```
git commit -m "feat(geomon): add a new geomon"
```

```
git commit -m "fix: fix geomon name"
```

## Resources
- https://www.conventionalcommits.org/en/v1.0.0/
- https://gist.github.com/qoomon/5dfcdf8eec66a051ecd85625518cfd13

# Pull Request

- Naming convention should follow the commit naming convention
- Fill the PR template as much as possible
- Add reviewers and assign the PR
- Add appropriate label