# Agnostic:

This is the core repository of a collection of Git repositories to enable _Agnostic Software Development_. A coding style and pattern that works on any Ubiquitous platform (Kubernetes Included). This particular project is in [NodeJs](https://nodejs.org/) but the processes and techniques are applicable to any language.

This project strives hard not to be classified as a framework, as such it tries to provide a collection of best practice approaches (somewhat opinionated) for operating software at scale and speed.

The approaches suggested / undertaken are production grade and underpin some of the more forward thinking Enterprises.

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/-3.svg?sanitize=true"></a></p>

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [Deployment](#deployment)
  - [Essentials](#essentials)
  - [ENV's](#envs)
  - [Installing](#installing)
  - [Post-Install Changes to Workflow](#post-install-changes-to-workflow)
    - [NIX](#nix)
    - [Git Submodules](#git-submodules)
    - [Governance](#governance)
    - [NPM Scripts](#npm-scripts)
  - [Commits](#commits)
- [Features](#features)
  - [Incremental Functionality](#incremental-functionality)
    - [MRM (TODO)](#mrm-todo)
    - [Plop (TODO)](#plop-todo)
  - [Imperative Core / Functional Shell](#imperative-core--functional-shell)
    - [InterFace](#interface)
    - [Shell](#shell)
    - [Core](#core)
  - [Objection.js](#objectionjs)
  - [Fastify](#fastify)
  - [Redis Cache](#redis-cache)
  - [Serialization Aware](#serialization-aware)
  - [Distributed Authentication](#distributed-authentication)
  - [Distributed Policy Management](#distributed-policy-management)
  - [Just Enough Testing](#just-enough-testing)
  - [Automatic JSON Schema generation](#automatic-json-schema-generation)
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

finds the nodejs v10 package: ``` Event-driven I/O framework for the V8 JavaScript engine

````

Then add the required package to:

```nix
envPkgs = with pkgs;
	[
		nodejs

   pkgs.git
   pkgs.jq

   # NixOS specific package; installs as client only. i.e.  - still requires a system Docker daemon running
   pkgs.docker
	];
````

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

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/-3.svg?sanitize=true"></a></p>

## Features

### Incremental Functionality

This project strives hard not to be classified as a framework, as such it tries to provide a collection of best practice approaches (somewhat opinionated) for operating software at scale and speed.

Two core tools allow for incremental additions of functionality on an as-needed basis. Similar to a microkernel.

#### MRM (TODO)

[MRM](https://github.com/sapegin/mrm)'s codemods functionality supplies the ability to load chunks of functionality when necessary by re-writing necessary configuration.

- merge required libraries into package.json
- inject additional generators into plopfile.js

As such to enable database functionality:

```sh
mrm db --dir mrm
# alternatively "database" may be specified
```

All currently available MRM tasks are as follows: ```m mrm ├── docco ├── docco-github ├── editorconfig ├── finepack ├── git ├── globals ├── ignore ├── labels ├── logs ├── meta-docco ├── package ├── prettier ├── renovate ├── templates ├── test └── xo

````

#### Plop (TODO)

Every developer (or team) creates structures and patterns in their code that change and improve over time. In traditional codebases its not easy to locate what files had the current "best practice". Via **Plop** your "best practice" method of creating any given pattern is available in CODE. Turning "the right way" into "the easiest way" to make new files

The `plop` directory is managed as a Git SubModule to allow easier tracking of additional features and functionality added over time. With its current structure representing:

```m
plop
├── core
│   ├── endpoint
│   └── route
├── generators
└── shell
    └── route
````

Execution is interactive, and fairly self-explanatory via: `plop`

**Customization**: its not suggested to customize the `plop` directory directly due to it being a submodule, as such an `extend-plop` directory is available. Use the same extension approach as by changing the directory: %EXAMPLE: plopfile.js, ../src => documentary%

### Imperative Core / Functional Shell

This project follows the best practices of **logic programming** and **function / object composition**. As such the navigation and layout may be slightly different to most standard webservers / Object Oriented applications available today.

More information about **Imperative Core / Functional Shell** by Gary Bernhardt can be seen in his talk on [Boundaries](https://www.youtube.com/watch?v=yTkzNHF6rMs) or by contacting Sotekton for specific training on this concept and its application to accelerating and standardizing software development.

#### InterFace

`./iface/` is available for any external systems from the microservice's perspective. Connections to Databases / ORM's would fall in this category

#### Shell

`./shell/` contains code that coordinates work (coordinators). In this ecosystem it can also be viewed as the trigger for Event Driven Development. As such

- routes
- ORM db mappings

would both be suitable

#### Core

`./core/` contains code that does work (algorithms). In this ecosystem its important to understand that both functional & object composition are tied together through the syntactical sugar of **Data Pipelines** providing an optimal approach to capturing and maintaining business logic for the respective shell matched route.

### Objection.js

> [Objection.js](https://vincit.github.io/objection.js/#introduction) is an ORM for Node.js that aims to stay out of your way and make it as easy as possible to use the full power of SQL and the underlying database engine while keeping magic to a minimum.

There is an [ongoing discussion](https://medium.com/@mantasd/orm-is-an-offensive-anti-pattern-really-42269673d54d) about ORM concepts in the industry and if they are a SQL anti-pattern.

There are also many views that MicroServices should never persist data. But all MicroServices when traced back to the source ultimately need to access some persistent data.

In following good MicroServices design, the database or part of database would be associated with each service. As a result there is no additional complexity or loss of benefit introduced from using an ORM over the need for a traditional DBA mandated and driven Schema.

> The majority of all queries out of ORM tools work perfectly fine. They are parameterized. They can use the indexes on the tables. They’ll see plan reuse and everything will be fine with them. We’re talking at least 90% of the queries in your system that no one has to sit and write. This is a gigantic win for development time, but it’s also a giant win for DBA types. You have a highly consistent, well-performing set of queries that are going to work flawlessly. What’s not to like? ~ [Grant Fritchey](https://www.scarydba.com/2017/07/05/love-entity-framework/)

Objection.js is introducted as an interface for SQL; its multi-database; support for JSON Schema; and can store complex documents as rows.

Its also worth considering that for most applications NoSQL dedicated databases aren't strictly necessary and SQL with better management tends to be suitable for 95%+ of applications. An excellent understanding of when NoSQL would be a better choice is [available for reading](https://www.linuxjournal.com/article/10770)

> Non-SQL gives you a very sharp knife to solve a selected set of issues. If you find SQL too hard to use, you should not try Non-SQL ~ [Monty Widenius](https://www.linuxjournal.com/article/10770)

You are also welcome to add the relevant NoSQL interface, or remove this one entirely from your cloned local repository template.

**Note**: PostgreSQL is included by default, other adapters will need to be managed externally **Note**: [Knex Migrate](https://github.com/sheerun/knex-migrate) is strongly recommended for managing database migrations and schema long-term.

### Fastify

These are the main features and principles on which fastify has been built: (taken from [Fastify.io](https://www.fastify.io/) home page)

- **Highly performant:** as far as we know, Fastify is one of the fastest web frameworks in town, depending on the code complexity we can serve up to 30 thousand requests per second.
- **Extendible:** Fastify is fully extensible via its hooks, plugins and decorators.
- **Schema based:** even if it is not mandatory we recommend to use JSON Schema to validate your routes and serialize your outputs, internally Fastify compiles the schema in an highly performant function.
- **Logging:** logs are extremely important but are costly; we chose the best logger to almost remove this cost, Pino!
- **Developer friendly:** the framework is built to be very expressive and to help developers in their daily use, without sacrificing performance and security.

One of the key features of **Fastify** is how well it integrates with the **Functional Core / Imperative Shell** approach through its extensibility approach. It stays out of the way of core development tasks keeping code clean; focused; and minimal

### Redis Cache

Through the [Abstract Cache Protocol](https://github.com/jsumners/abstract-cache) Redis caching is available.

This is following the best practices for decentralized session / authentication / SSO verification and validation. Any Cloud Native worker reaches to cache for matching authentication session, if not present access is denied.

### Serialization Aware

Via [Accepts Serializer](https://github.com/fastify/fastify-accepts-serializer) logic is avaiable to intercept and route as required.

### Distributed Authentication

While its possible to implement complex authentication methods, we suggest using [Istio](https://istio.io) for mTLS between microservices to 'guarantee' incomming traffic has been authenticated via the service mesh.

[Fastify Auth](https://github.com/fastify/fastify-auth) is used to handle authentication via multiple methods should they be used.

As this is an internal template its technically possible that no authentication strategy could be used as mTLS ensures that only validated and approved services are communicating with eachother. In addition with Istio in conjunction with BPF its not possible with today's technology to spoof a false process so we have the guarantee that the originating sauce is validated and correct.

Should you decide to not use an authentication strategy, its still necessary so ensure that Policy Enforecment is operating correctly. This is achieved by modifying the `Bearer` to be the Group and User information only: `@group~user`

In all cases its expected that secret management would be available externally either via Redis (as used for caching) or SQL compatible database. With a separate authentication microservice managing tokens / permissions.

Authentication Strategies Provided in recommended order:

1. No Authentication group & user provided in `Bearer` (Note: **only suitable for Kubernetes**)
2. OTP / MFA via [Authenticator](https://www.npmjs.com/package/authenticator). OTP information is stored in the `Bearer` header
3. `Bearer` token
4. Username / Password

(TODO) OTP secrets should be loaded on application initialized from Redis

### Distributed Policy Management

We assume that [Distributed Authentication](#distributed-authentication) has been followed, as such each service can be mapped to a group and user for policy enforcement.

[Casbin](https://casbin.org/en/) provides policy enforcement with the storage of policies handled by Redis (TODO) hooked round pub-sub for update tracking.

### Just Enough Testing

**Functional Core / Imperative Shell** allows for 99%+ unit testing out of the box. However when working with Event Driven MicroServices there is no guarantee when they will be executed next. Or that there external interactions and schemas will be contractually consistent on their next execution. As such there are 3 types of tests available to be executed in different scenarios.

- **Spec**: Standard unit test applied to all **core** logic.
- **API**: Are lightweight external validation appoaches to validate the data revieved by external services is still structurally sound for this microservice
- **Sanity**: Production initialization tests to ensure the microservice has everything it needs to operate correctly.

All of these are designed to fail fast

### Automatic JSON Schema generation

[To JSON Schema](https://github.com/ruzicka/to-json-schema) allows the developer to provide just the JSON data payload and it will generate the appropriate JSON Schema from it.

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/-3.svg?sanitize=true"></a></p>

## Development

These instructions will get you a copy of the project up and running on your local machine for _development and testing_ purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

- Node 8.x.x or higher (LTS when development commenced)
- [OneFlow CLI tool](https://www.npmjs.com/package/%40tayloredtechnology%2Foneflow) available in the repo, suggest using a global install with `npm i -g @tayloredtechnology/oneflow` for convenince
- [RedRun](https://www.npmjs.com/package/redrun) - optional but suggested

### Installing

A step by step series of examples that tell you how to get a development env running

```
git clone git@github.com:sotekton/agnostic.git
cd agnostic
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

const {exec} = require('child_process')

exec('nix search -u nodejs-10_x | head -n 2 | tail -n 1', (err, stdout) => { if (err) { return }

    console.log(stdout)

})

## Built With

- [CodeCov](http://codecov.io/)
- [Conventional Commits](https://conventionalcommits.org)
- [Node @8.x.x](https://nodejs.org/docs/latest-v8.x/api/)
- [MRM](https://github.com/sapegin/mrm)
- [Pollinate](https://github.com/howardroark/pollinate)
- [RenovateApp](http://renovateapp.com/)
- [SNYK](http://snyk.io/)
- [TestDouble](https://www.npmjs.com/package/testdouble)
- [Waffle Bot](https://help.waffle.io/wafflebot-basics/getting-started-with-the-wafflebot/how-to-use-wafflebot)

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for the process for submitting pull requests to us. All contributors agree to follow and abide by this project's [Code of Merit (Conduct)](CONDUCT.md).

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/TayloredTechnology/${project}/tags).

## Authors

- **Keidrych Anton-Oates** - _Initial work_ - [Sotekton](https://sotekton.com)

See also the list of [contributors](https://github.com/sotekton/agnostic/contributors) who participated in this project.

## License

This project is licensed under the Mozilla Public License Version 2.0 - see the [LICENSE](LICENSE) file for details

## Copyright

Section breaks from [FoglihtenDeH0](https://www.1001fonts.com/foglihtendeh0-font.html) font.

## Acknowledgments

- NPM Community for consistenly making packages that accelerate development work
- [Test Anything Protocol](https://testanything.org/) for consistenly accelerating Feature Driven Design
