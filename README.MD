# URL Shortener — Workflow

## Step 1: Configure Database Connection

First, we configure the database connection using **Mongoose**.

Install Mongoose:

```bash
npm i mongoose
```

To access variables from the `.env` file, we install `dotenv`:

```bash
npm install dotenv
```

Then we load the `.env` variables using:

```js
require("dotenv").config();
```

After that, we can access the variables using:

```js
process.env.VARIABLE_NAME
```

For connecting to MongoDB, we use `mongoose.connect()` with `async/await`. We create a separate `connectDB` function and export it so that we can use it in other files.

We also use `try/catch` to handle connection errors.

```js
const mongoose = require("mongoose");

require("dotenv").config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Database connected");
    }
    catch (error) {
        console.log("Failed to connect database");
    }
};

module.exports = connectDB;
```

---

## Step 2: Start the Server After Database Connection

After creating the `connectDB()` function, we call it first to connect to the database.

If the database connection is successful, `.then()` runs and we start the server using `app.listen()`.

If the database connection fails, `.catch()` runs and the server will not start.

So the idea is:

**First connect to the database → if successful, start the server.**

```js
connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log("Server started at " + port);
        });
    })
    .catch((error) => {
        console.log("Failed to connect to database");
    });
```

This ensures that the server starts only when the database connection is working.

---

## Step 3: Create the URL Shortening Form

On the frontend, we create a form where the user enters the original URL.

```html
<form method="POST" action="/url">
    <div class="input-wrap">
        <span class="input-icon">🌐</span>

        <input
            type="url"
            name="url"
            placeholder="https://example.com/very-long-url-to-shorten"
            required
            autocomplete="off"
        >
    </div>

    <button type="submit">
        Shorten URL
    </button>
</form>
```

The important parts are:

```html
method="POST"
action="/url"
```

This means when the user clicks **Shorten URL**, the browser sends a **POST request to `/url`**.

The input has:

```html
name="url"
```

So the value entered by the user will be available as:

```js
req.body.url
```

---

## Step 4: Parse Form Data in Express

Since the form sends data using the POST method, Express needs middleware to read the form data.

```js
app.use(express.urlencoded({ extended: false }));
```

Now, if the user enters:

```text
https://google.com/some/long/url
```

and submits the form, Express receives:

```js
req.body
```

as something like:

```js
{
    url: "https://google.com/some/long/url"
}
```

So we can get the original URL using:

```js
req.body.url
```

---

## Step 5: Handle the POST `/url` Request

The `/url` route receives the original URL from the form.

The basic workflow is:

```text
User enters original URL
        ↓
Clicks Shorten URL
        ↓
POST /url
        ↓
Express receives req.body.url
        ↓
Generate a short ID
        ↓
Store original URL + short ID in MongoDB
        ↓
Return/render the shortened URL
```

For example:

```js
app.post("/url", async (req, res) => {
    const originalUrl = req.body.url;

    // generate short ID

    // save original URL and short ID to database

    // send response
});
```

---

## Step 6: Generate a Unique Short ID

The original URL is long, so we generate a short unique ID for it.

For example:

```text
Original URL:
https://www.google.com/search?q=javascript

Short ID:
-8C-rAxc
```

The database can store something like:

```js
{
    shortId: "-8C-rAxc",
    redirectURL: "https://www.google.com/search?q=javascript"
}
```

The short ID is what the user will use in the shortened URL.

---

## Step 7: Store the URL in MongoDB

After generating the short ID, we save the data in MongoDB using a Mongoose model.

The basic data flow is:

```text
POST /url
   ↓
req.body.url
   ↓
Generate short ID
   ↓
Create MongoDB document
   ↓
Save document
```

The database contains the relationship:

```text
shortId  →  original URL
```

For example:

```text
abc123 → https://google.com
xyz789 → https://youtube.com
```

---

## Step 8: Redirect Using the Short ID

When someone visits the shortened URL:

```text
http://localhost:8001/url/abc123
```

the browser sends a request to:

```text
GET /url/abc123
```

The server gets the short ID from the URL parameter:

```js
req.params.id
```

Then it searches MongoDB for that short ID.

```text
GET /url/abc123
        ↓
req.params.id = "abc123"
        ↓
Search MongoDB
        ↓
Find original URL
        ↓
Redirect user
        ↓
https://google.com
```

This is why the short URL doesn't directly contain the original URL. The server uses the short ID to **look up the original URL in the database**.

---

# Overall URL Shortener Workflow

```text
                USER
                  ↓
        Enters original URL
                  ↓
          Clicks Shorten URL
                  ↓
            POST /url
                  ↓
            req.body.url
                  ↓
        Generate unique short ID
                  ↓
        Save to MongoDB using
              Mongoose
                  ↓
          Return short URL
                  ↓
        http://localhost:8001/url/abc123
                  ↓
          User opens short URL
                  ↓
            GET /url/abc123
                  ↓
          req.params.id = abc123
                  ↓
        Search MongoDB for abc123
                  ↓
          Get original URL
                  ↓
             res.redirect()
                  ↓
       Original website opens
```

### Main concepts you've covered so far

1. **MongoDB** — stores the URL data.
2. **Mongoose** — connects Node.js to MongoDB and provides models.
3. **dotenv** — loads `.env` variables.
4. **Express middleware** — reads form data.
5. **POST `/url`** — receives the original URL.
6. **`req.body.url`** — gets the URL submitted from the form.
7. **Short ID** — identifies the original URL.
8. **MongoDB lookup** — finds the original URL using the short ID.
9. **`req.params.id`** — gets the short ID from the URL.
10. **`res.redirect()`** — sends the user to the original URL.
