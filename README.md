# trello-api

This is a wrapping for Trello API

@see https://trello.com/app-key

## Documentation
All code is clearly documented, please see code for more details.
### Available api:
*  [Boards](./src/main/cc-trello-boards.js)
*  [Cards](./src/main/cc-trello-boards.js)
*  [Checklist](./src/main/cc-trello-boards.js)
*  [labels](./src/main/cc-trello-boards.js)
*  [Lists](./src/main/cc-trello-boards.js)
*  [Members](./src/main/cc-trello-boards.js)
*  [Organizations](./src/main/cc-trello-boards.js)
*  [Tokens](./src/main/cc-trello-boards.js)
*  [Webhooks](./src/main/cc-trello-boards.js)


View an example below.

## Installation

```
npm install trello-api
```

## Deploying

```
yarn version
```

## Usage

cc-trello is essentially a wrapper for the trello API. I creates a easier way to communicate to trello.

https://trello.readme.io/reference


```js
const TrelloApi = require('trello-api');

// Credentials used
let _config = {
    developerKey = '<key>',
    tokenKey = '<key>'
};

let _trello = new TrelloApi(_config);
```

## Testing

To test the module tape is used.

```
yarn test
```


## License (MIT)

Copyright (c) Anton Van Zyl <https://github.com/aavanzyl/>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
