import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabase } from "../../../../lib/supabase";

export async function POST(request) {
  try {
    const notification = await request.json();

    const {
      order_id,
      status_code,
      gross_amount,
      signature_key,
      transaction_status,
      fraud_status,
    } = notification;

    const serverKey = process.env.MIDTRANS_SERVER_KEY;

    if (!serverKey) {
      return NextResponse.json(
        { error: "MIDTRANS_SERVER_KEY belum tersedia" },
        { status: 500 }
      );
    }

    // Verifikasi bahwa notifikasi benar-benar berasal dari Midtrans
    const expectedSignature = crypto
      .createHash("sha512")
      .update(order_id + status_code + gross_amount + serverKey)
      .digest("hex");

    if (signature_key !== expectedSignature) {
      return NextResponse.json(
        { error: "Signature tidak valid" },
        { status: 401 }
      );
    }

    let newStatus = "PENDING";

    if (
      transaction_status === "settlement" ||
      transaction_status === "capture" && fraud_status === "accept"
    ) {
      newStatus = "PAID";
    } else if (
      transaction_status === "cancel" ||
      transaction_status === "deny" ||
      transaction_status === "expire"
    ) {
      newStatus = "FAILED";
    }

    const { error } = await supabase
      .from("orders")
      .update({
        status: newStatus,
      })
      .eq("id", order_id);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      status: newStatus,
    });

  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
