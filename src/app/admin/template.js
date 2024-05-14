"use client";

import Sidebar from "@/components/Sidebar";
import { Suspense } from "react";
import Loading from "@/app/admin/loading.jsx";

export default function Layout({ children }) {
  return (
    <div className="grid h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] ">
      <Sidebar />
      <div className="flex flex-col flex-1">
        <Suspense fallback={<Loading />}>
          <main className="flex-1 p-6">{children}</main>
        </Suspense>
      </div>
    </div>
  );
}
