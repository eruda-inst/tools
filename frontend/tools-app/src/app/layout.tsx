import type { Metadata } from "next";
import { ThemeProvider } from "@/components/theme-provider"
import "./_Home.scss"
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Toolbox",
  description: "Uma caixa de ferramentas legal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          <Toaster />
      </body>
    </html>
  );
}
