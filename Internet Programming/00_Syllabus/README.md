# Class 01 — Introduction to Internet Programming

Companion notes for `Class01-Introduction.pptx`. The slides are the skeleton; this is the
flesh. Section numbers map to slide numbers, so you can read this alongside the deck or
on its own afterwards.

**Contents**

1. [History of the Internet](#1-history-of-the-internet-slides-45)
2. [What is the Internet?](#2-what-is-the-internet-slide-6)
3. [Key architecture components](#3-key-architecture-components-slide-7)
4. [The operational model](#4-the-operational-model-slide-8)
5. [Web technologies](#5-web-technologies-slides-910)
6. [HTTP and web servers](#6-http-and-web-servers-slides-1114)
7. [Frontend technologies](#7-frontend-technologies-slides-1518)

---

## 1. History of the Internet (slides 4–5)

### ARPANET

The internet did not begin as a communication network for the public. It began as a
research project funded by **ARPA** (the Advanced Research Projects Agency, later DARPA),
part of the U.S. Department of Defense, in the 1960s.

The problem it set out to solve was mundane: research computers were expensive, scarce,
and incompatible, and researchers at one university could not use a machine at another.
The solution was a network that let any machine talk to any other.

The first four nodes went live in 1969:

| Node | Institution |
|---|---|
| 1 | UCLA |
| 2 | Stanford Research Institute (SRI) |
| 3 | UC Santa Barbara |
| 4 | University of Utah |

The first message, sent from UCLA to SRI on 29 October 1969, was supposed to be the word
`LOGIN`. The system crashed after two characters, so the first thing ever sent across the
ancestor of the internet was `LO`.

**The idea that actually mattered** was *packet switching*. The telephone network of the
day worked by circuit switching: to make a call, a physical path was reserved end to end
for the duration. Packet switching instead chops data into small, independently addressed
packets, each of which finds its own way across the network and is reassembled at the far
end. No path is reserved, no single failure breaks a conversation, and the same link can
carry traffic for thousands of conversations at once. Every idea in the rest of this
course rests on that one.

### From ARPANET to the Internet

ARPANET was one network. The *inter*net is what you get when you connect many networks
together, and that required an agreed common language.

- **1 January 1983** — the "flag day". ARPANET switched from its old NCP protocol to
  **TCP/IP**. This is the moment the internet became the internet: any network speaking
  TCP/IP could now join.
- **1983–87** — **DNS** is introduced. Before it, every machine kept a local `HOSTS.TXT`
  file listing every other machine by name, distributed by hand. That obviously does not
  scale past a few hundred hosts.

### The World Wide Web

Note the distinction carefully, because the slides lean on it and most people get it wrong:

> **The internet** is the network — the cables, the routers, the addressing, the protocols.
> **The web** is *one application that runs on top of it*, invented twenty years later.

Email, file transfer, video calls and online games are also internet applications. The web
is simply the one that became so dominant that people now use the two words
interchangeably.

**Tim Berners-Lee**, working at CERN, wrote a proposal in **March 1989** for a system to
link documents across machines. His manager famously annotated it "vague but exciting".
It combined three inventions, all of which you will use in this course:

1. **HTML** — a markup language for documents
2. **HTTP** — a protocol for requesting them
3. **URLs** — a universal addressing scheme

The first website went live in 1990–91. In **April 1993** CERN placed the web technology
in the public domain, free for anyone to use. That decision — not the technology itself —
is why the web won over its commercial competitors.

### The dot-com bubble

**Mosaic** (1993) was the first browser to display images inline with text and made the
web usable for non-specialists. **Netscape Navigator** (1994) commercialised the idea, and
its 1995 IPO started a gold rush.

Between 1995 and 2000, investors poured money into anything with a `.com` in its name,
often with no revenue and no plausible path to any. The NASDAQ index peaked in March 2000
and then lost roughly three-quarters of its value over the following two years. Most of
those companies disappeared.

The important lesson is not that the bubble burst — bubbles always burst. It is that
**the infrastructure survived the crash**. The fibre laid, the standards written and the
people trained during the boom were still there afterwards, and the companies that had a
real business underneath the hype — Amazon (founded 1994) and eBay (1995) among them —
emerged dominant.

### Today and tomorrow

The web outgrew documents. It now carries applications (your email client is a web page),
media (streaming overtook broadcast), and commerce. Three shifts matter for this course:

- **Mobile first** — more traffic comes from phones than from desktops, which is why
  responsive design in section 7 is not optional decoration.
- **Cloud computing** — applications run on rented infrastructure rather than owned
  machines, so "the server" is increasingly an abstraction.
- **The browser as a platform** — a browser is now a full application runtime, which is
  exactly why JavaScript (Class 02) matters so much.

---

## 2. What is the Internet? (slide 6)

> A global network of interconnected computers and devices that allows for the exchange of
> data and information.

That definition is correct but thin. Here is what it means mechanically.

### It is a network of networks

Your laptop connects to a home router; the router connects to an Internet Service Provider;
ISPs connect to regional and then global carriers. No one owns the internet; it is tens of
thousands of independently operated networks that have voluntarily agreed to interconnect
and to speak the same protocols.

### Layering

The single most useful mental model is that the internet is built in **layers**, each one
using the services of the layer beneath without caring how they are implemented:

| Layer | Job | Examples |
|---|---|---|
| **Application** | What the user actually wants to do | HTTP, SMTP, DNS, FTP |
| **Transport** | Deliver data between programs, reliably or not | TCP, UDP |
| **Network** | Get packets from any host to any other | IP |
| **Link** | Move bits across one physical hop | Ethernet, Wi-Fi |

Why this matters to you: when you write a web application you work almost entirely at the
application layer. You write HTTP. You do not write code to retransmit lost packets or to
choose a route across the Atlantic — TCP and IP do that, invisibly. The layering is what
makes web development tractable.

### Addressing and names

- **IP address** — the numeric address of a machine, e.g. `142.250.185.78` (IPv4) or
  `2a00:1450:4001:80f::200e` (IPv6). IPv4 has about 4.3 billion addresses and ran out
  years ago; IPv6 has so many that the number is not worth writing down.
- **Domain name** — the human-readable name, e.g. `uacs.edu.mk`. Names exist because
  people cannot remember numbers.
- **DNS** — the distributed database that translates one into the other.

When you type a URL, a DNS lookup happens *before* any HTTP request can be sent. You will
see this in the browser's Network tab as a separate timing segment. If DNS is slow, your
site is slow, and nothing in your code can fix it.

---

## 3. Key architecture components (slide 7)

### End systems (hosts)

Anything that originates or consumes data: laptops, phones, servers, televisions, sensors.
In the client-server model below, hosts play one of two roles, and the *same machine* can
play both at different moments.

### Internet infrastructure

The machines in the middle that no one thinks about until they break:

- **Routers** — forward packets toward their destination, one hop at a time.
- **Switches** — move frames within a single local network.
- **Links** — fibre, copper, radio, and the undersea cables that carry almost all
  intercontinental traffic.
- **CDNs** (Content Delivery Networks) — caches of your content placed physically near
  users. A CDN is why a site hosted in Germany loads quickly in Skopje.

### Protocols

A **protocol** is an agreement about message format and ordering. Without one, two machines
exchange noise. The three that matter most here:

**TCP/IP** — actually two protocols doing different jobs.

- **IP** gets a packet from one host to another. It is *unreliable by design*: packets may
  be lost, duplicated, or arrive out of order, and IP will not tell you.
- **TCP** builds reliability on top. It numbers bytes, acknowledges what arrived,
  retransmits what did not, reorders what arrived early, and slows down when the network is
  congested. HTTP runs over TCP, which is why you can assume your request arrives intact.
- **UDP** is the alternative: no reliability, no ordering, no congestion control, much
  lower latency. Used for video calls and gaming, where a late packet is worse than a
  lost one. HTTP/3 is built on UDP, for reasons of connection setup speed.

**DNS** — translates names to addresses. It is a hierarchical, distributed, heavily cached
system: your machine asks a resolver, which asks a root server, then a top-level-domain
server (`.mk`), then the authoritative server for the domain. Results are cached at every
step, which is why the second visit to a site is faster and why DNS changes take time to
propagate.

**HTTP** — the application protocol of the web. Covered properly in section 6.

### Network access points

The exchange points where separate networks physically interconnect — **IXPs** (Internet
Exchange Points). Rather than every ISP running a cable to every other ISP, they all meet
at a shared facility. Peering arrangements made at these points determine the actual route
your data takes, which is frequently not the geographically shortest one.

---

## 4. The operational model (slide 8)

### Client–server

The dominant model of the web:

1. A **client** initiates a request. It knows what it wants and where to ask.
2. A **server** waits for requests, processes them, and responds.

The asymmetry is the point. Servers do not call clients. A server cannot push data to a
browser that has not asked for something — a constraint that shapes a great deal of web
architecture, and the reason technologies like WebSockets and Server-Sent Events exist to
work around it.

The alternative model is **peer-to-peer**, where every node is both client and server
(BitTorrent, and most blockchain networks). It is not what we will be building.

### The omnipresence of the web

The browser has become the universal client. This is a genuinely unusual situation in
computing: one program, installed on effectively every device on earth, capable of running
applications delivered on demand with no installation step. The consequences:

- You write once and it runs everywhere — the promise Java made and the web delivered.
- Deployment means updating a server, not shipping an installer to users.
- But you are constrained by what browsers agree to support, which brings us to standards.

### Why standards matter

If every browser implemented HTML differently, the "write once, run everywhere" promise
collapses — and in the late 1990s it very nearly did. During the browser wars, Netscape and
Microsoft each added proprietary features, and developers shipped *two versions of every
site*, or the infamous "Best viewed in Internet Explorer" badge. We spent roughly a decade
recovering from this.

The bodies that prevent a repeat:

| Body | Responsible for |
|---|---|
| **IETF** | Internet-layer protocols: TCP/IP, HTTP, DNS. Publishes **RFCs**. |
| **W3C** | Web standards: CSS, accessibility, many web APIs. |
| **WHATWG** | The **HTML Living Standard** and the DOM. |
| **Ecma International** | **ECMAScript** — the JavaScript language specification (TC39). |

A note the slides do not make: HTML's home moved. The W3C and WHATWG split in 2004 over
whether HTML should be replaced by XHTML, and since 2019 the **WHATWG Living Standard is
the authoritative HTML specification**. If you find a W3C HTML5 "Recommendation" page, you
are reading a snapshot of history. Use <https://html.spec.whatwg.org> and
<https://developer.mozilla.org>.

**RFC** stands for "Request for Comments", a deliberately humble name from the ARPANET days
that stuck even though an RFC is now a finished standard. HTTP/1.1 is RFC 9110–9112; HTTP/2
is RFC 9113; HTTP/3 is RFC 9114.

---

## 5. Web technologies (slides 9–10)

### The two halves

**Frontend** is everything that runs on the user's machine, inside the browser: HTML, CSS,
JavaScript. You do not control the hardware, the browser version, the screen size or the
network quality. Everything here is a negotiation.

**Backend** is everything that runs on the server: application code, databases, and the
server software itself. You control it completely, and the user never sees it.

The line between them is the **network boundary**, and it has two consequences that beginners
consistently get wrong:

1. **Everything crossing the boundary is slow** — milliseconds at best, seconds at worst,
   compared with nanoseconds for a local function call. Design around round trips.
2. **Nothing on the frontend can be trusted.** The user can read every line of your
   JavaScript, modify it, and send whatever they like to your server. Frontend validation
   is a convenience for honest users; **security decisions belong on the backend, always.**

### Backend technologies (slide 10)

**Server-side languages** — Java, C#, Python, PHP, Go, Ruby, and JavaScript itself via
Node.js. The choice matters much less than beginners assume; all of them can serve HTTP.

**Databases** — where state lives, because the application process itself is usually
stateless and may be restarted at any moment.

- *Relational* (PostgreSQL, MySQL, SQL Server): data in tables with enforced relationships,
  queried with SQL. The default, correct choice for most applications.
- *Non-relational* (MongoDB, Redis, Cassandra): documents, key-value pairs or wide columns.
  Chosen for specific scaling or modelling reasons, not because they are "newer".

**Server software** — the process that actually listens on a TCP port and speaks HTTP:
nginx, Apache, IIS, or the HTTP server built into your runtime. Often a **reverse proxy**
sits in front of your application to handle TLS, compression, caching and load balancing.

**Static vs dynamic content** — the distinction that defines the backend's job:

|  | Static | Dynamic |
|---|---|---|
| What it is | A file on disk, sent as-is | Generated per request |
| Example | `logo.png`, `style.css` | A page showing *your* orders |
| Cost | Nearly free; trivially cached | CPU, database queries, time |
| Same for everyone? | Yes | No |

Modern architectures blur this deliberately — static site generators pre-render dynamic
content at build time to get static-file performance, which is one of the most effective
optimisations available.

---

## 6. HTTP and web servers (slides 11–14)

### What HTTP is

**HyperText Transfer Protocol** — a text-based, request–response protocol. The client sends
a request; the server sends exactly one response. That is the entire contract.

Two properties define everything about how the web is built:

**HTTP is stateless.** The server remembers nothing between requests. Each request arrives
with no inherent connection to the previous one. This is why cookies, sessions and tokens
exist: they are mechanisms bolted on to reconstruct identity across a protocol designed to
forget. Statelessness is a feature — it means any server in a pool can handle any request,
which is what makes horizontal scaling possible.

**HTTP is text-based** (through version 1.1). You can read it, type it by hand, and debug
it by eye. HTTP/2 and HTTP/3 are binary for efficiency, but preserve the same semantics —
the same methods, the same status codes, the same headers.

### The request–response cycle (slide 12)

What actually happens when you press Enter in the address bar:

1. **URL parsing** — the browser splits the URL into scheme, host, port, path and query.
2. **DNS resolution** — the hostname is turned into an IP address, consulting caches first.
3. **TCP connection** — a three-way handshake with the server. For HTTPS, a **TLS
   handshake** follows to negotiate encryption. This is pure latency before a single byte
   of content moves.
4. **HTTP request** — the browser sends the request line, headers, and optionally a body.
5. **Server processing** — routing, authentication, database queries, template rendering.
   This is the part you will write.
6. **HTTP response** — status line, headers, body.
7. **Client rendering** — parse HTML into the DOM, fetch referenced resources (each one a
   *new request*, back to step 1), build the render tree, lay out, paint.

Step 7 is why a single page view produces dozens of entries in the Network tab. Every
image, stylesheet, font and script is its own request-response cycle.

A raw request looks like this:

```http
GET /courses/internet-programming HTTP/1.1
Host: uacs.edu.mk
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64)
Accept: text/html,application/xhtml+xml
Accept-Language: en-US,en;q=0.9
```

And a response:

```http
HTTP/1.1 200 OK
Content-Type: text/html; charset=utf-8
Content-Length: 4096
Cache-Control: max-age=3600

<!DOCTYPE html>
<html>...
```

Note the structure of both: a first line, then headers, then a blank line, then an optional
body. The blank line is what separates headers from body, and it is mandatory.

### HTTP methods and their semantics (slide 13)

The method states your *intent*. Critically, **the protocol does not enforce it** — you can
write a `GET` handler that deletes a database. The semantics are a contract you are
expected to honour, and the entire web infrastructure assumes you have.

| Method | Purpose | Safe | Idempotent | Body |
|---|---|:---:|:---:|:---:|
| `GET` | Retrieve a resource | ✅ | ✅ | ✗ |
| `HEAD` | Like GET, headers only | ✅ | ✅ | ✗ |
| `OPTIONS` | Ask what is permitted | ✅ | ✅ | ✗ |
| `POST` | Submit data, create a subordinate | ✗ | ✗ | ✅ |
| `PUT` | Replace a resource entirely | ✗ | ✅ | ✅ |
| `PATCH` | Modify a resource partially | ✗ | ✗ | ✅ |
| `DELETE` | Remove a resource | ✗ | ✅ | ✗ |

Two terms you must internalise:

- **Safe** — the request does not change server state. A safe method can be prefetched,
  crawled by a search engine, or retried freely. *This is why "delete" links must never be
  plain `GET` links*: a crawler following every link on your page will delete your data.
  This has happened to real companies.
- **Idempotent** — making the request *N* times has the same effect as making it once.
  `DELETE /orders/5` twice leaves the order deleted either way. `POST /orders` twice creates
  **two orders** — which is precisely why refreshing a payment page shows "Confirm
  resubmission?", and why double-clicking a submit button can charge a card twice.

`PUT` vs `PATCH`: `PUT` sends the whole resource and replaces it. `PATCH` sends only the
change. Sending `{"email": "new@example.com"}` as a `PUT` means "this user now has *only*
an email and nothing else" — it is idempotent but destructive if you meant `PATCH`.

### Status codes (slide 14)

The first digit is the class, and it is the only part you must memorise:

| Class | Meaning | Who is responsible |
|---|---|---|
| **1xx** | Informational — still processing | — |
| **2xx** | Success | — |
| **3xx** | Redirection — look elsewhere | — |
| **4xx** | Client error — *you* sent something wrong | The client |
| **5xx** | Server error — the server broke | The server |

The 4xx/5xx distinction is the single most useful thing on this slide. A `404` means the
client asked for something that is not there; a `500` means the server has a bug. When
debugging, that first digit tells you which side to look at.

The ones worth knowing by name:

| Code | Name | When |
|---|---|---|
| `200` | OK | Standard success |
| `201` | Created | A `POST` created something new |
| `204` | No Content | Success, deliberately empty body |
| `301` | Moved Permanently | Permanent move — caches and search engines update |
| `302` / `307` | Found / Temporary Redirect | Temporary — do not update anything |
| `304` | Not Modified | Your cached copy is still valid. Saves enormous bandwidth |
| `400` | Bad Request | Malformed — the server cannot parse it |
| `401` | Unauthorized | You are not authenticated. *Misnamed — it means unauthenticated* |
| `403` | Forbidden | Authenticated, but not allowed |
| `404` | Not Found | No such resource |
| `405` | Method Not Allowed | The resource exists; that verb is not permitted on it |
| `409` | Conflict | State conflict, e.g. duplicate registration |
| `429` | Too Many Requests | Rate limited |
| `500` | Internal Server Error | Unhandled exception. Your bug |
| `502` | Bad Gateway | A proxy got nonsense from upstream |
| `503` | Service Unavailable | Overloaded or down for maintenance |
| `504` | Gateway Timeout | Upstream did not answer in time |

`401` versus `403` catches everyone: **401 = "I do not know who you are"**,
**403 = "I know exactly who you are, and no"**.

(And yes, `418 I'm a teapot` is real — RFC 2324, an April Fools' joke from 1998 that
several servers implement anyway.)

---

## 7. Frontend technologies (slides 15–18)

### The division of responsibility

The three frontend languages are not interchangeable, and keeping their jobs separate is
the foundation of maintainable frontend code:

| Technology | Responsibility | Answers |
|---|---|---|
| **HTML** | Structure and meaning | *What is this?* |
| **CSS** | Presentation | *What does it look like?* |
| **JavaScript** | Behaviour | *What does it do?* |

When these blur — styling hard-coded in HTML, content generated entirely in JavaScript —
the result becomes difficult to maintain, test, and make accessible.

### HTML (slide 16)

**Semantic markup** means choosing elements for what the content *is*, not how it should
look. `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>` all look
identical by default — they are visually indistinguishable from `<div>`. They matter
because:

- **Screen readers** use them to navigate. A blind user can jump directly to `<main>`.
- **Search engines** use them to understand the page.
- **Other developers** read them as documentation.

Writing `<div class="header">` instead of `<header>` throws all three benefits away for
nothing. Similarly, a clickable `<div>` is not a `<button>`: a real button is focusable,
keyboard-activatable, and announced as a button, all for free.

**Hyperlinks** are the web's defining invention — `<a href="...">`. The ability for any
document to reference any other, across machines and organisations, without coordination,
is what made the web a web rather than a collection of files.

**Forms** are how data flows from user to server. `<form>`, `<input>`, `<select>`,
`<textarea>`, `<button>`. A form's `method` attribute is the HTTP method from section 6,
and its `action` is the URL — this is where the frontend and HTTP meet directly.

**The DOM** (Document Object Model) is the crucial concept to carry into Class 02:

> The DOM is *not* your HTML. It is the live, in-memory tree the browser builds **from**
> your HTML — and which JavaScript can modify at any time.

Your HTML file is the initial state. After the page loads, the DOM may differ completely
from the file on disk. "View Source" shows you the file; the Elements tab in devtools shows
you the DOM. Beginners lose hours to this distinction.

### CSS (slide 17)

**Cascading** Style Sheets — the name describes the core mechanism. Many rules can target
the same element, and the cascade decides which wins, by:

1. **Importance** — `!important` overrides normal declarations (and should be a last resort)
2. **Specificity** — inline style > `#id` > `.class` > element
3. **Source order** — among equals, the last one declared wins

Most CSS confusion is specificity confusion: your rule is not "broken", it is losing to a
more specific one. Devtools shows you the winner and strikes through the losers.

**Selectors** target elements: by type (`p`), class (`.warning`), id (`#header`),
attribute (`[type="text"]`), relationship (`nav > li`), and state (`:hover`, `:focus`,
`:nth-child()`).

**The box model** — every element is a rectangle built of four nested layers:

```
┌───────────────────────── margin ─────────────────────────┐
│  ┌─────────────────────── border ──────────────────────┐ │
│  │  ┌───────────────────  padding ──────────────────┐  │ │
│  │  │                   content                     │  │ │
│  │  └───────────────────────────────────────────────┘  │ │
│  └─────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

By default, `width` sets the *content* width, so padding and border are added on top — set
`width: 200px` with `20px` padding and you get a 240px-wide element. Almost every codebase
therefore sets `box-sizing: border-box`, which makes `width` mean the total width, the way
you expected in the first place.

**Responsive design** — the same document must work on a 360px phone and a 2560px monitor.
The tools are relative units (`%`, `rem`, `vw`), flexible layout systems (Flexbox for one
dimension, Grid for two), and media queries that apply rules conditionally:

```css
@media (max-width: 600px) {
  .sidebar { display: none; }
}
```

### JavaScript (slide 18)

The subject of Class 02, previewed here by what it *does* in the browser:

- **DOM manipulation** — read and change the live page: add elements, change text, toggle
  classes.
- **Event handling** — run code in response to the user: clicks, typing, scrolling,
  submitting.
- **Asynchronous programming** — fetch data from a server without freezing the page.
  Essential because JavaScript is single-threaded: if your code blocks, the page stops
  responding entirely.

**Frameworks and libraries** exist because manually synchronising a complex DOM with
changing data is tedious and error-prone. They let you declare what the UI *should* look
like for given data, and handle the updating themselves.

| Frontend | Notes |
|---|---|
| **React** | Library, not a framework. Component-based. The largest ecosystem |
| **Angular** | Full framework. Opinionated, TypeScript-first, batteries included |
| **Vue** | Middle ground. Gentle learning curve |

| Backend | Notes |
|---|---|
| **Node.js** | The runtime that lets JavaScript run outside a browser |
| **Express** | A minimal HTTP framework for Node |

**Learn the platform before the framework.** Frameworks are a fast-moving fashion industry;
the ones dominant when you graduate may not be the ones you use in five years. HTTP, the
DOM, CSS and the JavaScript language itself have been stable for decades and transfer
everywhere. A developer who understands the platform learns any framework in a fortnight.
The reverse is not true.

---

## Further reading

- **MDN Web Docs** — <https://developer.mozilla.org> — the reference for HTML, CSS, JS and
  web APIs. Trustworthy and current; prefer it to random blog posts.
- **HTML Living Standard** — <https://html.spec.whatwg.org>
- **HTTP semantics, RFC 9110** — <https://www.rfc-editor.org/rfc/rfc9110.html>
- **High Performance Browser Networking**, Ilya Grigorik — free online, excellent on
  everything in sections 3 and 6.

---

*Internet Programming · UACS · Lecture 01*
