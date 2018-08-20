## Inline HTML email templates

Useful for services such as Campaign Monitor

### Requirements

Create two folders in root - src and output. Follow this structure for the template and it's assets:

```
/src/index.html  
/src/*.css  
/src/img/*
```

Wrap stylesheet link tags with:

```html
<!-- build:css css/tidy.css -->
    <link rel="stylesheet" href="my-styles.css">
<!-- /build -->
```

### Installation and usage

```
npm install
gulp
```

A Ruby runtime is required for Premailer. gulp-premailer uses the Premailer gem to inline styles, and is required for core functionality.

You can install via RubyGems package management framework for Ruby:

```
gem install premailer
```

You may also need to install the dependency Nokogiri

```
gem install nokogiri
```

#### Output

Output files should appear in /output as:

```
/output/{name of file}-inline.html
/output/img.zip
```