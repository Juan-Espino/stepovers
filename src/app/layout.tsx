import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist, Bebas_Neue, Syne } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import NavBar from "./_navbar/navbar";
import Footer from "./_footer/footer";
import Blob from "./_components/blob";

export const metadata: Metadata = {
  title: "Stepovers",
  description:
    "Premier League entertainment factor calculator for finding the most watchable matches of the week.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${bebas.variable} ${syne.variable} min-h-dvh`}
    >
      <ClerkProvider>
        <body className="relative flex min-h-dvh w-full flex-col bg-black">
          <Blob className="top-1/4 -left-1/4 z-0 h-[250px] w-[250px] lg:top-[40%] lg:left-[-12%] lg:h-[350px] lg:w-[350px]" />
          <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col px-3 pt-3">
            <header className="mb-10 shrink-0">
              <NavBar />
            </header>
            <div className="flex min-h-0 flex-1 flex-col">{children}</div>
          </div>
          <div className="mt-10 shrink-0">
            <Footer />
          </div>
        </body>
      </ClerkProvider>
    </html>
  );
}
