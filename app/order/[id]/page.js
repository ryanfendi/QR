"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function OrderPage({ params }) {
  const { id } = params;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);
  const [qrUrl, setQrUrl] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadOrder() {
      const { data, error } = await supabase
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

      if (error) {
        setError(error.message);
      } else {
        setOrder(data);
      }

      setLoading(false);
    }

    loadOrder();
  }, [id]);

  async function handlePayment() {
    if (!order) return;

    setPaying(true);
    setError("");
    setQrUrl("");

    try {
      const response = await fetch("/api/payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          order_id: id,
          gross_amount: order.total,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
          data.status_message ||
          "Pembayaran gagal"
        );
      }

      const qrAction =
        data.actions?.find(
          (action) => action.name === "generate-qr-code-v2"
        ) ||
        data.actions?.find(
          (action) => action.name === "generate-qr-code"
        );

      if (!qrAction?.url) {
        throw new Error("URL QRIS tidak ditemukan dari Midtrans");
      }

      setQrUrl(qrAction.url);

    } catch (err) {
      setError(err.message);
    } finally {
      setPaying(false);
    }
  }

  if (loading) {
    return (
      <main style={{ padding: 30, fontFamily: "Arial" }}>
        <h1>Memuat pesanan...</h1>
      </main>
    );
  }

  if (!order) {
    return (
      <main style={{ padding: 30, fontFamily: "Arial" }}>
        <h1>Pesanan tidak ditemukan</h1>
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main
      style={{
        padding: 30,
        fontFamily: "Arial",
        maxWidth: 600,
        margin: "auto",
      }}
    >
      <h1>Pesanan Berhasil</h1>

      <div
        style={{
          padding: 15,
          background: "#f5f5f5",
          borderRadius: 10,
          marginTop: 15,
        }}
      >
        <strong>ID Pesanan</strong>

        <div
          style={{
            fontSize: 20,
            marginTop: 8,
            letterSpacing: 2,
          }}
        >
          QC-{id.slice(0, 6).toUpperCase()}
        </div>
      </div>

      <div
        style={{
          padding: 20,
          border: "1px solid #ddd",
          borderRadius: 12,
          marginTop: 20,
        }}
      >
        <h2>{order.products?.name}</h2>

        <p>
          Total:{" "}
          <strong>
            Rp {Number(order.total).toLocaleString("id-ID")}
          </strong>
        </p>

        <p>
          Status: <strong>{order.status}</strong>
        </p>

        <hr />

        <p>Nama: {order.buyer_name}</p>
        <p>WhatsApp: {order.buyer_phone}</p>
        <p>Alamat: {order.buyer_address}</p>

        {!qrUrl && (
          <button
            onClick={handlePayment}
            disabled={paying}
            style={{
              width: "100%",
              padding: 16,
              marginTop: 20,
              border: "none",
              borderRadius: 10,
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            {paying
              ? "MEMBUAT QRIS..."
              : "BAYAR SEKARANG"}
          </button>
        )}

        {qrUrl && (
          <div
            style={{
              marginTop: 25,
              textAlign: "center",
            }}
          >
            <h2>Bayar dengan QRIS</h2>

            <p>
              Scan QR berikut untuk membayar
            </p>

            <img
              src={qrUrl}
              alt="QRIS Pembayaran"
              style={{
                width: 280,
                maxWidth: "100%",
                height: "auto",
                display: "block",
                margin: "20px auto",
              }}
            />

            <p>
              <strong>
                Rp {Number(order.total).toLocaleString("id-ID")}
              </strong>
            </p>

            <p>
              Status: <strong>MENUNGGU PEMBAYARAN</strong>
            </p>
          </div>
        )}

        {error && (
          <p style={{ marginTop: 15 }}>
            ❌ {error}
          </p>
        )}
      </div>
    </main>
  );
}
