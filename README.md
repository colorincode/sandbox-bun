# Getting started & Install

Install package and deps. Node, npm (and package/version managers) are a pre-requisite, be sure to have these installed. 
This project was created using `bun init` in bun v1.1.29. 

To install:

```
bun install
```

To run:
## run dev

```
bun run dev
```

## run production

```
bun run prod
```

# Preparing for production

## Clearing , linting, formatting 
Lint and apply safe fixes only to the src directory:

To clear the dist or prod directory, run `npm run clean`

# Scaffolding & Architecture

The src folder is intended to hold all app and project specific items. 
The root directory holds all the dot and config files, which can be edited and deleted as needed, if alternate processes are used. 
The root directory contains the build process file, which is dev.ts 
The prod.ts file builds from the dev.ts file (so it's not necessary to re-create a server to run a production build)


# Diagnostics

Served up through biome in this version. Saved useful commands and utilities here:

CLI help
```
biome --help
```
Help with Biome daemon logs
```
biome explain daemon-logs
```
Find all `console.log` invocations 
```
biome search '`console.log($message)`' 

```

# Updates
Breaking change potentially. Scaffold and sep of concerns change. 
scaffold for build:
- build.ts - should run the entire build for a full stack app. This is intended to be run after init and install, and sets the 
entire app up, compiles all code and deals with all assets. Special attention needs to be paid to handling all these tasks as quickly and efficiently as possible, with deference to the memory of the end-user system, and using file sink / incremental writing  should be given. The intent is to be able to handle static sites whether SPA OR MPA and full stack development front to back. 
- serve.ts - this is going to be the new "dev.ts" - this is intended to init and serve bun only, without other
scripts having to run for this to work. it contains server information. This script should have "HMR" or as close to it as we can achieve, the hope is that when a change is made, it sends a refresh to the page that is being edited, and rebuilds the files related to that page (e.g. if you are editing index.html, and index links to app.css and app.js - the change is detected and only rebuilds the files involved with the working file to keep memory usage/complete rebuilds to a minimum)

- Use loaders & plugins to preload the scripts that need to be handled for each build. This would require them to 
be preloaded as for bun

- Handling different file types:
The builder needs to be able to handle:

preload.ts -> this file is intended to preload all plugins, and have a "fail safe" mechanism that, should one plugin fail, the build can simply skip that script and process the next script (and next) until it is able to reach and start the server. 
asset_plugin.ts -> this should be a plugin that will handle all image/video asset related functions, implement sharp for image optimization and edits. This should run once at the init/serve, so bun is not attempting to rewrite asset files that have already been copied on the initial run. 
transformJS_plugin.ts -> this plugin should handle transpilation/building of TS/JS/CJS/MJS files, if the files are importing third party deps, this should support tree shaking, and discard unused TS/JS. This needs to be able to handle certain nested deps and common production issues. 
transformCSS_plugin.ts -> This plugin should be able to transpile, tree-shake, and lint/minify CSS and SCSS files, we should assume there may be barrel files or that files with _name.scss are only partials intended to be imported or compiled to the final CSS output, and only when they are referenced.  

build_prod.ts -> production only script, which should run biome linter, run css post processing (e.g. add vendor prefixes), minify code, suggest optimizations, check for dependency updates, re-run the build script to compile exactly as it would in development env. 
post_report.ts -> can be run after a build or a prod as a test / report script. It should log build/compilation errors and a summary of file sizes, broken links, missing assets, save/write this to an html file in the root so the report can be easily accessed. It should include the tooling already built in like biome etc    


Removing redundancies, logging in case i need to add back later:
removed:
eslint
postcss
rimraf
sass (and subs)
bun-img-transform
lightningcss (ships with bun)
stylelint 

deprecated/can be deleted
eslintignore
eslintrc
stylelineignore
stylelintrc