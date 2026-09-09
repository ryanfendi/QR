import Link from "next/link";

export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "500px",
          background: "white",
          borderRadius: "24px",
          padding: "40px 24px",
          textAlign: "center",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
        }}
      >
        <div
          style={{
            width: "70px",
            height: "70px",
            borderRadius: "20px",
            background: "black",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
            fontSize: "28px",
            fontWeight: "bold",
          }}
        >
          QR
        </div>

        <h1 style={{ fontSize: "36px", marginBottom: "12px" }}>
          QR Commerce
        </h1>

        <p
          style={{
            color: "#666",
            fontSize: "18px",
            lineHeight: "1.6",
            marginBottom: "30px",
          }}
        >
          Jual produk dengan satu QR.
          <br />
          Pembeli scan, checkout, dan bayar.
        </p>

        <Link
          href="/seller"
          style={{
            display: "block",
            width: "100%",
            boxSizing: "border-box",
            padding: "16px",
            borderRadius: "14px",
            background: "black",
            color: "white",
            fontSize: "17px",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          MULAI JUAL
        </Link>

        <p
          style={{
            marginTop: "24px",
            fontSize: "13px",
            color: "#999",
          }}
        >
          Scan → Checkout → Bayar
        </p>
      </div>
    </main>
  );
}
