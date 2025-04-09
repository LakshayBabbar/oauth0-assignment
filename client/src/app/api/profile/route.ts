import { NextRequest, NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";

export async function GET(req: NextRequest) {
    try {
        const session = await auth0.getSession();
        let res;
        if (session) {
            res = NextResponse.json(session.user, { status: 200 });
        } else {
            res = NextResponse.redirect(new URL("/unauthorized", req.url))

        }
        return res;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}