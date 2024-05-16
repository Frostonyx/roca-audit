import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ROCA AUDIT",
  description:
    "A tool for auditing CSV files produced by the ROCA sorting machine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
