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

%~ -3%
