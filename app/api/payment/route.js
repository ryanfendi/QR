import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    const { order_id, gross_amount } = body;

    if (!order_id || !gross_amount) {
      return NextResponse.json(
        {
          error: "order_id dan gross_amount wajib diisi",
        },
        { status: 400 }
      );
    }

    const serverKey = process.env.MIDTRANS_SERVER_KEY;

    if (!serverKey) {
      return NextResponse.json(
        {
          error: "MIDTRANS_SERVER_KEY belum tersedia",
        },
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
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Basic ${auth}`,
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

    return NextResponse.json({
      debug: true,
      http_status: response.status,

      midtrans: data,

      actions: data.actions || null,

      qr_string: data.qr_string || null,
    });

  } catch (error) {
    return NextResponse.json(
      {
        error: "SERVER ERROR",
        detail: error.message,
      },
      { status: 500 }
    );
  }
}
