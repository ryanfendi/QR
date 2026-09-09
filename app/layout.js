export const metadata = {
  title: "QR Commerce",
  description: "Jual produk dengan satu QR",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
