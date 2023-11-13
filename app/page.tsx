// import AcmeLogo from "@/app/ui/acme-logo";
// import styles from "@/app/ui/home.module.css";
import { lusitana, roboto, signika } from "@/app/ui/fonts";
import Image from "next/image";
import Navbar from "./ui/navbar";

import Link from "next/link";
export default function Page() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <div className="mt-5 mx-auto justify-center items-center flex-col flex max-w-7xl gap-4">
        <div className="p-6 rounded-lg text-center w-1/2">
          <p
            className={`${signika.className} text-center text-6xl text-cyan-950`}
          >
            <strong>Nexa Climate</strong>
          </p>
          <p
            className={`${signika.className} leading-5 text-green-600 font-extrabold text-2xl my-5`}
          >
            Go Green, Earn Green
          </p>
          <p className={`${roboto.className} text-left`}>
            In an era prioritizing climate action, Nexa Climate leads in
            sustainability, focusing on often-missed scope 3 emissions. Join us
            in championing a future valuing progress and the planet. With Nexa
            Climate, your business becomes a symbol of positive change.
          </p>
        </div>
        <Link
          href="/login"
          className="flex items-center gap-4 self-center rounded-lg bg-black px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
        >
          <span>Let's Start</span>
        </Link>

        <div className="h-fit">
          <Image
            src="/landing.jpg"
            width={500}
            height={340}
            className="hidden md:block rounded-lg"
            alt="landing"
          />
        </div>
      </div>

      {/* <div className="mx-auto flex max-w-7xl grow flex-col gap-4 md:flex-row">
        <div className="flex flex-col justify-center items-center gap-6 rounded-lg bg-gray-50 px-6 py-10 md:w-2/5 md:px-20">
          <p className={`${lusitana.className} text-xl text-gray-800`}>
            <strong>Nexa Climate</strong>
          </p>
          <p
            className={`${lusitana.className} text-emerald-800 font-bold text-2xl`}
          >
            <em>Go Green, Earn Green</em>
          </p>
          <p>
            In an era prioritizing climate action, Nexa Climate leads in
            sustainability, focusing on often-missed scope 3 emissions. Join us
            in championing a future valuing progress and the planet. With Nexa
            Climate, your business becomes a symbol of positive change.
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span>
          </Link>
        </div>
        <div className="flex h-fit">
          <Image
            src="/landing.jpg"
            width={500}
            height={340}
            className="hidden md:block rounded-md"
            alt="landing"
          />
        </div>
      </div> */}
    </main>
  );
}
