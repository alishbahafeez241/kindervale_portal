import { Toaster } from "react-hot-toast";
import { QueryProvider } from "@/components/providers/query-provider";
import { AuthProvider } from "@/context/auth-context";
import { SidebarProvider } from "@/context/sidebar-context";
import "./globals.css";

// Force all pages to be dynamically rendered — prevents static prerender
// InvariantError when client-only context providers (AuthProvider) are in the tree.
export const dynamic = "force-dynamic";

// NOTE: metadata and viewport are intentionally NOT exported from the root layout.
// Next.js 16 Turbopack has bug E1068 where createMetadataComponents throws
// "Expected workStore to be initialized" when prerendering /_global-error if the
// root layout exports metadata. Each page exports its own metadata instead.
// See: https://nextjs.org/docs/messages/prerender-error

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2e5a75" />
        <title>Kindervale Preschool</title>
      </head>
      <body>
        <QueryProvider>
          <AuthProvider>
            <SidebarProvider>{children}</SidebarProvider>
            <Toaster position="top-right" />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
