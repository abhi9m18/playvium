import { Suspense } from "react";
import ProfilePageClient from "./ProfilePageClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-white p-10">Loading...</div>}>
      <ProfilePageClient />
    </Suspense>
  );
}
