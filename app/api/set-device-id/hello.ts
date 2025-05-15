import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export default function handler(req: NextRequest, res: NextResponse) {
    console.log(req)
    return NextResponse.json({
        message: "Test :)"
    })
}
