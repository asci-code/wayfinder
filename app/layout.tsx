import type { ReactNode } from "react";

export const metadata = {
  title: "Wayfinder",
  description: "Intelligent travel recommendation engine"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
