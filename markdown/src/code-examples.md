Here are some code samples

```php
<?php phpinfo() ?>
```

And some more

```javascript
module.exports = {
  "parserOptions": {
    "ecmaVersion": 6
  },
  "env": {
    "browser": true,
    "node": true
  },
  "extends": [
    "airbnb-base",
    "prettier"
  ],
  "plugins": [
    "import",
    "prettier"
  ],
  "rules": {
    "prettier/prettier": "error",
    "linebreak-style": 0,
    "no-use-before-define": ["error", { "functions": false, "classes": false }],
    "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
    "no-restricted-imports": ["error", "fs"]
  },
  "globals": {}
};
```
