import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { DemoManual } from "./DemoManual";
import { DemoModern } from "./DemoModern";
import { DemoServer } from "./DemoServer";
import { Suspense } from "react";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      {/* Example 1 */}
      {/* <DemoManual /> */}

      {/* Example 2 */}
      <QueryClientProvider client={queryClient}>
        <DemoModern />
      </QueryClientProvider>

      {/* Example 3 */}
      {/* <Suspense fallback={<div>Loading...</div>}>
        <DemoServer />
      </Suspense> */}
    </>
  );
}

export default App;
