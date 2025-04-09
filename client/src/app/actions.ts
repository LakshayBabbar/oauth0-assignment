"use server";

import { auth0 } from "@/lib/auth0";

interface AccessTokenResponse {
    access_token: string;
    expires_in: number;
    token_type: string;
}
type Role = {
    id: string;
    name: string;
    description: string;
};

export async function createAccessToken(): Promise<string> {
    try {
        const response = await fetch(
            `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    grant_type: "client_credentials",
                    client_id: process.env.AUTH0_CLIENT_ID!,
                    client_secret: process.env.AUTH0_CLIENT_SECRET!,
                    audience: process.env.AUTH0_AUDIENCE!
                }),
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch Auth0 management token");
        }

        const data: AccessTokenResponse = await response.json();
        return data.access_token;
    } catch (error) {
        throw new Error("Failed to get Auth0 management token");
    }
}

export async function getUsersRoles(): Promise<Role[]> {
    const session = await auth0.getSession();
    const user = session?.user;

    if (!user) {
        throw new Error("User not authenticated");
    }

    const token = await createAccessToken();

    const response = await fetch(
        `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${user.sub}/roles`,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch user roles");
    }

    const data: Role[] = await response.json();
    return data;
}

export const checkIsAdmin = async () => {
    try {
        const roles = await getUsersRoles();
        const isAdmin = roles.some((role) => role.name.toLowerCase() === "admin");
        return isAdmin;
    } catch (error: any) {
        console.error("Error checking admin role:", error.message);
        return false;
    }
};