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

    const auth = Buffer.from(serverKey + ":").toString("base64");

    const response = await fetch(
      "https://api.sandbox.midtrans.com/v2/charge",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
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

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            data.status_message ||
            "Gagal membuat pembayaran QRIS",
          midtrans: data,
        },
        { status: response.status }
      );
    }

    // Cari URL QRIS dengan lebih fleksibel
    const qrAction = data.actions?.find(
      (action) =>
        action?.url &&
        action.url.includes("/qr-code")
    );

    if (!qrAction?.url) {
      return NextResponse.json(
        {
          error: "Midtrans tidak mengembalikan URL QRIS",
          midtrans: data,
        },
        { status: 500 }
      );
    }

        return NextResponse.json({
  success: true,
  midtrans_response: data,
});
  } catch (error) {
    return NextResponse.json(
      {
        error: "Gagal membuat pembayaran",
        detail: error.message,
      },
      { status: 500 }
    );
  }
}
