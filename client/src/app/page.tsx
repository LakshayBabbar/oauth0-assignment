import { auth0 } from "@/lib/auth0";
import './globals.css';
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

export default async function Home() {
  const session = await auth0.getSession();

  const RoutesLinks: {
    name: string;
    href: string;
    className?: string;
  }[] = [
      { name: "Admin Page", href: "/admin" },
      { name: "Protect API Route (Profile Data)", href: "/api/profile" },
      { name: "Public API Route", href: "/api/public" },
    ];

  if (session) {
    RoutesLinks.push({ name: "Logout", href: "/auth/logout", className: "bg-red-700 text-white" },);
  } else {
    RoutesLinks.push({ name: "Login", href: "/auth/login" });

  }

  const userImage = session?.user.picture?.includes("gravatar") ? "/user.webp" : session?.user.picture;

  return (
    <main className="place-items-center w-full text-white">
      <BackgroundGradientAnimation className="flex items-center justify-center">
        <section className="mt-20 p-6 w-11/12 sm:w-4/5 lg:w-2/4 space-y-6 z-1">
          <h1 className="text-6xl font-bold py-2 bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-white/80 to-white/20">
            Auth0 Assignment Project App
          </h1>
          <div className="flex flex-wrap gap-4 w-full">
            {
              RoutesLinks.map((route, idx) => {
                return (<Link key={idx} href={route.href} className={cn("py-3 px-5 rounded text-white bg-[#00000075]", route?.className)}>{route.name}</Link>)
              })
            }
          </div>
          <hr />
          <div>
            {!session ? <p className="text-xl">Please Login to see your profile</p> : <div className="flex gap-4 items-center">
              <Image src={userImage || ""} width={50} height={50} alt="Profile Pic" className="rounded-full" priority />
              <div>
                <h2 className="font-bold">{session.user.name}</h2>
                <p className="text-gray-200">{session.user.email}</p>
              </div>
              <p></p>
            </div>}
          </div>
        </section>
      </BackgroundGradientAnimation>
    </main>
  );
}