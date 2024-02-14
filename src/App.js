import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Sidebar from "./component/Sidebar";
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Sidebar />
    </QueryClientProvider>
  );
}
