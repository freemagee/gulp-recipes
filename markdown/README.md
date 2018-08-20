## Markdown to HTML

Slightly opinionated conversion from .md to .html

### Requirements

Put .md markdown files in `/src`

### Installation and usage

```
npm install
gulp
```

### Output

Output .html files should appear in `/output`

#### Opinionated

Some styling and code syntax highlighting assets are included in `/output` and in the html template. You can remove these after if need be. My intention was to be able to open the outputted .html file in a browser and have a good looking page.

Included in `/output` are:

bootstrap reboot - css reset
GitHub markdown - style markdown in GitHub style
Prism - Syntax hightlighting