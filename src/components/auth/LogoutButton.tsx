"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const logout = async () => {
    setIsLoading(true);
    const response = await fetch("/api/auth/logout", { method: "POST" });
    const result: { redirectTo?: string } = await response.json();

    router.push(result.redirectTo ?? "/login");
    router.refresh();
  };

  return (
    <Button
      type="button"
      variant="glass"
      className="font-bold"
      onClick={logout}
      disabled={isLoading}
    >
      {isLoading ? "Logging out..." : "Log Out"}
      <LogOut size={16} />
    </Button>
  );
}
