import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/sections/Navbar";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ahmad Jutrzenka Ilyas",
  description: "Full Stack Developer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} antialiased`}>
      <body className="min-h-screen flex flex-col items-center">
        <div className="fixed inset-0 -z-10">
          <BackgroundGradientAnimation
            gradientBackgroundStart="rgb(15, 13, 30)"
            gradientBackgroundEnd="rgb(28, 13, 36)"
            firstColor="139, 127, 245"
            secondColor="16, 37, 53"
            thirdColor="28, 13, 36"
            fourthColor="142, 147, 176"
            fifthColor="19, 16, 42"
          />
        </div>
        {children}
        <Navbar />
      </body>
    </html>
  );
}
