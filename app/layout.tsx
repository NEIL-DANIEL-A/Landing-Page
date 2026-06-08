import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import TopNavbar from "@/components/TopNavbar";
import { SidebarProvider } from "@/lib/sidebar-context";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cloud Enthusiasts | Community Dashboard",
  description: "Premium builder dashboard for AWS Community Builders and Cloud Enthusiasts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} h-full antialiased`}>
      <body className="min-h-full font-sans bg-brand-bg text-foreground selection:bg-brand-orange/20">
        <SidebarProvider>
          {/* Main Layout Grid */}
          <div className="flex min-h-screen w-full relative">
            <Sidebar />
            <div className="flex-1 md:pl-[260px] flex flex-col min-h-screen">
              <TopNavbar />
              <main className="flex-1 p-5 md:p-8 max-w-[1600px] w-full mx-auto flex flex-col gap-6">
                {children}
              </main>
            </div>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
