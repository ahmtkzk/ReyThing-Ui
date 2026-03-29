"use client";

import { Outlet, ScrollRestoration } from "react-router-dom";
import { Header } from "./header";
import { Footer } from "./footer";

export function AppLayout() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </>
  );
}
