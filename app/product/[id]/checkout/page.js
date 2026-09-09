"use client";

import { useState } from "react";
import { supabase } from "../../../../../lib/supabase";

export default function CheckoutPage({ params }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const { data: product, error: productError } = await supabase
        .from("products")
        .select("*")
        .eq("id", params.id)
        .single();

      if (productError) throw productError;

      const shippingCost = 0;
      const total = Number(product.price) + shippingCost;

      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          product_id: product.id,
          buyer_name: name,
          buyer_phone: phone,
          buyer_address: address,
          shipping_cost: shippingCost,
          total: total,
          status: "PENDING",
        })
        .select()
        .single();

      if (orderError) throw orderError;

      window.location.href = `/order/${order.id}`;
    } catch (err) {
      console.error(err);
      setError(err.message || "Pesanan gagal dibuat.");
      setLoading(false);
    }
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
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        <h1>Checkout</h1>

        <form
          onSubmit={handleSubmit}
          style={{
            background: "white",
            padding: "24px",
            borderRadius: "20px",
            marginTop: "20px",
          }}
        >
          <label>Nama</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama lengkap"
            style={inputStyle}
          />

          <label>Nomor WhatsApp</label>
          <input
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="08xxxxxxxxxx"
            style={inputStyle}
          />

          <label>Alamat Pengiriman</label>
          <textarea
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Alamat lengkap"
            rows="5"
            style={inputStyle}
          />

          {error && (
            <div
              style={{
                background: "#ffe5e5",
                color: "#b00020",
                padding: "12px",
                borderRadius: "10px",
                marginTop: "15px",
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "17px",
              marginTop: "25px",
              border: "none",
              borderRadius: "12px",
              background: loading ? "#777" : "black",
              color: "white",
              fontSize: "17px",
              fontWeight: "bold",
            }}
          >
            {loading ? "MEMBUAT PESANAN..." : "BUAT PESANAN"}
          </button>
        </form>
      </div>
    </main>
  );
}

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "14px",
  marginTop: "8px",
  marginBottom: "18px",
  border: "1px solid #ddd",
  borderRadius: "10px",
  fontSize: "16px",
};
