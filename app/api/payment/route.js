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
            order_id: order_id,
            gross_amount: Number(gross_amount),
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
      { status: response.ok ? 200 : response.status }
    );

  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
