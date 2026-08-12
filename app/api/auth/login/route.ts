import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { success: false, message: "Legacy login proxy disabled. Use direct backend auth endpoint /auth/login." },
    { status: 501 }
  );
}
