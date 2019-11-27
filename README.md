# What is this?

It is a sample application using Apollo Federation and React Apollo that illustrates the query batching and deduplication behavior of Apollo Federation. The frontend application is using `apollo-link-batch-http`. The services implement `dataloader` to illustrate how gateway will batch queries following the initial query.

# How do I install this?

Assuming node and npm are installed on your machine and this repository has been cloned.

```
cd server; npm install; npm run dev
# new tab
cd frontend; & npm install; & npm start
```

