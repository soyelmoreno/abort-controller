"use server";

const BASE_URL = "https://jsonplaceholder.typicode.com";

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

/*
For a React server component, the JSX will be processed and only HTML will be
sent down to the client. So we don't need to do things like useEffect when
making a fetch call...we can just await it.

There's no loading, no pending, errors are handled, there are no UI buttons,
there is no state, there is no rerendering. And also there are no dependencies.
This reduces complexity. Do server components when you can.

You do lose the "Loading..." functionality. So you wrap this server component in
a <Suspense> component so that something shows while this component generates on
the server.
*/

export async function DemoServer() {
  const response = await fetch(`${BASE_URL}/posts`);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }
  const posts = (await response.json()) as Post[];
  console.log("Fetched posts");

  return (
    <>
      <h1>Fetching Data in React (on the Server)</h1>
      <ul className="flex flex-col gap-2">
        {posts.map(({ userId, id, title, body }: Post) => (
          <li key={id} className="border rounded bg-zinc-50 p-1">
            <p>User: {userId}</p>
            <p>Title: {title}</p>
            <p>{body}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
