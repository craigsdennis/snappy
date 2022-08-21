# Snappy

Simple little helper to access the HTML of a page after any dynamic JavaScript rendering has happened. It does this in a dorky way of waiting for requests to finish (therefore if no web requests are made this won't work. Sorry, but you should just right click and View Source at that point.)

This uses [Playwright](https://playwright.dev/)

## Usage

```bash
npm install
node snappy.js <URL>
```

This will output the HTML to stdout to pipe to other applications or files

```bash
node snappy.js https://spacejam.com > static.html
```