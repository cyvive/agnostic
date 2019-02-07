{ buildNodePackage, namespaces, nodePackages, pkgs }:
buildNodePackage {
    name = "cloud-native-internal";
    version = "0.0.0";
    src = ./.;
    deps = with nodePackages; [
      pino-debug_1-2-0
      casbin_2-0-0
      fastify-blipp_1-2-1
      abstract-cache-redis_1-0-2
      authenticator_1-1-5
      resquire_1-1-1
      fastify_1-14-1
      fast-json-patch_2-0-7
      per-env_1-0-2
      pg_7-8-0
      ioredis_4-6-2
      make-promises-safe_4-0-0
      pino_5-11-1
      upath_1-1-0
      knex_0-16-3
      rambdax_1-7-1
      fastify-accepts-serializer_1-0-2
      muggle-test_1-0-0
      fastify-sensible_1-0-0
      objection-soft-delete_1-0-5
      tap-min_1-3-0
      fastify-caching_3-0-0
      config_3-0-1
      xxhashjs_0-2-2
      rfdc_1-1-2
      fastify-auth_0-3-0
      knex-migrate_1-7-0
      got_9-6-0
      obj-watcher_2-0-15
      latest-semver_1-0-0
      ajv_6-8-1
      is-semver_1-0-9
      map-factory_3-8-0
      dayjs_1-8-5
      objection_1-5-3
      await-result_2-2-1
      muggle-assert_1-1-3
      permit_0-2-4
      emittery_0-4-1
      deeps_1-4-5
      is-installed_2-0-1
      objection-db-errors_1-0-0
      abstract-cache_1-0-1
      to-json-schema_0-2-0
      flatted_2-0-0
      fastify-redis_3-0-0
      redrun_7-1-4
      hasha_3-0-0
      cuid_2-1-4
      url-parse_1-4-4
    ];
    optionalDependencies = with nodePackages; [
      fastify-nodemailer_3-0-0
      fastify-server-session_2-0-0
      pbkdf2_3-0-17
      iron_5-0-6
      fastify-cookie_2-1-6
      nanoid_2-0-1
      password-magic_1-0-0
    ];
    devDependencies = with nodePackages; [
      husky_1-3-1
      nyc_13-2-0
      eslint-plugin-ava_5-1-1
      xo_0-24-0
      eslint-plugin-promise_4-0-1
      namespaces.commitlint.lint_7-5-0
      eslint-plugin-node_8-0-1
      namespaces.commitlint.prompt-cli_7-5-0
      eslint_5-13-0
      babel-runtime_6-26-0
      eslint-plugin-prettier_3-0-1
      nock_10-0-6
      eslint-config-prettier_4-0-0
      rxjs-compat_6-4-0
      testdouble_3-10-0
      pino-pretty_2-5-0
      local-repl_4-0-0
      rxjs_6-4-0
      mismatch_1-0-3
      gron_4-4-0
      eslint-config-xo_0-26-0
      namespaces.commitlint.cli_7-5-0
      documentary_1-21-1
      eslint-plugin-import_2-16-0
      chuhai_1-2-0
      clear-module_3-1-0
      namespaces.commitlint.config-conventional_7-5-0
      rewire_4-0-1
      supertest_3-4-2
      codecov_3-1-0
      tree-node-cli_1-2-5
      eslint-plugin-no-use-extend-native_0-4-0
      prettier_1-16-4
      acorn_6-0-7
      run-tests_1-0-4
      updates_7-0-0
      lint-staged_8-1-3
      eslint-plugin-unicorn_7-1-0
      fmtconv_1-0-7
      faker_4-1-0
    ];
    meta = {
      homepage = "https://github.com/sotekton/cloud-native-internal#readme";
      description = "Starter scaffold for Internal Cloud Native Applications";
    };
  }
