"use client"

import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/assets/logo.png";
import { UserButton } from "@clerk/nextjs";
import { CreditCard } from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import {dark} from "@clerk/themes";
import { useTheme } from "next-themes";


const Navbar = () => {
  const {theme} = useTheme();
 
  return (
    <header className="shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 p-2">
        <Link href="/resumes" className="flex items-center gap-2">
          <Image
            src={logo}
            alt="logo"
            width={32}
            height={25}
            className="rounded-full"
          />
          <span className="text-[18px] font-bold tracking-tight">
            AI Resume Builder
          </span>
        </Link>
        <div className="flex items-center gap-3">
        <ThemeToggle/>
        
        <UserButton 
        appearance={{
          baseTheme:theme=== "dark"? dark :undefined,
            elements:{
                avatarBox :{
                    width:32,
                    height:32,
                }
            }
        }}>
            <UserButton.MenuItems>
                <UserButton.Link
                label="Billing"
                labelIcon={<CreditCard className = "size-4"/>}
                href="/billing"
                >

                </UserButton.Link>
            </UserButton.MenuItems>
        </UserButton>
        </div>
      </div>
    </header>
  );
};

export default Navbar;


// "use client";

// import logo from "@/assets/logo.png";
// import ThemeToggle from "@/components/ThemeToggle";
// import { UserButton } from "@clerk/nextjs";
// import { dark } from "@clerk/themes";
// import { CreditCard } from "lucide-react";
// import { useTheme } from "next-themes";
// import Image from "next/image";
// import Link from "next/link";

// export default function Navbar() {
//   const { theme } = useTheme();

//   return (
//     <header className="shadow-sm">
//       <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 p-3">
//         <Link href="/resumes" className="flex items-center gap-2">
//           <Image
//             src={logo}
//             alt="Logo"
//             width={35}
//             height={35}
//             className="rounded-full"
//           />
//           <span className="text-xl font-bold tracking-tight">
//             AI Resume Builder
//           </span>
//         </Link>
//         <div className="flex items-center gap-3">
//           <ThemeToggle />
//           <UserButton
//             appearance={{
//               baseTheme: theme === "dark" ? dark : undefined,
//               elements: {
//                 avatarBox: {
//                   width: 35,
//                   height: 35,
//                 },
//               },
//             }}
//           >
//             <UserButton.MenuItems>
//               <UserButton.Link
//                 label="Billing"
//                 labelIcon={<CreditCard className="size-4" />}
//                 href="/billing"
//               />
//             </UserButton.MenuItems>
//           </UserButton>
//         </div>
//       </div>
//     </header>
//   );
// }