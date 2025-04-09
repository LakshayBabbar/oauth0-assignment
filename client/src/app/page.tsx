import { auth0 } from "@/lib/auth0";
import './globals.css';
import Link from "next/link";
import { cn } from "@/lib/utils";
import Image from "next/image";

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
    <main className="place-items-center w-full">
      <section className="mt-24 rounded shadow-md bg-slate-50 p-6 w-1/2 space-y-4">
        <h1 className="text-3xl font-semibold text-gray-900 mb-6">
          Auth0 Assignment Project App
        </h1>
        <div className="flex flex-wrap gap-4 w-full">
          {
            RoutesLinks.map((route, idx) => {
              return (<Link key={idx} href={route.href} className={cn("py-2 px-4 bg-slate-200 rounded ", route?.className)}>{route.name}</Link>)
            })
          }
        </div>
        <hr />
        <div>
          {!session ? <p className="text-xl">Please Login to see your profile</p> : <div className="flex gap-4 items-center">
            <Image src={userImage || ""} width={50} height={50} alt="Profile Pic" className="rounded-full" priority />
            <div>
              <h2>{session.user.name}</h2>
              <p className="text-gray-500">{session.user.email}</p>
            </div>
            <p></p>
          </div>}
        </div>
      </section>
    </main>
  );
}