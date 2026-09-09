import { supabase } from "../../../../lib/supabase";

export default async function CheckoutPage({ params }) {
  const { data: product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !product) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h1>Produk tidak ditemukan</h1>
      </main>
    );
  }

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
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <h1>Checkout</h1>

        <div
          style={{
            background: "white",
            padding: "24px",
            borderRadius: "20px",
            marginTop: "20px",
          }}
        >
          <h2>{product.name}</h2>

          <p
            style={{
              fontSize: "25px",
              fontWeight: "bold",
            }}
          >
            Rp{Number(product.price).toLocaleString("id-ID")}
          </p>

          <hr style={{ margin: "25px 0" }} />

          <h3>Data Pembeli</h3>

          <label>Nama</label>
          <input
            type="text"
            placeholder="Nama lengkap"
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "14px",
              marginTop: "8px",
              marginBottom: "18px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              fontSize: "16px",
            }}
          />

          <label>Nomor WhatsApp</label>
          <input
            type="tel"
            placeholder="08xxxxxxxxxx"
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "14px",
              marginTop: "8px",
              marginBottom: "18px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              fontSize: "16px",
            }}
          />

          <h3>Alamat Pengiriman</h3>

          <textarea
            placeholder="Alamat lengkap untuk pengiriman"
            rows="5"
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "14px",
              marginTop: "8px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              fontSize: "16px",
              resize: "vertical",
            }}
          />

          <button
            style={{
              width: "100%",
              padding: "17px",
              marginTop: "25px",
              border: "none",
              borderRadius: "12px",
              background: "black",
              color: "white",
              fontSize: "17px",
              fontWeight: "bold",
            }}
          >
            LANJUTKAN
          </button>
        </div>
      </div>
    </main>
  );
}
