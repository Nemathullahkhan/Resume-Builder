"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/assets/logo.png";
import { UserButton } from "@clerk/nextjs";
import { CreditCard, Gavel } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

const HomeNavbar = () => {
  const { theme } = useTheme();

  return (
    <header className="fixed top-0 left-0 w-full bg-transparent shadow-sm z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 p-4 backdrop-blur-md">
        <Link href="/resumes" className="flex items-center gap-2">
          <Gavel />
          <span className="text-[20px] font-extrabold tracking-tight text-zinc-200 bg-clip-text text-transparent">
            ResumeSMITH
          </span>
        </Link>
        <Button
          asChild
          size="lg"
          variant="outline"
          className=""
        >
          <Link href="/resumes">Login</Link>
        </Button>
        <div className="flex items-center gap-3">
          <UserButton
            appearance={{
              baseTheme: theme === "dark" ? dark : undefined,
              elements: {
                avatarBox: {
                  width: 32,
                  height: 32,
                },
              },
            }}
          >
            <UserButton.MenuItems>
              <UserButton.Link
                label="Billing"
                labelIcon={<CreditCard className="size-4" />}
                href="/billing"
              ></UserButton.Link>
            </UserButton.MenuItems>
          </UserButton>
        </div>
      </div>
    </header>
  );
};

export default HomeNavbar;
