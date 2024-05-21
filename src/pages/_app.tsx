import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import ScrollButton from "@/components/ScrollButton/ScrollButton";
import "@/styles/globals.css";

import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(new QueryClient());
  const router = useRouter();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={pageProps.dehydratedState}>
          {router?.pathname !== "/login" && <Header />}
          <Component {...pageProps} />
          {router?.pathname !== "/login" && <Footer />}
        </HydrationBoundary>
      </QueryClientProvider>
    </>
  );
}
