import type { Metadata } from "next";
import "./globals.css";
import InitialLoader from "@/common/InitialLoader";
import CustomCursor from "@/components/common/CustomCursor";

export const metadata: Metadata = {
  title: "OP Productions",
  description: "OP Productions — Film, Music & Events",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased selection:bg-transparent is-loading">
      <body className="min-h-full flex flex-col select-none" suppressHydrationWarning>
        <InitialLoader />
        <div id="main-content-wrapper" className="min-h-full flex flex-col">
          <CustomCursor />
          {children}
        </div>
      </body>
    </html>
  );
}
