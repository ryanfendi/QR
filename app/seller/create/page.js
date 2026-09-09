"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabase";

export default function CreateProduct() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("1000");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      let sellerId = localStorage.getItem("qr_seller_id");

      if (!sellerId) {
        const { data: seller, error: sellerError } = await supabase
          .from("sellers")
          .insert({
            name: "Penjual QR Commerce",
            email: null,
          })
          .select()
          .single();

        if (sellerError) throw sellerError;

        sellerId = seller.id;

        localStorage.setItem("qr_seller_id", sellerId);
      }

      const { data: product, error: productError } = await supabase
        .from("products")
        .insert({
          seller_id: sellerId,
          name: name,
          price: Number(price),
          weight_gram: Number(weight),
        })
        .select()
        .single();

      if (productError) throw productError;

      router.push(`/product/${product.id}`);
    } catch (err) {
      console.error(err);
      setError(
        err?.message || "Produk gagal dibuat. Silakan coba lagi."
      );
    } finally {
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
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <a
          href="/seller"
          style={{
            color: "#666",
            textDecoration: "none",
            fontSize: "14px",
          }}
        >
          ← Kembali ke Dashboard
        </a>

        <h1 style={{ marginTop: "25px" }}>
          Tambah Produk
        </h1>

        <p style={{ color: "#666" }}>
          Buat produk yang nantinya bisa dibeli melalui QR.
        </p>

        <form
          onSubmit={handleSubmit}
          style={{
            background: "white",
            padding: "24px",
            borderRadius: "20px",
            marginTop: "25px",
            boxShadow: "0 8px 25px rgba(0,0,0,0.06)",
          }}
        >
          <label>Nama Produk</label>

          <input
            type="text"
            placeholder="Contoh: Sepatu Premium"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "14px",
              marginTop: "8px",
              marginBottom: "20px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              fontSize: "16px",
            }}
          />

          <label>Harga (Rupiah)</label>

          <input
            type="number"
            placeholder="150000"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="1"
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "14px",
              marginTop: "8px",
              marginBottom: "20px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              fontSize: "16px",
            }}
          />

          <label>Berat Produk (gram)</label>

          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            required
            min="1"
            style={{
              width: "100%",
              boxSizing: "border-box",
              padding: "14px",
              marginTop: "8px",
              marginBottom: "25px",
              border: "1px solid #ddd",
              borderRadius: "10px",
              fontSize: "16px",
            }}
          />

          {error && (
            <div
              style={{
                background: "#ffe5e5",
                color: "#b00020",
                padding: "12px",
                borderRadius: "10px",
                marginBottom: "15px",
                fontSize: "14px",
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
              padding: "16px",
              border: "none",
              borderRadius: "12px",
              background: loading ? "#777" : "black",
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            {loading ? "MENYIMPAN..." : "BUAT PRODUK"}
          </button>
        </form>
      </div>
    </main>
  );
}
