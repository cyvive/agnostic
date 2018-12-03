# Cloud Native: Internal

This is one of several repositories used for architecting **Cloud Native** Applications. The approach undertaken works on Kubernetes, and any of the currently available cloud providers.

This is the **Internal** template, and as such is expected to not recieve traffic external to the cloud cluster.

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/-3.svg?sanitize=true"></a></p>

## Key Features

This section has a quick look at the features available in **Cloud Native: Internal** and how they help a cloud native development process.

| Feature                | Description             | Advantages            |
| ---------------------- | ----------------------- | --------------------- |
| Test Anything Protocol | 100% Unit Test Coverage | Performance and speed |

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/-3.svg?sanitize=true"></a></p>

## Table Of Contents

- [Key Features](#key-features)
- [Table Of Contents](#table-of-contents)
- [Deployment](#deployment)
  - [Essentials](#essentials)
  - [ENV's](#envs)
  - [Installing](#installing)
  - [Examples](#examples)
- [Features](#features)
  - [Test Anything Protocol](#test-anything-protocol)
- [Development](#development)
  - [Prerequisites](#prerequisites)
  - [Installing](#installing)
- [Running the tests](#running-the-tests)
  - [And coding style tests](#and-coding-style-tests)
- [Built With](#built-with)
- [Contributing](#contributing)
- [Versioning](#versioning)
- [Authors](#authors)
- [License](#license)
- [Copyright](#copyright)
- [Acknowledgments](#acknowledgments)

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/-3.svg?sanitize=true"></a></p>

## Deployment

Quickstart overview of getting this template deployed and ready to be extended / built upon.

### Essentials

Due to this repository being a multi-layer template it hasn't and will not be published on NPM. As such, the expectation is that the user would have the following tools installed globally and configured to effectively use this template:

- [Pollinate](https://github.com/howardroark/pollinate) to install the latest copy of this repository into the users preferred directory for building upon. Pollinate ensures that you always get the latest version of the template cloned and customized for your needs.
- [MRM](https://github.com/sapegin/mrm) as a codemods approach for configuration files. This is an enterprise happy configuration management tool, and the expectation is that this is available to provide global npm package management. An example (and suggested) fork repository to start from is: [Cloud Native MRM](https://github.com/sotekton/cloud-native-mrm)
- [MicroGen](https://github.com/busterc/microgen) simply lightweight base file generator. Included to assist with adding new files as the microservice grows while allowing to exend the core functionality from starting standards.

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

Finally run the usual within the new project directory:

```sh
npm install
```

If your organization is using MRM (strongly recommended as per above) this would be the appropriate moment to execute it and finish initializing the repository with your organization specific requirements.

### Examples

At this time, provided the [Installing](#Installing) steps have been completed the repository will be initialized; organization defaults applied; and all relevant npm libraries installed.

All operation past at this point is controlled via [MicroGen](https://github.com/busterc/microgen) with the respective templates available in the [./microgen](./microgen) directory with the following starting structure:

```m
documentary
├── 1-deployment.md
├── 2-features.md
├── 3-development.md
├── footer.md
└── index.md
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/-3.svg?sanitize=true"></a></p>

## Features

### Test Anything Protocol

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/-3.svg?sanitize=true"></a></p>

## Development

These instructions will get you a copy of the project up and running on your local machine for _development and testing_ purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

- Node 6.12.x or higher (LTS when development commenced)
- [OneFlow CLI tool](https://www.npmjs.com/package/%40tayloredtechnology%2Foneflow) available in the repo, suggest using a global install with `npm i -g @tayloredtechnology/oneflow` for convenince
- [RedRun](https://www.npmjs.com/package/redrun) - optional but suggested

### Installing

A step by step series of examples that tell you how to get a development env running

```
git clone git@github.com:TayloredTechnology/${project}.git
cd ${project}
npm install
```

## Running the tests

[TAP](https://testanything.org/) is used for all tests

```
# Execute all application tests
npm test
```

Code Coverage is provided by [CodeCov](https://codecov.io).

### And coding style tests

[XO](https://github.com/sindresorhus/xo) is used with [Prettier](https://github.com/prettier/prettier) for linting & code style.

```
npm run lint
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/-3.svg?sanitize=true"></a></p>

## Built With

- [CodeCov](http://codecov.io/)
- [Conventional Commits](https://conventionalcommits.org)
- [I'm Done](https://imdone.io/)
- [Node @6.12.x](https://nodejs.org/docs/latest-v6.x/api/)
- [RenovateApp](http://renovateapp.com/)
- [SNYK](http://snyk.io/)
- [TestDouble](https://www.npmjs.com/package/testdouble)
- [Waffle Bot](https://help.waffle.io/wafflebot-basics/getting-started-with-the-wafflebot/how-to-use-wafflebot)

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for the process for submitting pull requests to us. All contributors agree to follow and abide by this project's [Code of Merit (Conduct)](CONDUCT.md).

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/TayloredTechnology/${project}/tags).

## Authors

- **Keidrych Anton-Oates** - _Initial work_ - [Taylored Technology](https://tayloredtechnology.net)

See also the list of [contributors](https://github.com/TayloredTechnology/${project}/contributors) who participated in this project.

## License

This project is licensed under the Mozilla Public License Version 2.0 - see the [LICENSE](LICENSE) file for details

## Copyright

Section breaks from [FoglihtenDeH0](https://www.1001fonts.com/foglihtendeh0-font.html) font.

## Acknowledgments

- NPM Community for consistenly making packages that accelerate development work
- [Test Anything Protocol](https://testanything.org/) for consistenly accelerating Feature Driven Design
