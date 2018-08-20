## Prettify CSS/SCSS

Sometimes you just need to beautify a file

### Requirements

Create two folders in root - src and dist. Put style assets in /src.

### Installation and usage

```
npm install
gulp
```

#### Output

Output files should appear in /dist

## Config

You can modify the settings via jsbeautify.json

```json
{
  "css": {
    "allowed_file_extensions": ["css", "scss", "sass", "less"],
    "end_with_newline": true,
    "indent_char": " ",
    "indent_size": 2,
    "selector_separator": " ",
    "selector_separator_newline": false
  }
}
```

#### Bugs

I have been unable to configure the formatting to provide new lines between nested selectors for SCSS.

Result:

```scss
h1 {
  font-size: 33px;
  color: purple;
  background: yellow;
  border: 1px solid blue;
  border-radius: 5px;
  transform: rotate(2deg);
}

body {
  font-family: Arial, sans-serif;
  font-size: 13px;
  color: #c0c0c0;
  p {
    column-count: 5;
    column-gap: 20px;
  }
  .second-paragraph {
    width: 200px;
    column-count: 1;
    margin: 0 auto;
  }
}

h1 {
  color: red;
}

h2 {
  color: grren;
}
```

Expected:

```scss
h1 {
  font-size: 33px;
  color: purple;
  background: yellow;
  border: 1px solid blue;
  border-radius: 5px;
  transform: rotate(2deg);
}

body {
  font-family: Arial, sans-serif;
  font-size: 13px;
  color: #c0c0c0;

  p {
    column-count: 5;
    column-gap: 20px;
  }
  
  .second-paragraph {
    width: 200px;
    column-count: 1;
    margin: 0 auto;
  }
}

h1 {
  color: red;
}

h2 {
  color: grren;
}
```