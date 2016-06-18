---
title: RethinkDB
date: 2016-05-20
preview: I learned some stuff about Rethink...
collection: posts
---
Having never experienced working with a database, I was excited and nervous to start building a small analytics API powered by [Hapi.js](http://hapijs.com/), [RethinkDB](https://www.rethinkdb.com/) and [React](https://facebook.github.io/react/).

As RethinkDB is quite new, and my experience quite limited I plan on posting some of my struggles and documenting what I learn here. Starting with ReQL and the commands I struggled with, while including my eventual solution in the hopes that I remember a bit better and maybe even help someone else out.

### Querying the DB - You're not (exactly) writing JS
ReQL is mostly intuitive, however it took me a while to realize that all commands are executed on the server. So a command like the following,
```js
r.table('users')
  .get(userId)
    .run(conn,
      (err, cursor) => cursor.toArray(
        (err, result) => result
      )
    )
```
can be expanded upon, chained and won't run until it hits the server. Which means the patterning of the queries you write isn't *exactly* the way you would write it in your language of choice.
### A few sample Queries
#### 1. Filtering on multiple keys:
Say we've got a table `metrics` and you want to filter by both document ID and action type. Here's our table:
```js
{  id: "1",  action: "follow"},
{  id: "2",  action: "like",},
{  id: "1",  action: "like"},
{  id: "2",  action: "like",}
```
And we will get the table:
`r.table("metrics")`, chain a filter `.filter({ id: req.params.id })`
We can simply chain another filter on that
```
.filter({ action: "follow" })
```
, resulting in:
```
r.table("metrics").filter({ id: "1" }).filter({ action: "follow" })
```
and returning
```
{  id: "1",  action: "follow"}
```
alternatively you can write
```
r.table("metrics").filter({ id: "1", action: "follow" })
```
but I think embracing the chaining capabilities of ReQL early on allows you to understand the paradigm they are using and will give you less of a headache later.

#### 2. Push and Delete Array Items

This one was tough for me, and I ended up getting some help on the Slack forum. Luckily folks there were very patient and helpful. Here's our user object in a `user` table:
```
{  id: "aUser",  posts: [    "post1",    "post2",    "post3"  ]}
```
and to delete
`post2` we'll do this:
```
r.table("users").get("aUser").update((doc) => {   
  return {
    "posts": doc("posts").filter((item) => item.ne("post2")) }})
    .run(conn,
      (err, result) => {    
        if (err) { throw err };    
        reply({
          statusCode: 200,
          message: "post deleted",
          data: result    
        });
    })
```
The tough part here for me was that `.update()` receives 'doc' and I wasn't sure what that looked like. And since these commands get serialized, logging this to the terminal was a bit cryptic. The way I think of it now is that when you use the `.get(item)` method you are then passed a reference to one specific document in the table. So the next chained function is working on that item. The second challenge of this  command was that when you run something like `delete()` you are returned a value, but the document is not actually updated. You are simply writing a query for an array with a deleted item. Therefore
```
"posts": doc("posts").filter((item) => item.ne("post2"))
```
must be wrapped in the `.update()` method.
