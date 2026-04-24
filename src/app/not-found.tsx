"use client";

import EmptyStatePage from "@/components/EmptyStatePage";
import { nothinghereyet ,somethingentwrong , noresultfound , notfound } from "@/assets/icons";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-[#0F131A] px-6">
      <EmptyStatePage
        type="notFound"
        image={notfound}
        title="404 – Page Not Found"
        description="The page you are looking for doesn’t exist or has been moved."
        actionText="Go Back Home"
        onAction={() => router.push("/")}
      />
    </div>
  );
}
