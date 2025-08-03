import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const BASE_URL = "https://jsonplaceholder.typicode.com";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

async function fetchPosts(page: number) {
  const response = await fetch(`${BASE_URL}/posts?page=${page}`);
  const data = (await response.json()) as Post[];
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("Fetched posts for page", page);
  return data;
}

/*
This is "modern" or "better" way to fetch data. Use React Query to handle all
the stuff for you.
*/

export function DemoModern() {
  const [page, setPage] = useState(0);

  const {
    data: posts,
    isPending,
    isError,
  } = useQuery({
    queryFn: () => fetchPosts(page),
    queryKey: ["posts", { page }],
    // slateTime: 1000,
    // gcTime: Infinity
  });

  if (isError) {
    return <div>Something went wrong. Please try again.</div>;
  }

  return (
    <>
      <h1>Fetching Data in React (Modern)</h1>
      <div className="p-2 rounded border mb-4">
        <p>Current page: {page}</p>
        <div className="flex gap-4">
          <button onClick={() => setPage(page - 1)} disabled={page === 0}>
            Fetch Previous Page
          </button>
          <button onClick={() => setPage(page + 1)} disabled={page === 5}>
            Fetch Next Page
          </button>
        </div>
      </div>
      {isPending && <div>Loading...</div>}
      {!isPending && (
        <ul className="flex flex-col gap-2">
          {posts?.map(({ userId, id, title, body }: Post) => (
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
