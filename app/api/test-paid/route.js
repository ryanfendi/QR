import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export async function POST(request) {
  try {
    const { order_id } = await request.json();

    if (!order_id) {
      return NextResponse.json(
        { error: "order_id wajib diisi" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("orders")
      .update({
        status: "PAID",
      })
      .eq("id", order_id)
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      order: data,
    });

  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
