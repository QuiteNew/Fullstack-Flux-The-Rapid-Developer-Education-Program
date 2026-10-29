# Class 10 — Web APIs and Fetch

Companion notes for `Class10-WebapiFetch.pptx`. The slides are the outline; this is the
content. Section numbers map to slide numbers. Slide 6 — the `fetch` API — gets four sections
(5 to 8), because that is where the code is, and where most of the bugs are.

Every example was run with Node 24 against the real API named in it, and the output shown is
the real output (long JSON is shortened with `…`). Type claims were checked with the
TypeScript 7 compiler. Where the browser behaves differently from Node, the notes say so.
`fetch` returns a promise, and everything here uses `async` / `await` — see
[Class 09](Class09-AsynchronousJavaScript.md) if those still feel like magic.

**Contents**

1. [What is a Web API?](#1-what-is-a-web-api-slide-3)
2. [REST in practice](#2-rest-in-practice-slide-4)
3. [Other kinds of API](#3-other-kinds-of-api-slide-4)
4. [Using public APIs](#4-using-public-apis-slide-5)
5. [Fetch basics](#5-fetch-basics-slide-6)
6. [Sending data and building URLs](#6-sending-data-and-building-urls-slide-6)
7. [Timeouts and cancellation](#7-timeouts-and-cancellation-slide-6)
8. [CORS](#8-cors-slide-6)
9. [Managing API requests](#9-managing-api-requests-slide-7)
10. [Errors, states and caching](#10-errors-states-and-caching-slide-7)
11. [Handling JSON](#11-handling-json-slide-8)
12. [Common mistakes](#12-common-mistakes)

---

## 1. What is a Web API? (slide 3)

An **API** (Application Programming Interface) is the part of a piece of software that other
software is allowed to use. `Array.prototype.map` is part of JavaScript's API;
`document.querySelector` is part of the browser's.

A **Web API** is an API you call **over the network, using HTTP**. Your code sends a request
to a URL; a program on another machine sends back a response. Everything from
[Lecture 01, Class 01, section 6](../../Lecture01/Materials/Class01-Introduction.md#6-http-and-web-servers-slides-1114)
— methods, status codes, headers, statelessness — applies directly. The difference from
loading a web page is who reads the response: not a person looking at HTML, but code reading
data, almost always **JSON** (section 11).

The slide's "set of rules (and protocols)" is, concretely, a **contract**: *send a `GET` to
this URL with these parameters, and you get back data of this shape — or one of these
errors.* The documentation (section 4) is where the contract is written down.

The slide lists where APIs are used. It is the same mechanism at different scales:

- **Frontend to backend** — your page asks your own server for data. This is what you will
  write most: a React or Angular app is a frontend talking to a backend API.
- **Business to business** — a shop's server asks a payment provider to charge a card, or a
  bank for an exchange rate. Neither company sees the other's code, only the API.
- **Distributed systems** — one large application split into services (users, orders,
  search…) that talk to each other through APIs.

That last point is what *"enables software scaling by functionality"* means. Once the parts
only talk through APIs, each can be built, deployed and scaled on its own: if search is
overloaded, run ten copies of the search service and leave the rest alone. The price is that
every call between the parts is now a network call — slower, and able to fail in ways a
function call cannot (section 10).

---

## 2. REST in practice (slide 4)

**REST** (REpresentational State Transfer) is not a protocol or a library. It is a *style* of
designing APIs on top of HTTP, described by Roy Fielding in his 2000 PhD thesis. In everyday
use, "a RESTful API" means:

> **Resources are named by URLs, and the HTTP method says what to do with them.** Data goes
> back and forth as JSON.

Strictly, most APIs called "REST" skip parts of what Fielding described — "JSON over HTTP
with sensible URLs" would be more accurate. The name has stuck anyway.

### Resources, URLs and methods

A **resource** is a thing the API knows about: a user, a post, an order. Collections are
plural nouns; one item is the collection plus its id. The examples in these notes use
[JSONPlaceholder](https://jsonplaceholder.typicode.com), a free fake API for practice:

| Request | Means | Typical success |
|---|---|---|
| `GET /posts` | list all posts | `200 OK` |
| `GET /posts/1` | read post 1 | `200 OK` |
| `GET /posts/1/comments` | the comments on post 1 | `200 OK` |
| `POST /posts` | create a post (the server picks the id) | `201 Created` |
| `PUT /posts/1` | replace post 1 entirely | `200 OK` or `204 No Content` |
| `PATCH /posts/1` | change some fields of post 1 | `200 OK` |
| `DELETE /posts/1` | delete post 1 | `200 OK` or `204 No Content` |

Note what is **not** in the URLs: verbs. Not `/getPost?id=1`, not `/deletePost/1` — the verb
is the HTTP method.

Lecture 01 defines the two properties of methods that matter here. **Safe**: does not change
anything (`GET`). **Idempotent**: doing it twice has the same effect as once (`GET`, `PUT`,
`DELETE` — but **not** `POST`). Idempotency is why you can retry a failed `GET` or `PUT`
freely, but should think twice before retrying a `POST` (section 10): if the first one did
reach the server, you have now created two orders.

### Status codes

Lecture 01 lists the codes worth knowing by name. In code, you mostly check the family:
**`2xx`** it worked; **`3xx`** look elsewhere (`fetch` follows redirects for you); **`4xx`**
*your* request was wrong (`400`, `401`, `403`, `404`, `429`); **`5xx`** the server failed
(`500`, `502`, `503`, `504`). Section 5 shows why checking it is *your* job.

### Three places to put data

| Where | Example | Use it for |
|---|---|---|
| **Path** | `/users/1/posts` | *which* resource — its identity |
| **Query string** | `/posts?userId=1&_limit=2` | options: filtering, sorting, paging, searching |
| **Body** | `{"title": "Hello", "userId": 1}` | the data you send with `POST`, `PUT`, `PATCH` |

Rule of thumb: if leaving it out would mean a *different thing* (post 1 versus post 2), it
belongs in the path. If leaving it out still makes sense with defaults (all posts versus some
posts), it belongs in the query string. A `GET` never has a body.

### Headers

Headers carry information *about* the request or response. The ones you will meet constantly:

| Header | Direction | Says |
|---|---|---|
| `Content-Type: application/json` | both | "the body is JSON" |
| `Accept: application/json` | request | "please answer in JSON" |
| `Authorization: Bearer …` | request | who you are (section 4) |
| `Cache-Control`, `ETag` | response | how long it may be cached (section 10) |
| `Location` | response | the URL of a newly created resource (with `201`) |
| `Retry-After` | response | how long to wait before trying again (with `429`, `503`) |

---

## 3. Other kinds of API (slide 4)

REST is the most common style, but the slide lists four more. Briefly and honestly:

| | What it is | Format | Good at | Where you meet it |
|---|---|---|---|---|
| **REST** | URLs for resources, methods for actions | JSON, usually | simple, cacheable, works everywhere | most public and in-house APIs |
| **GraphQL** | one endpoint; the client sends a *query* naming exactly the fields it wants | JSON | one request for exactly what a screen needs | GitHub, Shopify, large frontends |
| **SOAP** | XML messages in a fixed envelope, described by a WSDL file | XML | strict contracts, enterprise tooling | banks, government, older systems |
| **gRPC** | call functions on a remote server as if they were local | Protocol Buffers (binary) | fast service-to-service calls | backend to backend |
| **WebSocket** | a permanent two-way connection; either side sends at any time | anything, often JSON | live data: chat, games, collaboration | real-time features |

Footnotes to the slide's list. **GraphQL** is often expanded as "Graph Query Language", but
officially the name is not an acronym — and it queries APIs, not databases. **SOAP** did stand
for "Simple Object Access Protocol", but version 1.2 of the standard dropped the expansion.
**gRPC**'s recursive name is a joke by its Google authors; it is awkward to call from a
browser and lives mostly between servers. **WebSocket** is a different kind of *connection*,
not a way of designing URLs, and is not used with `fetch` — the browser has a separate
`WebSocket` object.

One the slide leaves out: **Server-Sent Events (SSE)**. The server keeps an HTTP response
open and pushes events down it as they happen; the browser reads them with `EventSource`. It
is one-way (server to client), much simpler than WebSocket, and is how many live dashboards —
and AI chat interfaces — stream their output.

### Public and private APIs

A **public API** is meant for outside developers: documented, often with a free tier, usually
needing a key. A **private** (internal) API is meant only for the company's own software —
typically the backend that only its own frontend calls.

"Private" describes who it is *meant* for, not who *can* call it. If your frontend calls your
backend from the browser, anyone can copy the request from the Network tab and send it
themselves. **A private API must still check every request.**

---

## 4. Using public APIs (slide 5)

Before writing code against someone else's API, check the slide's five points.

**Documentation** is the contract: base URL, endpoints, parameters, response shapes, errors
(many APIs also publish an **OpenAPI** file, from which tools generate docs and TypeScript
types). Read it, then make one request by hand — the address bar works for a `GET` — and look
at the real response before writing code around it.

**Pricing.** Most APIs have a free tier with a monthly or daily limit. Check what happens past
it: some refuse requests, others quietly start billing. Every API in these notes is free and
needs no account.

### API keys

An **API key** is a long random string that identifies *your application*. The provider uses
it to count your requests, apply your limits, and switch you off if you abuse the service. It
goes in a header or in the query string, depending on the API:

```ts
fetch(url, { headers: { "X-API-Key": key } });                 // header: the usual choice
fetch(url, { headers: { Authorization: `Bearer ${key}` } });
fetch(`https://api.nasa.gov/planetary/apod?api_key=${key}`);   // query: ends up in logs
```

Leave it out, and you get a `4xx`: NASA answers `403` with a JSON error whose code is
`"API_KEY_MISSING"`.

> **A key in browser code is public.** Anything your page sends, the user can see in the
> Network tab; anything in your JavaScript, they can read in the Sources tab. Putting it in a
> variable, a separate file, or a build-time environment variable does not hide it.

So a key that costs money or unlocks private data must **never** be in frontend code. The fix
is a small backend of your own that holds the key and forwards requests — a **proxy**. And
never commit a key to Git: bots scan GitHub for them constantly.

### Authentication

The slide lists access control and authentication separately, and they differ. An **API key**
identifies the *application* ("the Weather Widget app"); **authentication** identifies the
*user* ("Ana, who logged in"), usually with a **token** sent as
`Authorization: Bearer <token>`. A bad token gives **`401`** — GitHub, given a made-up one,
says `"Bad credentials"`; a valid token without permission gives **`403`**. Logins and tokens
are a backend topic for later in the course.

### Rate limiting

Every serious API limits how many requests a client may make per period. Many say so in
response headers. GitHub, for a request without a token:

```ts
const response = await fetch("https://api.github.com/users/octocat");
console.log(response.headers.get("x-ratelimit-limit"));       // 60
console.log(response.headers.get("x-ratelimit-remaining"));   // 57
console.log(response.headers.get("x-ratelimit-reset"));       // 1792955977
```

Sixty requests per hour, 57 left, and the reset time in Unix seconds
(`new Date(1792955977 * 1000)` is `2026-10-25T19:19:37.000Z`).

Over the limit, the standard answer is **`429 Too Many Requests`**, often with a
**`Retry-After`** header — a number of seconds, or a date. (GitHub's documentation says it may
answer `403` *or* `429`, with `x-ratelimit-remaining: 0`.) So: do not call an API in a loop or
on every keystroke without thinking about the limit, cache what you can, and when you get a
`429`, **wait** — retrying immediately only burns more of your quota. Section 10 has a retry
that respects `Retry-After`.

---

## 5. Fetch basics (slide 6)

`fetch` is the browser's built-in function for HTTP requests; it replaced the older
`XMLHttpRequest`. It is also a **global in Node** since version 18, so every example here runs
both in the browser console and with `node file.ts`.

### The first request

```ts
const response = await fetch("https://jsonplaceholder.typicode.com/users/1");
const user = await response.json();

console.log(user.name, "—", user.email);
// Leanne Graham — Sincere@april.biz
```

There are **two** `await`s, and both are needed:

1. `fetch(url)` resolves as soon as the **headers** arrive — you have the status, not the data.
2. `response.json()` reads the **body** from the network and parses it. That takes time too,
   so it also returns a promise. Forget this `await`, and `user` is a `Promise`, and
   `user.name` is `undefined`.

> **In Node,** top-level `await` works only in an ES module. If `package.json` says
> `"type": "commonjs"` — which `npm init -y` writes — you get *SyntaxError: await is only
> valid in async functions and the top level bodies of modules*. Set `"type": "module"`.

### The `Response` object

| Member | What it is |
|---|---|
| `status` | the status code: `200`, `404`… |
| `ok` | `true` if `status` is 200–299 |
| `statusText` | `"OK"`, `"Not Found"`… — but `""` over HTTP/2 (Chrome gets `""` from JSONPlaceholder; Node, on HTTP/1.1, gets `"OK"`). Do not rely on it |
| `headers` | a `Headers` object: `response.headers.get("content-type")` (case-insensitive) |
| `url` | the final URL, after redirects |
| `json()`, `text()`, `blob()` | read the body as parsed JSON, a string, or binary data (images, files) |
| `bodyUsed` | whether the body has been read already |

### The number one bug: `fetch` does not fail on 404

Ask for a post that does not exist:

```ts
const response = await fetch("https://jsonplaceholder.typicode.com/posts/9999");
const post = await response.json();

console.log(post.title);                     // undefined
console.log(response.status, response.ok);   // 404 false
console.log(post);                           // {}
```

No exception — a `try...catch` around this code would never reach its `catch`.

> **`fetch` only rejects when there is no response at all** — no network, unknown server,
> request blocked or cancelled. A `404`, `403` or `500` *is* a response: the server answered,
> so `fetch` resolves, and checking `response.ok` is **your** job.

So every real use of `fetch` needs:

```ts
const response = await fetch(url);
if (!response.ok) {
  throw new Error(`HTTP ${response.status} for ${url}`);
}
const data = await response.json();
```

Section 9 wraps this in a function, so you write it once.

### When `fetch` does reject

With no response at all, `fetch` rejects with a `TypeError`, whose message depends on where
the code runs: `Failed to fetch` in Chrome and Edge, `NetworkError when attempting to fetch
resource.` in Firefox, `Load failed` in Safari, and `fetch failed` in Node. Node puts the real
reason in `error.cause`:

```js
try {
  await fetch("https://no-such-host.invalid/api");
} catch (error) {
  console.log(`${error.name}: ${error.message}`);   // TypeError: fetch failed
  console.log(error.cause.code);                    // ENOTFOUND
}
```

(`ECONNREFUSED` would mean nothing is listening on that port.) In the browser, code gets only
the vague message; the explanation goes to the console, for humans. That is deliberate: a page
must not learn *why* a request failed, as that would leak details of the user's network.

### The body can be read only once

A body is a **stream**: it arrives piece by piece and is consumed as it is read.

```ts
const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
const text = await response.text();
await response.json();
// Node:   TypeError: Body is unusable: Body has already been read
// Chrome: TypeError: Failed to execute 'json' on 'Response': body stream already read
```

This bites when you log `text()` while debugging and then call `json()`. Read the body
**once**, into a variable. If you truly need it twice, call `response.clone()` first.

### When `json()` throws

`response.json()` rejects with a `SyntaxError` if the body is not JSON. Usually the URL is
wrong, and the server sent an HTML page — possibly with status `200`. Fetching
JSONPlaceholder's home page (`200`, `text/html`) and calling `json()` gives:

```
SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON
```

> **`Unexpected token '<'`** means you got HTML where you expected JSON. Check the URL.

The other case is `204 No Content` — success, empty body: `json()` gives
`SyntaxError: Unexpected end of JSON input`. Check for `204` before parsing.

---

## 6. Sending data and building URLs (slide 6)

"Very configurable", says the slide. `fetch` takes a second argument — an options object,
typed `RequestInit` in TypeScript — that controls the request.

### POST with a JSON body

```ts
const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "Hello", body: "My first post", userId: 1 }),
});

console.log(response.status, response.statusText);   // 201 Created
console.log(response.headers.get("location"));       // https://jsonplaceholder.typicode.com/posts/101
console.log(await response.json());
// { title: 'Hello', body: 'My first post', userId: 1, id: 101 }
```

All three parts are needed:

- **`method: "POST"`** — the default is `GET`.
- **`body: JSON.stringify(...)`** — pass the object itself and `fetch` converts it with
  `String()`, sending the text `[object Object]`.
- **`Content-Type: application/json`** — without it, `fetch` labels a string body
  `text/plain;charset=UTF-8`, and many servers ignore it. JSONPlaceholder does: the same
  request without the header still gets `201 Created`, but the response is just `{ id: 101 }`
  — the title, body and user were silently dropped. No error anywhere.

(JSONPlaceholder is a fake. It answers as if it had saved the post, but `GET /posts/101`
afterwards is a `404`.)

### PUT, PATCH and DELETE

```ts
const url = "https://jsonplaceholder.typicode.com/posts/1";
const headers = { "Content-Type": "application/json" };

await fetch(url, { method: "PUT", headers, body: JSON.stringify({ id: 1, title: "Replaced", body: "All new", userId: 1 }) });
// 200  { id: 1, title: 'Replaced', body: 'All new', userId: 1 }

await fetch(url, { method: "PATCH", headers, body: JSON.stringify({ title: "Only the title changed" }) });
// 200  { userId: 1, id: 1, title: 'Only the title changed', body: 'quia et suscipit…' }

await fetch(url, { method: "DELETE" });
// 200  {}
```

The `PATCH` result shows the difference from `PUT`: the fields you did not send are kept.

A `GET` cannot have a body. Try, and `fetch` throws before sending anything:
`TypeError: Request with GET/HEAD method cannot have body.` Options for a `GET` go in the
query string.

### Query strings: use `URL` and `URLSearchParams`

Gluing values into a URL with a template literal works — until a value has a special
character in it:

```ts
const term = "C# & .NET";
const naive = new URL(`https://api.github.com/search/repositories?q=${term}`);
console.log(naive.searchParams.get("q"));    // C
```

The search term has silently become `"C"`. The `#` started the URL's *fragment* — which is
never even sent to the server — and an `&` would have started a new parameter. Values must be
**encoded**, and the `URL` class does it for you:

```ts
const url = new URL("https://api.github.com/search/repositories");
url.searchParams.set("q", "fetch language:typescript");
url.searchParams.set("sort", "stars");
url.searchParams.set("per_page", "3");

console.log(url.toString());
// https://api.github.com/search/repositories?q=fetch+language%3Atypescript&sort=stars&per_page=3

const response = await fetch(url);                // fetch accepts a URL object
const data = await response.json();
console.log(data.items.map((repo: { full_name: string }) => repo.full_name));
// [ 'TanStack/query', 'vercel/swr', 'sindresorhus/ky' ]
```

`URLSearchParams` also works on its own, from an object of strings:
`new URLSearchParams({ q: "C# & .NET", page: "2" }).toString()` gives
`q=C%23+%26+.NET&page=2`. For a single value, `encodeURIComponent("C# & .NET")` gives
`C%23%20%26%20.NET` (spaces as `%20` rather than `+` — servers accept both in a query string).
Path segments need encoding too: `` `/users/${encodeURIComponent(name)}` ``.

> **Never glue user input into a URL unencoded.** Use `URL` and `searchParams`.

---

## 7. Timeouts and cancellation (slide 6)

`fetch` has **no timeout by default**. If a server accepts the connection and then never
answers, your `await` hangs — and your page shows a spinner forever.

### `AbortSignal.timeout`

```ts
try {
  const response = await fetch(url, { signal: AbortSignal.timeout(5000) });
  // ...
} catch (error) {
  if (error instanceof DOMException && error.name === "TimeoutError") {
    console.log("The server took too long to answer");
  }
}
```

After 5 seconds, `fetch` rejects with a `DOMException` named **`TimeoutError`**. The message
is *The operation was aborted due to timeout* in Node and *signal timed out* in Chrome — so
check the `name`, never the message.

### `AbortController`: cancelling on purpose

```ts
const controller = new AbortController();
const pending = fetch("https://jsonplaceholder.typicode.com/photos", { signal: controller.signal });
controller.abort();
await pending;
// Node:   AbortError: This operation was aborted
// Chrome: AbortError: signal is aborted without reason
```

This solves a real problem in search boxes. The user types "fe", then "fetch", and two
requests go out. If the "fe" response arrives *last*, the page shows the wrong results.
Cancel the previous request before starting the next:

```ts
let current: AbortController | undefined;

async function search(url: URL): Promise<void> {
  current?.abort();                          // cancel the previous search, if any
  current = new AbortController();
  try {
    const response = await fetch(url, { signal: current.signal });
    // ... check ok, parse, show the results ...
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return;                                // replaced by a newer search: not an error
    }
    throw error;
  }
}
```

An `AbortError` you caused yourself is not something to show the user. For both a manual
cancel *and* a timeout, combine them: `AbortSignal.any([controller.signal, AbortSignal.timeout(5000)])`.

---

## 8. CORS (slide 6)

Sooner or later, this appears in the browser console:

```
Access to fetch at 'https://www.uacs.edu.mk/' from origin 'https://jsonplaceholder.typicode.com'
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the
requested resource.
```

…while your code gets only `TypeError: Failed to fetch`. Then the same URL works perfectly
from `curl` or Node. Here is why.

### The same-origin policy

An **origin** is scheme + host + port. `https://www.uacs.edu.mk` and
`https://jsonplaceholder.typicode.com` are different origins — and so are
`http://localhost:3000` and `http://localhost:5173`.

By default, **a page may not read responses from another origin.** The reason is cookies: the
browser attaches your bank's cookies to every request to the bank — including requests made by
*any other page you have open*. Without this rule, a malicious page could `fetch` your account
page and read your balance, using your login.

**CORS** (Cross-Origin Resource Sharing) is how a server opts out of that protection, with a
response header naming who may read its responses:

```
Access-Control-Allow-Origin: *                                       ← anyone (GitHub)
Access-Control-Allow-Origin: https://jsonplaceholder.typicode.com    ← just this origin
```

Every API in these notes sends one, which is why they work from any page.

### The browser blocks, not the server

> **CORS is enforced by the browser.** The server answers normally; the browser sees no
> permission header in the response and refuses to hand it to your JavaScript.

That explains everything confusing about it:

- **It works in Node, `curl` and Postman** — they are not browsers, have no user's cookies to
  protect, and do not enforce CORS at all.
- **The request was often sent anyway.** For a simple `GET`, the server received it and
  answered; only the reading was blocked. For a `PUT`, a `DELETE`, or a `POST` with
  `Content-Type: application/json`, the browser first sends a **preflight** `OPTIONS` request
  asking permission, and sends the real one only if the server agrees.
- **You cannot fix it in frontend code.** `mode: "no-cors"` does not switch CORS off — it
  gives you an *opaque* response, with `status` 0 and a body you cannot read. The fix is on the
  server: add the header (if the server is yours), or call the API from your own backend,
  which is not a browser.

### Why `file://` pages break

Open an HTML file by double-clicking it, and it loads from `file:///C:/…` with the origin
`null`. Chrome then blocks both `fetch("data.json")` and `<script type="module">`, with
*Access to … from origin 'null' has been blocked by CORS policy: Cross origin requests are only
supported for protocol schemes: … http, https …*. Plain old `<script>` tags still load, which
is why simple pages seemed fine until now.

The fix is to serve the folder over HTTP, even locally: the Live Server extension in VS Code,
`npx serve`, or the Vite dev server. From here on, everything runs from `http://localhost`.

---

## 9. Managing API requests (slide 7)

`fetch` calls scattered all over an application soon become a mess: the `ok` check forgotten in
one place, the base URL copied into twenty files. The slide's "encapsulation" is the fix:
**keep all `fetch` code in one module**, and let the rest of the program call functions like
`getPost(1)`. That module is also the one place to set the request headers the slide
mentions: `Content-Type` for JSON bodies, `Accept: application/json`, and `Authorization` if
the API needs a key.

### A typed `getJson` wrapper

The three things every request needs — fetch, check the status, parse — once:

```ts
export class HttpError extends Error {
  readonly status: number;
  readonly url: string;

  constructor(status: number, url: string) {
    super(`HTTP ${status} for ${url}`);
    this.name = "HttpError";
    this.status = status;
    this.url = url;
  }
}

export async function getJson<T>(url: string | URL, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);

  if (!response.ok) {
    throw new HttpError(response.status, response.url);
  }

  return (await response.json()) as T;
}
```

(No `statusText` in the message — it is empty over HTTP/2.)

```ts
interface Post { userId: number; id: number; title: string; body: string; }

const post = await getJson<Post>("https://jsonplaceholder.typicode.com/posts/1");
console.log(post.title.toUpperCase());
// SUNT AUT FACERE REPELLAT PROVIDENT OCCAECATI EXCEPTURI OPTIO REPREHENDERIT

try {
  await getJson<Post>("https://jsonplaceholder.typicode.com/posts/9999");
} catch (error) {
  if (error instanceof HttpError && error.status === 404) {
    console.log("No such post");
  }
}
```

The 404 now *does* throw, with a message that says what failed and where:
`HttpError: HTTP 404 for https://jsonplaceholder.typicode.com/posts/9999`. The
`status` property lets the caller treat a `404` differently from a `500`.

### The types are a promise nobody checks

`response.json()` is typed `Promise<any>`. That is why `getJson` can cast to `T` — and why
the cast proves nothing. [Class 08](../../Lecture04/Materials/Class08-AdvancedTypeScript.md)
warned about exactly this: a generic that "just returns whatever type the caller asks for,
with nothing checked". Ask for the wrong thing, and the compiler is perfectly happy:

```ts
const wrong = await getJson<Post>("https://jsonplaceholder.typicode.com/users/1");   // a user!
console.log(wrong.title);                  // undefined
wrong.title.toUpperCase();
// TypeError: Cannot read properties of undefined (reading 'toUpperCase')
```

This is [Lecture 04, Class 07, section 9](../../Lecture04/Materials/Class07-TypeScriptFundamentals.md#9-benefits--and-costs-slide-9)
in practice: **types are erased, and nobody checks data from the network.** An API changes,
returns an error object with status `200`, or you have the wrong URL — and the crash happens
far from the cause, wherever the missing property is first used.

### Validating the response

The slide's "response handling (including validation)": treat the response as `unknown`, and
check its shape with a **type guard** before using it:

```ts
function isPost(value: unknown): value is Post {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  const v = value as Record<string, unknown>;
  return (
    typeof v.userId === "number" &&
    typeof v.id === "number" &&
    typeof v.title === "string" &&
    typeof v.body === "string"
  );
}

function isPostArray(value: unknown): value is Post[] {
  return Array.isArray(value) && value.every(isPost);
}
```

Then make the wrapper take the guard, so that `T` is tied to something that really checks it:

```ts
export async function getChecked<T>(
  url: string | URL,
  isValid: (value: unknown) => value is T,
): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new HttpError(response.status, response.url);
  }
  const data: unknown = await response.json();
  if (!isValid(data)) {
    throw new Error(`Unexpected response shape from ${url}`);
  }
  return data;                    // narrowed to T by the guard
}

const posts = await getChecked("https://jsonplaceholder.typicode.com/posts?userId=1", isPostArray);
console.log(posts.length);        // 10 — and posts is Post[], inferred from the guard

await getChecked("https://jsonplaceholder.typicode.com/users/1", isPost);
// Error: Unexpected response shape from https://jsonplaceholder.typicode.com/users/1
```

No type argument is written — TypeScript infers `T` from the guard. A bad response now fails
**at the boundary**, with a message naming the URL, instead of three functions later.

Check only what you use: if the page shows a post's title, check the title. For large
responses, real projects use a validation library such as **Zod** or **Valibot**, which builds
the runtime check and the TypeScript type from one description — the same idea as the guard.

---

## 10. Errors, states and caching (slide 7)

### "Exogenous by nature"

The word comes from a well-known classification by Eric Lippert, of the C# compiler team.
Some errors are **bugs** — a typo, a missing `await`. You prevent those, by fixing the code.
**Exogenous** errors come from *outside* the program: the network drops, the server crashes,
the API changes. No code, however good, can prevent them. You can only **expect and handle**
them.

Network code is exogenous by nature: *every* request can fail, so every request needs a plan
for failure:

| What went wrong | How it shows up | Sensible handling |
|---|---|---|
| Offline, DNS failure, server down | `fetch` rejects with `TypeError` | "Cannot reach the server" + *Try again* |
| Blocked by CORS | the same `TypeError`; details only in the console | fix on the server — not in code |
| Too slow | `TimeoutError`, if you set a timeout | message, offer to retry |
| Cancelled by you | `AbortError` | ignore |
| `400`, `422` | `ok` is `false` | show the server's validation message |
| `401`, `403` | `ok` is `false` | ask the user to log in; check the key |
| `404` | `ok` is `false` | "Not found" — often a normal outcome, not an error |
| `429` | `ok` is `false` | wait for `Retry-After`, then retry |
| `5xx` | `ok` is `false` | retry once or twice, then "Try again later" |
| Not JSON (HTML page, `204`) | `json()` rejects with `SyntaxError` | check the URL; check the status first |
| JSON of the wrong shape | **nothing** — `undefined` appears later | validate (section 9) |

A correction to the slide's framing: not *every* error around an API call is exogenous. A
wrong URL, a forgotten `Content-Type`, a missing `ok` check — those are bugs. Fix them; do not
"handle" them.

### Loading, error and empty states

A page that fetches data is in one of four states, and the user should always see which:
**loading** (show something, or the page looks broken), **error** (say so plainly, offer a
retry), **empty** ("no posts yet" is not an error) and **data**.

```ts
const list = document.querySelector<HTMLUListElement>("#posts")!;
const status = document.querySelector<HTMLParagraphElement>("#status")!;

async function showPosts(userId: number): Promise<void> {
  status.textContent = "Loading…";
  list.replaceChildren();

  try {
    const url = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;
    const posts = await getChecked(url, isPostArray);

    if (posts.length === 0) {
      status.textContent = "This user has not posted anything yet.";
      return;
    }
    status.textContent = "";
    for (const post of posts) {
      const item = document.createElement("li");
      item.textContent = post.title;
      list.append(item);
    }
  } catch (error) {
    status.textContent = "Could not load the posts. Please try again.";
    console.error(error);
  }
}
```

The technical error goes to the console, for you; a human sentence goes on the page, for the
user. And the data goes in with `textContent`, never `innerHTML` — text from an API is
untrusted, and `innerHTML` would run any HTML hidden in it.

### Several requests at once: `Promise.all`

Requests that do not depend on each other can run at the same time
([Class 09](Class09-AsynchronousJavaScript.md) covers `Promise.all` itself):

```ts
const posts = await Promise.all(
  [1, 2, 3].map((id) => getJson<Post>(`https://jsonplaceholder.typicode.com/posts/${id}`)),
);
console.log(posts.map((p) => p.id));    // [ 1, 2, 3 ]
```

On one run this took about 300 ms; the same three requests one after another, with `await`
in a loop, about 500 ms — and the gap grows with every request. Two cautions: `Promise.all`
rejects as soon as **any** request fails, losing the other results (use `Promise.allSettled`
if partial results are useful); and running many requests at once is a quick way to meet a
`429`.

### Retrying, with backoff

Some failures are temporary: a dropped connection, a `503` while the server restarts, a `429`.
Retry those — but wait longer after each attempt (**exponential backoff**: 0.5 s, 1 s, 2 s…),
respect `Retry-After`, and give up after a few tries:

```ts
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchWithRetry(url: string, init?: RequestInit, attempts = 4): Promise<Response> {
  for (let attempt = 1; ; attempt++) {
    try {
      const response = await fetch(url, init);
      const retryable = response.status === 429 || response.status >= 500;
      if (!retryable || attempt === attempts) {
        return response;                     // the caller still checks ok
      }
      const retryAfter = Number(response.headers.get("Retry-After"));   // the seconds form
      await sleep(retryAfter > 0 ? retryAfter * 1000 : 500 * 2 ** (attempt - 1));
    } catch (error) {
      if (attempt === attempts || (error as Error).name === "AbortError") {
        throw error;                         // out of attempts, or cancelled on purpose
      }
      await sleep(500 * 2 ** (attempt - 1)); // network error: back off, try again
    }
  }
}
```

Against a local test server that answered `503`, then `429` with `Retry-After: 1`, then
`200`, it waited 500 ms, then 1000 ms, and returned the `200`. Never retry other `4xx` errors —
asking again for something that does not exist will not make it exist. And remember
idempotency (section 2): retrying a `POST` can create duplicates.

### Caching

If data does not change every second, do not fetch it every second. The simplest cache is a
`Map` from URL to the *promise* of the result:

```ts
const cache = new Map<string, Promise<unknown>>();

function cachedGetJson<T>(url: string): Promise<T> {
  let pending = cache.get(url);
  if (pending === undefined) {
    pending = getJson<T>(url);
    pending.catch(() => cache.delete(url));    // do not cache failures
    cache.set(url, pending);
  }
  return pending as Promise<T>;
}
```

The first call took about 200 ms; the second, 0.01 ms. Storing the *promise* means two calls
at the same moment share one request; deleting failures means the next call tries again. What
it lacks is **expiry** — real caches store a timestamp and refetch after a while.

**HTTP caching** is a second layer, which the browser does for you. The `Cache-Control`
response header says how long a response may be reused — GitHub sends `public, max-age=60`,
JSONPlaceholder `max-age=43200` (12 hours) — and until then the browser can answer a repeated
`fetch` from its cache. An `ETag` header lets the client ask "has it changed?" with
`If-None-Match`; if not, the server answers **`304 Not Modified`**, with no body (and `ok`
is `false`: 304 is not 2xx). The `fetch` option `cache: "no-store"` (or `"no-cache"`,
`"reload"`) overrides this per request. Node's built-in `fetch` has no HTTP cache at all.

---

## 11. Handling JSON (slide 8)

[Lecture 03, Class 06, section 9](../../Lecture03/Materials/Class06-DataStructures.md#9-json)
introduced JSON, `stringify`, `parse`, and what does not survive the trip. This section adds
what matters once the JSON comes from a server.

### "String format, not really JavaScript"

**JSON** (JavaScript Object Notation) is text. What travels over the network is always a
string; `response.json()` and `JSON.parse` turn it into values, `JSON.stringify` turns values
into it. The slide's "not really JavaScript" is fair, with a footnote: every valid JSON text is
also a valid JavaScript expression, but not the other way round. JSON is a much smaller,
stricter language that every programming language can read — the server sending it may be
written in Python, Java or C#.

| JSON has | JSON does not have |
|---|---|
| objects `{ }`, arrays `[ ]` | functions, `undefined` |
| strings and keys in **double quotes** | single quotes, backticks, unquoted keys |
| numbers | `NaN`, `Infinity`, hex, a leading `+` |
| `true`, `false`, `null` | comments, trailing commas |
| | dates — they travel as strings: `"2026-12-15T09:00:00.000Z"` |

A JSON text does not have to be an object: `42`, `"hi"`, `null` and `[1, 2]` are all valid.

### `JSON.parse` throws

Every broken rule is a `SyntaxError`. These messages are from Node 24; Chrome's are identical,
since both use the V8 engine:

```ts
JSON.parse(`{'name': 'Ana'}`);
// SyntaxError: Expected property name or '}' in JSON at position 1 (line 1 column 2)

JSON.parse(`{"name": "Ana",}`);
// SyntaxError: Expected double-quoted property name in JSON at position 15 (line 1 column 16)

JSON.parse(`{"n": NaN}`);
// SyntaxError: Unexpected token 'N', "{"n": NaN}" is not valid JSON
```

The trailing comma message makes sense from the parser's side: after a comma it expects
another property, and finds `}`. `response.json()` uses the same parser and fails the same way.

### `JSON.stringify`: indentation and replacers

The third argument indents the output — a number of spaces, or a string like `"\t"`.
`JSON.stringify(data, null, 2)` is the standard way to log a response readably.

The second argument is a **replacer**. An array lists the keys to keep; a function sees every
key and value, and returning `undefined` drops the property:

```ts
const user = { name: "Ana", password: "hunter2", age: 21, joined: new Date(Date.UTC(2025, 9, 1)) };

JSON.stringify(user, ["name", "age"]);       // {"name":"Ana","age":21}
JSON.stringify(user, (key, value) => (key === "password" ? undefined : value));
// {"name":"Ana","age":21,"joined":"2025-10-01T00:00:00.000Z"}
```

An object can also choose its own JSON form with a `toJSON()` method — which is how a `Date`
becomes that string.

### What gets lost

| Value | As an object property | As an array element |
|---|---|---|
| `Date` | ISO string — not a `Date` when parsed back | ISO string |
| `undefined`, functions | property **dropped** | `null` |
| `NaN`, `Infinity` | `null` | `null` |
| `Map`, `Set` | `{}` — the contents vanish | `{}` |
| `BigInt` | **throws** `TypeError: Do not know how to serialize a BigInt` | throws |

Only `BigInt` complains; everything else changes **silently**. Sending a `Map` to a server
sends `{}`. Convert first: `Object.fromEntries(map)`, `[...set]`.

### Restoring dates with a reviver

`JSON.parse` takes an optional **reviver**, the mirror of the replacer: it sees every key and
value on the way in, and returns what to store:

```ts
const text = '{"title":"Exam","when":"2026-12-15T09:00:00.000Z","room":"A1"}';
const isoDate = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/;

const exam = JSON.parse(text, (key, value) =>
  typeof value === "string" && isoDate.test(value) ? new Date(value) : value,
);

console.log(exam.when instanceof Date, exam.when.getUTCHours());   // true 9
```

`response.json()` takes no reviver. To use one, read the body with `await response.text()` and
call `JSON.parse` yourself. Often simpler: keep the string, and convert the one field you need
with `new Date(exam.when)` where you use it.

### Deep copying: JSON versus `structuredClone`

`JSON.parse(JSON.stringify(x))` is an old deep-copy trick, and it suffers every loss in the
table above:

```ts
const original = { when: new Date(Date.UTC(2026, 0, 1)), ids: new Set([1, 2]) };

JSON.parse(JSON.stringify(original));   // { when: '2026-01-01T00:00:00.000Z', ids: {} }
structuredClone(original);              // { when: 2026-01-01T00:00:00.000Z, ids: Set(2) { 1, 2 } }
```

`structuredClone`, built into browsers and Node, keeps dates, maps and sets. It cannot copy
functions (`DataCloneError`), but for data it is the right tool. Use JSON for what it is for:
sending and storing data.

---

## 12. Common mistakes

When a request "does not work", go down this list:

- [ ] **No `ok` check** — `fetch` resolved, but the status was `404` or `500` (section 5).
- [ ] **A missing `await`** — on `fetch` *or* on `response.json()`: a `Promise`, not data.
- [ ] **`Unexpected token '<'`** — you got an HTML page, not JSON. Check the URL.
- [ ] **The body read twice** — `text()` for logging, then `json()`.
- [ ] **A `POST` without `Content-Type: application/json`**, or with `body: data` instead of
      `JSON.stringify(data)`. The server ignores the data, often with no error.
- [ ] **Unencoded query strings** — a `#`, `&` or space breaks the URL. Use `URL`.
- [ ] **No timeout** — a request that never answers leaves the spinner on forever.
- [ ] **CORS "fixed" with `no-cors`** — it fixes nothing; the fix is on the server.
- [ ] **The page opened from `file://`** — modules and `fetch` need `http://localhost`.
- [ ] **Trusting the types** — `getJson<Post>` checks nothing. Validate at the boundary.
- [ ] **A secret API key in frontend code** — it is public the moment the page loads.
- [ ] **Requests in a loop, or on every keystroke** — mind the rate limit.
- [ ] **Only the happy path** — no loading state, no error message, no empty state.
- [ ] **Matching error messages** — `"Failed to fetch"` and `"fetch failed"` are different
      strings in different places. Check `error.name`, `instanceof` and `response.status`.

---

## Further reading

- **MDN: Using the Fetch API** —
  <https://developer.mozilla.org/docs/Web/API/Fetch_API/Using_Fetch>
- **MDN: Response** — <https://developer.mozilla.org/docs/Web/API/Response>
- **MDN: AbortSignal.timeout()** —
  <https://developer.mozilla.org/docs/Web/API/AbortSignal/timeout_static>
- **MDN: Cross-Origin Resource Sharing (CORS)** —
  <https://developer.mozilla.org/docs/Web/HTTP/Guides/CORS>
- **MDN: HTTP caching** — <https://developer.mozilla.org/docs/Web/HTTP/Guides/Caching>
- **Eric Lippert, "Vexing exceptions"** — where "exogenous" comes from —
  <https://ericlippert.com/2008/09/10/vexing-exceptions/>
- **GitHub REST API: rate limits** —
  <https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api>
- **JSONPlaceholder** — the practice API used in these notes —
  <https://jsonplaceholder.typicode.com>

---

*Internet Programming · UACS · Lecture 05*
