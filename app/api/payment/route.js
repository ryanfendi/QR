import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { order_id, gross_amount } = await request.json();

    const serverKey = process.env.MIDTRANS_SERVER_KEY;

    if (!serverKey) {
      return NextResponse.json(
        { error: "MIDTRANS_SERVER_KEY belum tersedia" },
        { status: 500 }
      );
    }

    const auth = Buffer
      .from(serverKey + ":")
      .toString("base64");

    const response = await fetch(
      "https://api.sandbox.midtrans.com/v2/charge",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Basic ${auth}`,
        },
        body: JSON.stringify({
          payment_type: "qris",

          transaction_details: {
            order_id: order_id,
            gross_amount: Number(gross_amount),
          },

          qris: {
            acquirer: "gopay",
          },
        }),
      }
    );

    const data = await response.json();

    /*
     * UNTUK SEMENTARA:
     * jangan proses apa pun.
     * Kembalikan response asli Midtrans.
     */

    return NextResponse.json(
      {
        MIDTRANS_STATUS: response.status,
        MIDTRANS_RESPONSE: data
      },
      {
        status: response.ok ? 200 : response.status
      }
    );

  } catch (error) {
    return NextResponse.json(
      {
        error: error.message
      },
      { status: 500 }
    );
  }
}
