# Ngrave.

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

## Git protocol

For this project we use Git.
Foreach feature/bug we create a branch.

```
# feature
git checkout -b feature/name-of-feature

# bug
git checkout -b fix/name-of-fix
```

After change files a commit is need. Commit messages should look like this.

```
# setup
git commit -m "(component-name/topic): what is done"

# example
git commit -m "(accordion): open accordion on click"
```

To add the code to the master branch a PR(PullRequest) is needed. This can be done in Github.

After creating a PR send the link to another developer. The other developer should review the code.

```
# Before commit

yarn lint --fix
```

## Deployment

```
# live
vercel --prod

# staging
vercel

# Always deploy live first if you want staging the latest version because Vercel overwrites staging.
# This will be replaced with Git later
```
