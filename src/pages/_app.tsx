import type { AppProps } from "next/app";
import "antd/dist/reset.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
export default function MyApp({ Component, pageProps }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            {" "}
            <Component {...pageProps} />
        </QueryClientProvider>
    );
}
