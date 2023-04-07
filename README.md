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
    - [MRM](#mrm)
    - [Plop](#plop)
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
  - [Compatible Versioning](#compatible-versioning)
  - [Backwards Compatible API Versioning](#backwards-compatible-api-versioning)
  - [MicroService Schema](#microservice-schema)
- [Development](#development)
  - [Prerequisites](#prerequisites)
  - [Installing](#installing)
- [Running the tests](#running-the-tests)
  - [And coding style tests](#and-coding-style-tests)
- [Code Examples](#code-examples)
  - [Core Route Structure](#core-route-structure)
  - [Data Pipeline Execution](#data-pipeline-execution)
  - [Versioning Support](#versioning-support)
  - [Major Versions](#major-versions)
  - [Immutability](#immutability)
  - [Data Pipeline Cache](#data-pipeline-cache)
  - [Server Sessions](#server-sessions)
  - [Detailed Database Function Example](#detailed-database-function-example)
  - [External API's](#external-apis)
  - [MicroService Schema](#microservice-schema)
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
- [MRM](https://github.com/sapegin/mrm) as a codemods approach for configuration files. This is an enterprise happy configuration management tool, and the expectation is that this is available to provide global npm package management. An example (and suggested) fork repository to start from is: [Cloud Native MRM](https://github.com/cyvive/agnostic-mrm)
- [Pollinate](https://github.com/howardroark/pollinate) to install the latest copy of this repository into the users preferred directory for building upon. Pollinate ensures that you always get the latest version of the template cloned and customized for your needs.

### ENV's

No Environmental variables are necessary for this process to operate

### Installing

**Do Not Clone this Respository**. Cloning / Forking should only be done for development / pull requests of this actual repository.

Instead, use [Pollinate](https://github.com/howardroark/pollinate) to pull down a customized version to your local working directory.

```sh
pollinate https://github.com/cyvive/agnostic.git \
	--author (your name) \
	--container-repository (hub.docker.io) \
	--description (optional context) \
	--name (your project) \
	--organization (your company or team)
```

**name** must be supplied, all other values are capable of being defaulted (strongly recommended that all relevant values are supplied and defaults not used where possible)

Alternatively a JSON string may be passed in

```sh
pollinate https://github.com/cyvive/agnostic.git '{"name": "yourproject","organization": "yourcompany"}'
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

NIX is tightly integrated into this project, running `npm run shell` or `npm run shell:prod` (provided NIX is installed) will provide you with a clean development / production like environment.

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

#### MRM

[MRM](https://github.com/sapegin/mrm)'s codemods functionality supplies the ability to load chunks of functionality when necessary by re-writing necessary configuration.

- merge required libraries into package.json
- inject additional generators into plopfile.js

As such to enable database functionality:

```sh
mrm db --dir mrm
# alternatively "database" may be specified
```

All currently available MRM tasks are as follows:

```m
mrm
├── docco
├── docco-github
├── editorconfig
├── finepack
├── git
├── globals
├── ignore
├── labels
├── logs
├── meta-docco
├── package
├── prettier
├── renovate
├── templates
├── test
└── xo
```

#### Plop

Every developer (or team) creates structures and patterns in their code that change and improve over time. In traditional codebases its not easy to locate what files had the current "best practice". Via **Plop** your "best practice" method of creating any given pattern is available in CODE. Turning "the right way" into "the easiest way" to make new files

The `plop` directory is managed as a Git SubModule to allow easier tracking of additional features and functionality added over time. With its current structure representing:

```m
plop
├── core
│   ├── iface
│   │   └── rest
│   └── route
├── generators
│   ├── new
│   │   └── db
│   └── version
├── iface
│   ├── db
│   │   └── model
│   └── rest
├── plopfiles
└── shell
```

Execution is interactive, and fairly self-explanatory via: `plop`

**Customization**: its not suggested to customize the `plop` directory directly due to it being a submodule, as such an `extend-plop` directory is available. Use the same extension approach as by changing the directory: %EXAMPLE: plopfile.js, ../src => documentary%

### Imperative Core / Functional Shell

This project follows the best practices of **logic programming** and **function / object composition**. As such the navigation and layout may be slightly different to most standard webservers / Object Oriented applications available today.

More information about **Imperative Core / Functional Shell** by Gary Bernhardt can be seen in his talk on [Boundaries](https://www.youtube.com/watch?v=yTkzNHF6rMs) or by contacting Cyvive for specific training on this concept and its application to accelerating and standardizing software development.

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

### Compatible Versioning

Semantic Versioning is awesome, however most developers still struggle to understand the PATCH part of the versioning standard. For API's consumed by others, [Compatible Versioning](https://github.com/staltz/comver)(ComVer) is a better choice as its backwards compatible with Semantic Versioning and enforces that API versions only change when directed by the underlying data changes

### Backwards Compatible API Versioning

While its technically possible for each Verb in REST to have its own version, it adds unecessary complexity to the API. As such each route shares a ComVer across all Verbs. Internally **Data Pipelines** are utilized for all data mutations, making it possible to serve the following simultaneously:

- **2.x.0**
- **1.x.0**

Where x is any minor version.

### MicroService Schema

The ability to have a versioned internal schema for a MicroService is not commonly talked about. However its benefits should not be underestimated. At the simplest level, it provides a common structure for a single endpoint / route. Where as when used with extenal databases, public API's or MicroServices it ensures proper ETL compatiblity irrespective of the changes to the external service while maintining backwards compatible versioning.

A MicroService Schema also clarifies the Data Modelling boundaries within a _Suite of MicroServices_, and when _Functions_ are more suitable

Finally by creating the schema all necessary business fields are easily populated with their respective logic irrespective of the data path.

For more examples and usage information see [Skematic](https://github.com/mekanika/skematic)

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
git clone git@github.com:cyvive/agnostic.git
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

## Code Examples

Here are some suggested patterns to assist in getting up to speed with **Functional Core / Imperative Shell (FC/IS)** approaches when combined with **Data Pipelines**.

### Core Route Structure

Newly created enpoints in the `core` follow the structure of:

```sh
core/routes/{{ name }}/{{ verb }}/
index.js
v{{ semverMajor }}.js
v{{ semverMajor }}.spec.js
```

### Data Pipeline Execution

Each function in the **Data Pipeline** is executed sequentially be default. It is possible, and in many situations ideal to execute some steps in parallel. i.e. storing the current dataset in a database while progressing with data manipulation for the return object.

```js
pipelines[1.0.0] = [ manipulateCartData, R.tapAsync(dbCart.upsert), additionalStructureReturn ]
```

### Versioning Support

This core structure enables SemVer Major multi-version support for each REST Verb. Allowing breaking changes to be introduced to the MicroService without impacting existing services.

Additionaly, Minor versions can be defined within each Major file to

- keep track of data revisions
- ensure each Minor version extends the pipeline functionality

A typical example of how this would look is:

```js
pipelines['1.0.0'] = [checkUserHasCart]
pipelines['1.1.0'] = R.flatten(
  R.append([persistCartWithUser], pipelines['1.0.0'])
)
```

The `pipelines` object is exported from `v1.js` for consumption by the `core` & `shell` endpoints

Ramdax.flatten ensures that the returned array is a clean copy of the original

### Major Versions

The defacto approach (from developers using this tooling) is to pass the data through the **entire** chain of previous versions and then apply the **breaking** changes onto the prior manipulated data structure. Names of the overring functions in the higher version files would be identical to their lower versions.

For example:

```js
// v1.js
function helloWorld({_out, ..._passthrough}) {
  const out = rfdc(_out)
  out.hello = 'world'
  return {_out: out, ...passthrough}
}

// v2.js
function helloWorld({_out, ..._passthrough}) {
  const out = rfdc(_out)
  delete out.hello
  out.newHello = 'world'
  return {_out: out, ...passthrough}
}
```

There are dual benefits to this approach:

- Major Version backwards support is available at all times
- Depreciation of a Major version is trival as its a merge between the depreciated version and the persisting version.

### Immutability

**Really Fast Deep Clone (rfdc)** is available and suggested to be used for every occurance of data manipulation. By design, each endpoint pipeline operates independent of eachother when called by **Fastify**, by creating immutable copies of the data to be manipulated within each function scope. The benefits of Immutability are applied throughout the endpoints lifecycle.

### Data Pipeline Cache

The `_init` function, applied (and customizable) to every endpoint defaults a `_cache = {}` object. This **private** cache exits for the life of the data pipeline, and is shared between Major Versions.

### Server Sessions

If used, sessions are snapshotted in as part of the `_init` of the endpoint verb. The snapshot is persisted in the `_cache` during pipeline(s) execution and the original object is replaced during `_end` allowing any event based session logic to fire in line with the repsonse.

### Detailed Database Function Example

```js
const debugPath = 'core:route/cart/post'

// Example of Adding another Shell Call
const dbCart = require('^shell/db/cart')

async function checkUserHasCart({_out, _cache, ..._passthrough}) {
  const debug = require('debug')(`${debugPath}@checkUserHasCart`)
  // S === shorthand for session always
  const S = rfdc(_cache.session)

  // Check if cart is available in session for the user
  if (!R.get('cart.cart', S)) {
    // Check if cart is saved for the user
    // Note: dbCart module is in the Shell, this is not a violation of FC/IS
    _cache.dbRecord = await dbCart.getCustomerByUserID(S.user_id)

    if (_cache.dbRecord.foxycartCart) {
      S.foxycart = {
        cart: _cache.dbRecord.foxycartCart.id,
        customer: _cache.dbRecord.id,
        ...S.foxycart
      }
    }
  }

  _cache.session = S
  return {
    _cache,
    _out,
    ..._passthrough
  }
}
```

### External API's

There are many places in code that one can interact with external API's, and due to the simplicity of [got](https://github.com/sindresorhus/got) and [nock](https://github.com/nock/nock) its _technically_ possible to interact from with the external API from anywhere.

In the light of **Functional Core / Imperative Shell** design, the most sensible approach is to create an **interface (iface)** for each external API.

Its also a realistic expectation that a single MicroService may contact several external API's mid-core and have to wait for all to return data before proceeding.

In this situation, several options present themselves.

1. End the current pipeline and create independent `shell` and `core` pipelines for all dependent interactions. (Significantly complicating Business Logic)
2. Add a function to `core` that handles collecting and aggregating data from the external API's (breaking FC/IS paradigm)
3. Utilize NodeJS ability to interact with event emitters. `R.tapAsync()` the respective shell calls and wait for external API interfaces to emit all events before proceeding.

Point 3, is without a doubt the cleanest approach, while still allowing parallel API interactions and dependency on external API return data. When used with [pTimeout](https://github.com/sindresorhus/p-timeout) it also ensures data related failure logic can be cleanly captured and executed if necessary.

Finally pushing the external API's to an interface ensures that _stream processing_ is not only possible, but plays nicely with FC/IS

External API's from the template use the newer UPSERT ability, as such for those of you familiar with CRUD, since the introduction of UPSERT, on READ and UPSERT are strictly necessary, as deleting is UPSERT({deleted:true}). DELETE is also available as a convenience wrapper

The interface should be handling the underlying REST verbs

### MicroService Schema

Best explation on usage is direct from the libaries author [Skematic](https://github.com/mekanika/skematic)

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

- **Keidrych** - _Initial work_ - [Cyvive](https://cyvive.fyi)

See also the list of [contributors](https://github.com/cyvive/agnostic/contributors) who participated in this project.

## License

This project is licensed under the Mozilla Public License Version 2.0 - see the [LICENSE](LICENSE) file for details

## Copyright

Section breaks from [FoglihtenDeH0](https://www.1001fonts.com/foglihtendeh0-font.html) font.

## Acknowledgments

- NPM Community for consistenly making packages that accelerate development work
- [Test Anything Protocol](https://testanything.org/) for consistenly accelerating Feature Driven Design
