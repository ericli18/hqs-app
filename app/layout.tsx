import { GeistSans } from "geist/font/sans";
import { Toaster } from "@/components/ui/toaster"
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "HQS Shift View",
  description: "View, create, and manage shifts",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
          {children}
        <Toaster />
      </body>
    </html>
  );
}
