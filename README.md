# What is this?

It is a sample application using Apollo Federation and React Apollo that illustrates the query batching and deduplication behavior of Apollo Federation. The frontend application is using `apollo-link-batch-http`. The services implement `dataloader` to illustrate how gateway will not be able to take advantage of the batch functions for the initial queries. To see how gateway batches subsequent request uncomment `frontend/src/components/ListItem.js:13`.

# How do I install this?

Assuming node and npm are installed on your machine and this repository has been cloned.

```
cd server; npm install; npm run dev
# new tab
cd frontend; & npm install; & npm start
```

