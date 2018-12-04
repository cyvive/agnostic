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

Finally run the usual within the new project directory:

```sh
npm install
```

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
