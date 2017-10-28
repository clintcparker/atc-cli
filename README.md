# ATC-CLI
A pretty poor wrapper for the [ADPAutoTimecard chrome extension](https://github.com/ebiggz/ADPAutoTimecard#adp-autotimecard).

## Installation 

### Git

```
git clone https://github.com/clintcparker/atc-cli
npm install -g ./atc-cli
```

### NPM

```
npm install -g atc-cli
```

## Usage

```
atc -n jsmith@someco -j [{"hours":"8","projectCode","12345"}] -s
```

## Roadmap

This tool has room for improvement. These are the areas so far considered for further development. Feel free to extend this list.

1. Better entry and hour input, something other than JSON from the command line
    * . maybe -t "12345" 
        * . where 12345 defaults to 8 hours
    * . -t "12345:6,12349:2" 
        * . for more explicit breakdowns
    * . csv import
    * . VSTS integration
1. Support for non salaried mode
    * . this is currently untested, but should work as long a the JSON is correct
    * . definitely needs better docs
1. Better password management?
    * . open to ideas
1. Better output during execution
    * . a spinner or progress bar
    * . verbose logging

## Contributing

### Guidelines

1. please lint w/ ESLint
1. please make the PRs atomic at the issue level

### Tools

I've been using VSCode for this, but feel free to use your editor of choice. This tool leverages [puppeteer](https://github.com/GoogleChrome/puppeteer/blob/v0.12.0/docs/api.md#puppeteer), and they are evolving quickly, so please be aware of the changes from version to version. This tool also uses [commander](https://github.com/tj/commander.js/) for the CLI interactions.

## Thanks
1. to EBIGGZ for the amazing chrome extension that makes this all possible