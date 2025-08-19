"use server";

import {cookies} from "next/headers";

interface AuthUser {
    userId: string;
    username: string;
    email: string;
    role: string;
}

export async function setLoginCookies(user: AuthUser){
    const cookieStore = await cookies()
    cookieStore.set("userId",user.userId,{
        path: "/",
        maxAge: 60 * 60 * 2 // 2 hours
    });
    cookieStore.set("username",user.username,{
        path: "/",
        maxAge: 60 * 60 * 2 // 2 hours
    });
    cookieStore.set("email",user.email,{
        path: "/",
        maxAge: 60 * 60 * 2 // 2 hours
    });
    cookieStore.set("role",user.role,{
        path: "/",
        maxAge: 60 * 60 * 2 // 2 hours
    })
}