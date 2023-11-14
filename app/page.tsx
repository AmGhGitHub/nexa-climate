// import AcmeLogo from "@/app/ui/acme-logo";
// import styles from "@/app/ui/home.module.css";
import { roboto, signika } from "@/components/fonts";
import Navbar from "@/components/navbar";
import Image from "next/image";

import { Button } from "@/components/ui/button";

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
        <Button asChild>
          <Link href="/login">Get Start</Link>
        </Button>

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
    </main>
  );
}
