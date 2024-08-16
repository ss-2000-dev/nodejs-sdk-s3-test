import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | CSV Table Sample",
    default: "CSV Table Sample",
  },
  description: "Show CSV Table ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <body className={`${inter.className} antialiased`}>{children}</body> */}
      <body>{children}</body>
      {/* <body>Test</body> */}
    </html>
  );
}
