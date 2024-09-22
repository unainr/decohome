import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import NextTopLoader from "nextjs-toploader";
import Navbar from "@/components/NavBar";
import { CartProvider } from "@/components/CartContext";
import Footer from "@/components/Footer";
import SessionProviderWrapper from "@/components/SessionProviderWrapper";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Home Decor Inspiration | DecorDreamscape",
  description: "Explore beautiful home decor ideas, tips, and products to transform your space. Discover the latest trends and timeless styles in home decoration.",
};

export default function RootLayout({
  
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
         <NextTopLoader
						color="#f21b34"
            height={2}
						crawlSpeed={50}
						speed={1000}
						showSpinner={false}
					/>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
           <SessionProviderWrapper>

            <CartProvider>

             <Navbar />
        {children}
        <Footer/>
            </CartProvider>
           </SessionProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
