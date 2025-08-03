import { useEffect, useRef, useState } from "react";

const BASE_URL = "https://jsonplaceholder.typicode.com";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export function Demo() {
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
      <h1>Fetching Data in React (with Abort Controller)</h1>
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
