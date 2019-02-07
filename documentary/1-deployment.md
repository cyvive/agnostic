## Deployment

Quickstart overview of getting this template deployed and ready to be extended / built upon.

### Essentials

Due to this repository being a multi-layer template it hasn't and will not be published on NPM. As such, the expectation is that the user would have the following tools installed globally and configured to effectively use this template:

- [MicroGen](https://github.com/busterc/microgen) simply lightweight base file generator. Included to assist with adding new files as the microservice grows while allowing to exend the core functionality from starting standards.
- [MRM](https://github.com/sapegin/mrm) as a codemods approach for configuration files. This is an enterprise happy configuration management tool, and the expectation is that this is available to provide global npm package management. An example (and suggested) fork repository to start from is: [Cloud Native MRM](https://github.com/sotekton/cloud-native-mrm)
- [Pollinate](https://github.com/howardroark/pollinate) to install the latest copy of this repository into the users preferred directory for building upon. Pollinate ensures that you always get the latest version of the template cloned and customized for your needs.

### ENV's

No Environmental variables are necessary for this process to operate

### Installing

**Do Not Clone this Respository**. Cloning / Forking should only be done for development / pull requests of this actual repository.

Instead, use [Pollinate](https://github.com/howardroark/pollinate) to pull down a customized version to your local working directory.

```sh
pollinate https://github.com/sotekton/cloud-native-internal.git --name yourproject --organization yourcompany
```

**name** must be supplied, all other values are capable of being defaulted (strongly recommended that all relevant values are supplied and defaults not used where possible)

Alternatively a JSON string may be passed in

```sh
pollinate https://github.com/sotekton/cloud-native-internal.git '{"name": "yourproject","organization": "yourcompany"}'
```

a `~/.pollen` defaults file may also be used if relevant to your organization

Full information about what cli parameters are available can be found in [template.json](./template.json)

It should also be noted that while **Pollinate** has the ability to preserve commit history into the cloned repositories this has been disabled as the expectation is post-cloning there would be heavy customizations incurred.

### Post-Install Changes to Workflow

This is a [Nodejs](https://nodejs.org/en/) project, and while its possible to run `npm install` its _strongly suggested_ to use the more integrated and immutable approach.

#### NIX

[Nix](https://nixos.org/nix/) is required to use this repository effectively.

```
curl https://nixos.org/nix/install | sh
```
#### NIX from NPM

[Nix From NPM](https://github.com/adnelson/nixfromnpm) is also required to bridge NIX and NPM.

```
git clone https://github.com/adnelson/nixfromnpm /tmp/nixfromnpm
cd /tmp/nixfromnpm
nix-env --install --attr nixfromnpm --file ./release.nix
```
#### Git Submodules

Git Submodule should be checked out as well with:

```
git submodule update --remote
```

Your system now has the ability to reproduce the **exact** production used in the Docker Container, and all developers are guaranteed to have the same development environment.

#### Governance

**Fathomable** is used by default as a governance language and integration for development, image management and _Continuous Deployment (CD)_ types of activities.

#### Commands

Commands are available in the `./cmd` directory and should all be run from the root project directory i.e. `./cmd/update`. At this time running them in the cmd directory will break

- **build**: creates a production and debug docker container.
- **ci**: is what should be run in your continous integration builder / environment. It will use NIX to execute all the tests, verify code coverage, build and upload the container to your repository. This uses the `fathomable.yaml` file for governance of this process.
- **dev**: creates a isolated development environment with necessary dependencies. Its a shallow version of `npm install --development` so development dependencies are flattened showing exactly what's required for development.
- **prod**: creates the same production environment as is deployed in the container (slight difference in file structure as the `.container-ignore` file isn't passed for this environment)
- **update**: for those coming from npm this is slightly different, as the environments are managed via a nix to npm bridge. To update package.json run this command and it will take care of the heavy lifting and run tests on the project.

### Commits

Enter the development environment and run `npm run commit` this will make use of conventionalcommits and all the necessary pre and post git hooks to maintain code quality

If your organization is using MRM (strongly recommended as per above) this would be the appropriate moment to execute it and finish initializing the repository with your organization specific requirements.

### Examples

At this time, provided the [Installing](#Installing) steps have been completed the repository will be initialized; organization defaults applied; and all relevant npm libraries installed.

All operation past at this point is controlled via [MicroGen](https://github.com/busterc/microgen) with the respective templates available in the [./microgen](./microgen) directory with the following starting structure:

%TREE microgen%

Execution is as follows:

```sh
microgen <template-file> [output-file]
```

%~ -3%
