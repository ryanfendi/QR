"use client";

import { useState } from "react";
import Link from "next/link";

export default function CreateProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("1000");

  function handleSubmit(e) {
    e.preventDefault();

    alert(
      `Produk siap dibuat!\n\n${name}\nRp${Number(price).toLocaleString("id-ID")}`
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
        <Link
          href="/seller"
          style={{
            color: "#666",
            textDecoration: "none",
            fontSize: "14px",
          }}
        >
          ← Kembali ke Dashboard
        </Link>

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

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "16px",
              border: "none",
              borderRadius: "12px",
              background: "black",
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
            }}
          >
            BUAT PRODUK
          </button>
        </form>
      </div>
    </main>
  );
}
