import type { Metadata } from "next";
import "./globals.css";
import { GoogleTagManager } from '@next/third-parties/google';
import InitialLoader from "@/common/InitialLoader";
import CustomCursor from "@/components/common/CustomCursor";
import WhatsAppButton from "@/components/common/WhatsAppButton";

export const metadata: Metadata = {
  title: "OP Productions",
  description: "OP Productions — Film, Music & Events",
  icons: {
    icon: "/logo.png",
  },
  verification: {
    google: 'DkfcCr_VTvxQhjMxWbsJ5H5ocouCHi-obG9gufbC0ss',
  },
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
          <GoogleTagManager
            gtmId={process.env.NEXT_PUBLIC_GTM_ID!}
          />
          <WhatsAppButton />
        </div>
      </body>
    </html>
  );
}
