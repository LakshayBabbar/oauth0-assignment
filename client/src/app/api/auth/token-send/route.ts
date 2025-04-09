import { auth0 } from "@/lib/auth0";
import { NextRequest, NextResponse } from "next/server"

export const GET = async (req: NextRequest) => {
    try {
        const session = await auth0.getSession();
        if (!session) {
            return NextResponse.json({
                error: 'Session not found',
            }, { status: 401 })
        }
        const response = await fetch(`${process.env.SERVER_API_URL}/auth/callback`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session?.tokenSet.idToken}`,
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return NextResponse.redirect(new URL("/", req.url));
    } catch (error: any) {
        return NextResponse.json({
            error: error.message,
        }, { status: 500 })
    }
}