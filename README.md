# mockful

A simple API server for lazy mocking with no configuration.

## Install

```
npm install -g mockful
```

## Running

Simply run `mockful` and it will start an HTTP server on port 3000.

To change the port, use `--port PORT`. For example:

```
mockful --port 3000
```

## Making requests

mockful accepts all HTTP requests. However, if no special parameters are set then the server will simply respond with an empty body with 200 OK.

### Special parameters

These special parameters affect how mockful will respond to a request.

- `_mock` - Specifies what will be echoed back in the response

  JSON example:

  ```json
  {
    "_mock": {
      "example": true
    }
  }
  ```

  Query string example:

  ```
  _mock[example]=true
  ```

- `_headers` - Specifies what headers to set in the response

  JSON example:

  ```json
  {
    "_headers": {
      "X-Custom": "Example"
    }
  }
  ```

  Query string example:

  ```
  _headers[X-Custom]=Example
  ```

- `_status` - Specifies the status code to use in the response

  JSON example:

  ```json
  {
    "_status": 422
  }
  ```

  Query string example:

  ```
  _status=422
  ```

### Setting parameters

These special parameters can be set in the request body or in the query string. If both are set, mockful will look for the special parameter in the body first before looking in the query string.

All other parameters defined will be ignored. After all, you're just mocking your API.

#### Using a request body

mockful supports JSON and urlencoded bodies.

#### Using a query string

A query string can be passed in the format of:
```
_mock[name]=test
```

The above will result in the responding body returning:
```
{"name":"test"}
```

To simplify building a query string like this, [qs](https://www.npmjs.com/package/qs) can be used. For example:

```js
let query = qs.stringify({
  _mock: [
    {
      name: 'test',
      test: [1, 2, 3]
    }
  ]
});

# query = '_mock%5B0%5D%5Bname%5D=test&_mock%5B0%5D%5Btest%5D%5B0%5D=1&_mock%5B0%5D%5Btest%5D%5B1%5D=2&_mock%5B0%5D%5Btest%5D%5B2%5D=3'
# Unescaped: '_mock[0][name]=test&_mock[0][test][0]=1&_mock[0][test][1]=2&_mock[0][test][2]=3'

let url = `http://localhost:3000/example?${query}`;
```
