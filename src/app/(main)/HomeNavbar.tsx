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


  return (
    <header className="fixed top-0 left-0 w-full bg-transparent shadow-sm z-50">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 p-4 backdrop-blur-md ">
        <Link href="/resumes" className="flex items-center gap-2">
          <Gavel />
          <span className="text-[20px] font-extrabold tracking-tight text-zinc-200 bg-clip-text text-transparent">
            ResumeSMITH
          </span>
        </Link>
        <div className="border-y-2 py-1.5 items-center ">
        <Button
          asChild
          size="lg"
          variant="ghost"
          className="w-12 h-6 text-xs  mx-1 tracking-tight "
        >
          <Link href="/resumes" className="bg-gradient-to-r from-red-200 to-zinc-100 bg-clip-text text-transparent">Features</Link>
        </Button>
        <Button
          asChild
          size="lg"
          variant="ghost"
          className="w-12 h-6 text-xs  mx-1 tracking-tight font-light"
        >
          <Link href="/resumes">FEATURES</Link>
        </Button>
        <Button
          asChild
          size="lg"
          variant="ghost"
          className="w-12 h-6 text-xs  mx-1 tracking-tighter font-extralight"
        >
          <Link href="/resumes">Features</Link>
        </Button>
        </div>
        <Button
          asChild
          size="lg"
          variant="outline"
          className="w-12 rounded-full text-xs tracking-tighter border-2"
        >
          <Link href="/resumes">LOGIN</Link>
        </Button>
        
      </div>
    </header>
  );
};

export default HomeNavbar;
