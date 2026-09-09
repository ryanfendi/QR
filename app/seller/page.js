import Link from "next/link";

export default function SellerPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
        padding: "24px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
        }}
      >
        <Link
          href="/"
          style={{
            color: "#666",
            textDecoration: "none",
            fontSize: "14px",
          }}
        >
          ← Kembali
        </Link>

        <div style={{ marginTop: "25px" }}>
          <h1 style={{ marginBottom: "8px" }}>
            Dashboard Penjual
          </h1>

          <p style={{ color: "#666" }}>
            Kelola produk dan QR pembelian kamu.
          </p>
        </div>

        <div
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "24px",
            marginTop: "25px",
            boxShadow: "0 8px 25px rgba(0,0,0,0.06)",
          }}
        >
          <h2 style={{ marginTop: 0 }}>
            Toko Saya
          </h2>

          <p style={{ color: "#777" }}>
            Belum ada produk.
          </p>

          <Link
            href="/seller/create"
            style={{
              display: "block",
              textAlign: "center",
              padding: "15px",
              borderRadius: "12px",
              background: "black",
              color: "white",
              textDecoration: "none",
              fontWeight: "bold",
              marginTop: "20px",
            }}
          >
            + TAMBAH PRODUK
          </Link>
        </div>

        <div
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "24px",
            marginTop: "18px",
          }}
        >
          <h3>Pesanan</h3>

          <p style={{ color: "#777" }}>
            Belum ada pesanan.
          </p>
        </div>
      </div>
    </main>
  );
}
