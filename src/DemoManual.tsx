import { useEffect, useRef, useState } from "react";

const BASE_URL = "https://jsonplaceholder.typicode.com";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

/*
This is "manual" or "naive" way to fetch data. Not recommended to do things
this way in a project today. But, it's important to know these pieces of
functionality to understand what is happening in more modern approaches.

Drawbacks to naive approach:
1. You have to write everything yourself. Managing state variables, getting
   useEffect dependencies right, etc. Easy to miss things and have bugs.
2. There is no caching. If we go from page 1 to page 2 and back to page 1, we'll
   hit the backend again, even though we recently fetched page 1. Implementing
   cache manually would be challenging.
3. Even if we implement caching, and we show results from the cache, ideally we
   would also want background refetching to refresh the data in case there are
   new results on the server.

Exception: if you are new to React, and/or you've never done data fetching
before, then learn this manual approach! It's good for learning. Then, later,
you would move on to something better.
*/

export function DemoManual() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [page, setPage] = useState(0);

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      // To prevent a race condition, any time we fire a network request, cancel
      // or abort any previous requests.
      abortControllerRef.current?.abort();
      abortControllerRef.current = new AbortController();

      setIsLoading(true);

      try {
        const response = await fetch(`${BASE_URL}/posts?page=${page}`, {
          signal: abortControllerRef.current?.signal,
        });
        const data = (await response.json()) as Post[];
        setPosts(data);
      } catch (error: any) {
        if (error.name === "AbortError") {
          console.log("Previous request aborted");
          return;
        }

        setError(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPosts();
  }, [page]);

  if (error) {
    return <div>Something went wrong. Please try again.</div>;
  }

  return (
    <>
      <h1>Fetching Data in React (Manual)</h1>
      <h2> (includes Abort Controller!)</h2>
      <button onClick={() => setPage(page + 1)}>Fetch Next Page</button>
      <p>Current page: {page}</p>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <ul className="flex flex-col gap-2">
          {posts.map(({ userId, id, title, body }: Post) => (
            <li key={id} className="border rounded bg-zinc-50 p-1">
              <p>User: {userId}</p>
              <p>Title: {title}</p>
              <p>{body}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
