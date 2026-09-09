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

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            data.status_message ||
            "Midtrans gagal membuat QRIS",
        },
        { status: response.status }
      );
    }

    const actions = Array.isArray(data.actions)
      ? data.actions
      : [];

    const qrAction = actions.find(
      (action) =>
        action &&
        action.name === "generate-qr-code"
    );

    const qrActionV2 = actions.find(
      (action) =>
        action &&
        action.name === "generate-qr-code-v2"
    );

    const qrUrl =
      qrAction?.url ||
      qrActionV2?.url ||
      null;

    if (!qrUrl) {
      return NextResponse.json(
        {
          error: "Midtrans tidak mengembalikan QR",
          transaction_id: data.transaction_id,
          transaction_status: data.transaction_status,
          actions: actions,
          qr_string: data.qr_string || null,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      order_id: data.order_id,
      transaction_id: data.transaction_id,
      transaction_status: data.transaction_status,
      qr_url: qrUrl,
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
