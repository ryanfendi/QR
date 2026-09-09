import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const {
      order_id,
      gross_amount,
      buyer_name,
      buyer_phone,
    } = await request.json();

    const serverKey = process.env.MIDTRANS_SERVER_KEY;

    if (!serverKey) {
      return NextResponse.json(
        { error: "MIDTRANS_SERVER_KEY belum tersedia" },
        { status: 500 }
      );
    }

    if (!order_id || !gross_amount) {
      return NextResponse.json(
        { error: "order_id dan gross_amount wajib diisi" },
        { status: 400 }
      );
    }

    const auth = Buffer
      .from(serverKey + ":")
      .toString("base64");

    const midtransOrderId =
      `${order_id}-${Date.now()}`;

    const response = await fetch(
      "https://app.sandbox.midtrans.com/snap/v1/transactions",
      {
        method: "POST",

        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Basic ${auth}`,
        },

        body: JSON.stringify({
          transaction_details: {
            order_id: midtransOrderId,
            gross_amount: Number(gross_amount),
          },

          customer_details: {
            first_name: buyer_name || "Customer",
            phone: buyer_phone || "",
          },

          enabled_payments: [
            "other_qris"
          ]
        }),
      }
    );

    const data = await response.json();

    return NextResponse.json(
      data,
      {
        status: response.ok
          ? 200
          : response.status,
      }
    );

  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
