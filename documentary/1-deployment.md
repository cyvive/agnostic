## Deployment

Quickstart overview of getting this template deployed and ready to be extended / built upon.

### Essentials

Due to this repository being a multi-layer template it hasn't and will not be published on NPM. As such, the expectation is that the user would have the following tools installed globally and configured to effectively use this template:

- [MicroGen](https://github.com/busterc/microgen) simply lightweight base file generator. Included to assist with adding new files as the microservice grows while allowing to exend the core functionality from starting standards.
- [MRM](https://github.com/sapegin/mrm) as a codemods approach for configuration files. This is an enterprise happy configuration management tool, and the expectation is that this is available to provide global npm package management. An example (and suggested) fork repository to start from is: [Cloud Native MRM](https://github.com/sotekton/agnostic-mrm)
- [Pollinate](https://github.com/howardroark/pollinate) to install the latest copy of this repository into the users preferred directory for building upon. Pollinate ensures that you always get the latest version of the template cloned and customized for your needs.

### ENV's

No Environmental variables are necessary for this process to operate

### Installing

**Do Not Clone this Respository**. Cloning / Forking should only be done for development / pull requests of this actual repository.

Instead, use [Pollinate](https://github.com/howardroark/pollinate) to pull down a customized version to your local working directory.

```sh
pollinate https://github.com/sotekton/agnostic.git \
	--author (your name) \
	--container-repository (hub.docker.io) \
	--description (optional context) \
	--name (your project) \
	--organization (your company or team)
```

**name** must be supplied, all other values are capable of being defaulted (strongly recommended that all relevant values are supplied and defaults not used where possible)

Alternatively a JSON string may be passed in

```sh
pollinate https://github.com/sotekton/agnostic.git '{"name": "yourproject","organization": "yourcompany"}'
```

a `~/.pollen` defaults file may also be used if relevant to your organization

Full information about what cli parameters are available can be found in [template.json](./template.json)

It should also be noted that while **Pollinate** has the ability to preserve commit history into the cloned repositories this project disables it as the expectation is post-cloning there would be heavy customizations with no relevance to the original snapshot on an independent lifecycle.

If your organization is using MRM (strongly recommended as per above) after pollinating would be the appropriate moment to execute it and finish initializing the repository with your organization specific requirements.

### Post-Install Changes to Workflow

This is a [Nodejs](https://nodejs.org/en/) project, and while its possible to run `npm install` its _strongly suggested_ to use the more integrated and immutable approach.

#### NIX

[Nix](https://nixos.org/nix/) is required to use this repository effectively.

```sh
curl https://nixos.org/nix/install | sh
```

NIX is tightly integrated into this project, running `npm shell` or `npm shell:prod` (provided NIX is installed) will provide you with a clean development / production like environment.

Should you need additional packages, there is no need to install them in the parent operating system, as nix is the best re-invention of package management available today:

```sh
nix search nodejs-10_x
```

finds the nodejs v10 package: %FORK documentary/nix-search%

Then add the required package to:

%EXAMPLE: default.nix, ../src => documentary%

If additional customizations are necessary to the default NIX packaged program, i.e. pointing to a config file. Its suggested to use [symlinkjoin](https://discourse.nixos.org/t/how-to-merge-several-derivation-outputs-for-plugin-system/537/4)

#### Git Submodules

Git Submodule should be kept in sync / updated with:

```sh
git submodule update --remote
```

Your system now has the ability to reproduce the **exact** production used in the Docker Container, and all developers are guaranteed to have the same development environment.

#### Governance

**Fathomable** is used by default as a governance language and integration for development, image management and _Continuous Deployment (CD)_ types of activities.

#### NPM Scripts

- `shell`: clean development environment (NPM still used to manage packages)
- `shell:prod`: clean production like environment (NPM still used to manage packages)
- `doc`: generates documentation as per [documentary](https://github.com/artdecocode/documentary)
- `update`: updates package.json dependencies (all) to the latest available versions found on NPM
- `repl`: starts an interactive promise capable REPL. Very useful when working with database objects
- `commit`: ensures all linting and hooks run appropriately before commits are accepted.

### Commits

Enter the development environment and run `npm run commit` this will make use of conventionalcommits and all the necessary pre and post git hooks to maintain code quality

%~ -3%
