{ver ? "8"}:
let
  pkgs = import <nixpkgs> {};

	/* start example */
  envPkgs = with pkgs;
	[
		nodejs

    pkgs.git
    pkgs.jq

    # NixOS specific package; installs as client only. i.e.  - still requires a system Docker daemon running
    pkgs.docker
	];
	/* end example */

  # Create a project relative config directory for storing all external program information
  configPath = builtins.toPath (builtins.getEnv "PWD") + "/.nixconfig";
	nodepkg = if ver == null then "nodejs" else "nodejs-${ver}_x";
	nodejs = pkgs.${nodepkg};

in
  if pkgs.lib.inNixShell
  then pkgs.mkShell
    { buildInputs = envPkgs;
      shellHook = ''
        export PATH="$PWD/node_modules/.bin/:$PATH"
				[ "$NODE_ENV" != "ci" ] && npm i || npm ci
				npm dedupe
				npm prune
        npm audit fix
      #  $(bashrc)
      '';
    }
  else envPkgs

