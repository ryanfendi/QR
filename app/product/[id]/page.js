import { supabase } from "../../../lib/supabase";

export default async function ProductPage({ params }) {
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
          padding: "24px",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1>Produk tidak ditemukan</h1>
          <p style={{ color: "#666" }}>
            Produk mungkin sudah dihapus atau link tidak valid.
          </p>
        </div>
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
        <div
          style={{
            background: "white",
            borderRadius: "24px",
            padding: "30px 24px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
          }}
        >
          <div
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "16px",
              background: "black",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "20px",
              fontWeight: "bold",
              fontSize: "22px",
            }}
          >
            QR
          </div>

          <h1>{product.name}</h1>

          <div
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              marginTop: "15px",
            }}
          >
            Rp{Number(product.price).toLocaleString("id-ID")}
          </div>

          <p style={{ color: "#666", marginTop: "10px" }}>
            Berat: {product.weight_gram} gram
          </p>

          <a
  href={`/product/${product.id}/checkout`}
  style={{
    display: "block",
    width: "100%",
    boxSizing: "border-box",
    padding: "17px",
    marginTop: "25px",
    borderRadius: "12px",
    background: "black",
    color: "white",
    fontSize: "17px",
    fontWeight: "bold",
    textAlign: "center",
    textDecoration: "none",
  }}
>
  BELI SEKARANG
</a>
        </div>
      </div>
    </main>
  );
}
