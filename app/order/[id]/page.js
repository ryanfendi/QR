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
        padding: 20,
        border: "1px solid #ddd",
        borderRadius: 12,
        marginTop: 20
      }}>
        <h2>{order.products?.name}</h2>

        <p>
          Total: <strong>Rp {order.total.toLocaleString("id-ID")}</strong>
        </p>

        <p>Status: <strong>{order.status}</strong></p>

        <hr />

        <p>Nama: {order.buyer_name}</p>
        <p>WhatsApp: {order.buyer_phone}</p>
        <p>Alamat: {order.buyer_address}</p>
      </div>
    </main>
  );
}
