// import logo from "@/assets/logo.png";

// import image from "@/assets/jakes-resume-1.png";
// import { Button } from "@/components/ui/button";
// import Image from "next/image";
// import Link from "next/link";
// import HomeNavbar from "./(main)/HomeNavbar";
// import { Pencil, Save, UserRoundPen } from "lucide-react";

// export default function Home() {
//   return (
//     <>
//       <HomeNavbar />
//       <main className="relative flex min-h-screen flex-col items-center justify-center gap-6 bg-black-100 px-5 py-64 text-center text-zinc-100 lg:gap-12 overflow-hidden">

//         <div className="pl-5 absolute top-0 left-0 w-full grid grid-cols-[repeat(auto-fill,_64px)] grid-rows-[repeat(auto-fill,_64px)] ">
//   {Array.from({ length: 271 }).map((_, i) => (
//     <div
//       key={i}
//       className={`w-[64px] h-[64px] bg-transparent ${
//         i >= 105 // For the last 20 squares
//           ? "border-l border-zinc-800/40" // Only Y-axis border
//           : "border border-zinc-900/40" // Full border for other squares
//       }`}
//     ></div>
//   ))}
// </div>

//         {/* Heading */}
//         <div className="max-w-prose space-y-3 z-10">
//           <h1 className="scroll-m-20 text-4xl font-bold tracking-tight lg:text-5xl">
//             Create the{" "}
//             <span className="inline-block bg-gradient-to-r from-red-200 to-blue-300 bg-clip-text text-transparent">
//               Perfect Resume
//             </span>{" "}
//             in Minutes
//           </h1>
//           <p className="text-md text-zinc-600">
//             Our <span className="font-bold">AI resume builder</span> helps you
//             design a professional resume
//           </p>
//           <p className="text-2xl font-bold tracking-tighter text-zinc-600">
//             Get Noticed. Get Hired. Get Ahead.
//           </p>
//         </div>

//         {/* Image with Silver Shine Glow */}
//         <div className="relative z-10 mt-4">
//           <div className="absolute inset-0 rounded-sm bg-gradient-to-r from-red-300 via-gray-800 to-blue-300 blur-2xl"></div>
//           <Image
//             src={image}
//             alt="Resume preview"
//             width={400}
//             className="relative rounded-lg shadow-[0_0_30px_10px_rgba(192,192,192,0.5)]"
//           />
//         </div>

//         {/* Button */}
//         <Button
//           asChild
//           size="lg"
//           variant="outline"
//           className="hover:border-red-200 hover:font-bold tracking-tighter hover:shadow-red-700 border-blue-200 text-blue-100 hover:text-sm hover:text-white z-10 shadow-xl shadow-blue-800"
//         >
//           <Link href="/resumes">Get started</Link>
//         </Button>

//         <div className="flex flex-col text-zinc-100 w-2/4">
//           <span className="w-1/4 h-1 mx-auto m-16 shadow-red-800 z-10 shadow-2xl bg-transparent ">
//           <span className="z-0 bg-slate-50 w-full h-1 bg-white"></span>
//           </span>
//           <span className=" text-[32px]  tracking-tighter font-extrabold shadow-red-800 z-10 shadow-2xl bg-transparent shadow-red-80  p-2 rounded-2xl">THE PROCESS</span>
//           <div className="flex flex-col mt-16 z-50">
//           <span className="text-xl md:text-2xl font-bold  tracking-tight">Three steps to build your </span>
//           <span className="font-extralight tracking-tighter text-xl md:text-[28px]">Professional Resume</span>
//           </div>
//         </div>
//         <div className="flex justify-center  w-full">
//             <div className="flex px-20 gap-12 grid-flow-row grid-col-3 md:grid-cols-1 ">
//                 <div className="flex flex-col w-[30%] border-2 border-white p-3">
//                 <UserRoundPen />
//                 <span className="flex justify-start text-md tracking-tighter">SignUp</span>
//                 <p className="flex justify-start text-xs text-zinc-600">
//             Create a free account to get started with  <span className="px-1 font-bold">ResumeSMITH</span>
//           </p>
//                 </div>
//                 <div className="flex flex-col w-[30%] border-2 border-white px-5">
//                 <Pencil />
//                 <span className="flex justify-start text-md tracking-tighter px-3">Craft</span>
//                 <p className="flex justify-start text-xs text-zinc-600">
//                 Enter your details, and let the AI craft a tailored, professional resume for you in seconds!
//           </p>
//                 </div>
//                 <div className="flex flex-col w-[30%] border-2 border-white p-3">
//                 <Save />
//                 <span className="flex justify-start text-md tracking-tighter">Save</span>
//                 <p className="flex justify-start text-xs text-zinc-600">
//                 Save, download, and share your professional A4-format resume with job applications!
//           </p>
//                 </div>

//             </div>
//           </div>
//       </main>
//     </>
//   );
// }

"use client"; // Required to make this a Client Component

import logo from "@/assets/logo.png";
import image from "@/assets/jakes-resume-1.png";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import HomeNavbar from "./(main)/HomeNavbar";
import { Pencil, Save, UserRoundPen } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";



export default function Home() {
   const{isSignedIn}=useUser();

  return (
    <>
     {isSignedIn && (
      redirect("/resumes")
     )}
      <HomeNavbar />
      <main className="bg-black-100 relative flex min-h-screen flex-col items-center justify-center gap-8 overflow-hidden px-4 py-32 text-center text-zinc-100 sm:gap-12 md:px-8 lg:py-48">
        <div className="absolute left-0 top-0 grid w-full grid-cols-[repeat(auto-fill,_64px)] grid-rows-[repeat(auto-fill,_64px)] pl-5">
          {Array.from({ length: 271 }).map((_, i) => (
            <div
              key={i}
              className={`h-[64px] w-[64px] bg-transparent ${
                i >= 105 // For the last 20 squares
                  ? "border-l border-zinc-800/40" // Only Y-axis border
                  : "border border-zinc-900/40" // Full border for other squares
              }`}
            ></div>
          ))}
        </div>

        {/* Heading Section */}
        <div className="z-10 max-w-prose space-y-4">
          <h1 className="scroll-m-20 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Create the{" "}
            <span className="inline-block bg-gradient-to-r from-red-200 to-blue-300 bg-clip-text text-transparent">
              Perfect Resume
            </span>{" "}
            in Minutes
          </h1>
          <p className="sm:text-md text-sm text-zinc-400">
            Our <span className="font-bold">AI resume builder</span> helps you
            design a professional resume
          </p>
          <p className="text-lg font-bold text-zinc-400 sm:text-xl">
            Get Noticed. Get Hired. Get Ahead.
          </p>
        </div>
        {/* Get Started Button */}
        <Button
          asChild
          size="lg"
          variant="outline"
          className="z-10 border-zinc-200 text-blue-100 shadow-xl hover:border-blue-200 hover:font-bold hover:text-blue-200 hover:shadow-blue-700 -mt-4"
        >
          <Link href="/resumes">Get started</Link>
        </Button>

        {/* Image with Silver Shine Glow */}
        <div className="relative z-10 mt-6">
          <div className="absolute inset-0 rounded-sm bg-gradient-to-r from-red-300 via-gray-800 to-blue-300 blur-2xl"></div>
          <Image
            src={image}
            alt="Resume preview"
            width={400}
            height={500}
            className="relative rounded-lg shadow-[0_0_30px_10px_rgba(192,192,192,0.5)]"
          />
        </div>

        

        {/* Process Section */}


        <div className="flex w-full flex-col items-center space-y-4 mt-24 text-zinc-100 sm:space-y-6">
          <div className="relative mx-auto h-1 w-2/4 bg-red-900 shadow-[0_0_125px_20px_rgba(180,0,0,0.8)]">
            <div className="blur- absolute inset-0 h-full w-full  bg-red-800 "></div>
          </div>
          <div className="process-heading pt-[60px] text-2xl font-extrabold tracking-tight sm:text-3xl">
            THE PROCESS
          </div>

          
          <div className="mt-8 flex flex-col space-y-2">
            <span className="text-lg font-bold sm:text-xl">
              Three steps to build your
            </span>
            <span className="text-xl font-light sm:text-2xl">
              Professional Resume
            </span>
          </div>
        </div>

        {/* Steps Section */}
        <div className="mt-12 grid grid-cols-1 gap-6 px-8 md:grid-cols-3 lg:gap-4 lg:px-32">
          {/* Step 1: Sign Up */}
          <div className="mx-auto flex w-2/4 flex-col items-center rounded-lg border hover:border-2 hover:border-red-500 border-red-400 hover:bg-zinc-900 hover:shadow-2xl hover:shadow-red-800 p-4 text-center text-sm">
            <UserRoundPen className="mb-2" />
            <span className="font-semibold">Sign Up</span>
            <p className="mt-1 text-xs text-zinc-400">
              Create a free account to get started with{" "}
              <span className="font-bold">ResumeSMITH</span>.
            </p>
          </div>

          {/* Step 2: Craft */}
          <div className="mx-auto flex w-2/4 flex-col items-center rounded-lg border border-zinc-500  hover:border-white  hover:bg-zinc-900 hover:shadow-2xl hover:shadow-zinc-600 p-4 text-center text-sm">
            <Pencil className="mb-2" />
            <span className="font-semibold">Craft</span>
            <p className="mt-1 text-xs text-zinc-400">
              Enter your details, and let the AI craft a tailored, professional
              resume for you in seconds!
            </p>
          </div>

          {/* Step 3: Save */}
          <div className="mx-auto flex w-2/4 flex-col items-center rounded-lg border border-blue-200 hover:border-2 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-800 hover:bg-zinc-900 p-4 text-center text-sm">
            <Save className="mb-2" />
            <span className="font-semibold">Save</span>
            <p className="mt-1 text-xs text-zinc-400">
              Save, download, and share your professional A4-format resume with
              job applications!
            </p>
          </div>
        </div>

        <div className="flex w-full flex-col items-center mt-20 space-y-4 text-zinc-100 sm:space-y-6">

          <div className="relative  h-1 w-2/4 bg-red-600 shadow-[0_0_105px_40px_rgba(255,0,0,0.8)]">
            <div className="blur- absolute inset-0 h-full w-full animate-pulse bg-red-100 opacity-80"></div>
          </div>
          <div className="process-heading pt-[60px] text-2xl font-extrabold tracking-tight sm:text-3xl">
            THE PROCESS
          </div>
        </div>

      </main>
    </>
  );
}
