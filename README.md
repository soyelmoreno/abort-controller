# Fetching Data in React

Following along with these tutorials:

[Fetching Data in React - Complete
Tutorial](https://www.youtube.com/watch?v=00lxm_doFYw)

[Modern Data Fetching in React (Complete
Guide)](https://www.youtube.com/watch?v=MBlZ8Wzkbi4)

by Cosden Solutions

## Approach 1: Manual

First there is a "manual" data fetching example, i.e., we handle these things
ourselves:

- fetching
- isLoading
- error
- abort controller

A library like React Query will handle all of this for us. The purpose of this
exercise is to gain familiarity with the low-level operations so we can
understand what React Query is doing for us.

The big new thing here is the [JavaScript AbortController
API](https://developer.mozilla.org/en-US/docs/Web/API/AbortController). It
provides a mechanism to abort ongoing asynchronous operations such as network
requests. This lets us prevent race conditions.

For example, if the user loads posts, then quickly loads the next page of posts,
and the first request gets delayed, and the second page loads quickly...we don't
want the posts loaded by the second request to be clobbered when the first
request finally comes back. So for every request, we can first abort any
previous request.

## Approach 2: React Query

Then there is a "modern" data fetching example. We use React Query to handle all
these things for us.

## Approach 3: Server Component

There is also a "server" example, using a React Server Component wrapped in a
`<Suspense>`. But I couldn't get it because I don't have a server component
framework running (like Next.js).
