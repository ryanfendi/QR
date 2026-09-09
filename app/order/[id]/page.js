import { supabase } from "../../../lib/supabase";

export default async function OrderPage({ params }) {
  const { id } = params;

  const { data: order, error } = await supabase
    .from("orders")
    .select(`
      *,
      products (
        name,
        price
      )
    `)
    .eq("id", id)
    .single();

  if (error || !order) {
    return (
      <main style={{ padding: 30, fontFamily: "Arial" }}>
        <h1>Pesanan tidak ditemukan</h1>
        <p>ID pesanan: {id}</p>
      </main>
    );
  }

  return (
    <main style={{ padding: 30, fontFamily: "Arial", maxWidth: 600, margin: "auto" }}>
      <h1>Pesanan Berhasil</h1>

<div style={{
  padding: 15,
  background: "#f5f5f5",
  borderRadius: 10,
  marginTop: 15
}}>
  <strong>ID Pesanan</strong>
  <div style={{
    fontSize: 20,
    marginTop: 8,
    letterSpacing: 2
  }}>
    QC-{id.slice(0, 6).toUpperCase()}
  </div>
</div>
    </main>
  );
}
