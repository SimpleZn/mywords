import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { SWRConfig as SWRConfigProvider, SWRConfiguration } from "swr";
import "./tailwind.css";

import { Sidebar } from "./components/SiderBar";
import { MainContent } from "./components/MainContent";

const FixedHeader = () => {
  return (
    <header className="fixed top-0 w-full bg-white shadow h-16">
      <div className="container mx-auto px-4 flex items-center justify-between h-full">
        <h1 className="text-2xl font-bold">Fixed Header</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="#">Link 1</a>
            </li>
            <li>
              <a href="#">Link 2</a>
            </li>
            <li>
              <a href="#">Link 3</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

const NewPage = () => {
  const SWROptions = useMemo<SWRConfiguration>(
    () => ({
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      shouldRetryOnError: false,
      onError: (error) => {
        console.error("SWR error:", error);
      },
    }),
    []
  );
  return (
    <SWRConfigProvider value={SWROptions}>
      <div className="flex flex-col min-h-screen overflow-hidden bg-gray-200">
        {/* <FixedHeader /> */}
        <div className="flex flex-1">
          <Sidebar />
          <MainContent />
        </div>
      </div>
    </SWRConfigProvider>
  );
};

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <NewPage />
  </React.StrictMode>
);
