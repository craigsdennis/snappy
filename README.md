# Snappy

Simple little helper to access the HTML of a page after any dynamic JavaScript rendering has happened. It does this in a dorky way of waiting for requests to finish (therefore if no web requests are made this won't work. Sorry, but you should just right click and View Source at that point.)

This uses [Playwright](https://playwright.dev/)

## Installation

Copy [.env.example](./.env.example) to `.env` and modify parameters

```bash
npm install
npx playwright install
npm install -g .
```

## Usage

```bash
snappy --url https://www.google.com
```

This will output the HTML to stdout to pipe to other applications or files

```bash
snappy --url https://spacejam.com > static.html
```

*Optionally*

You can create a CSV file with each row containing `filename,url` and pass it in using the `--file` option.

```bash
snappy --file example.csv
```

Files will be stored in the [snaps](./snaps) directory.