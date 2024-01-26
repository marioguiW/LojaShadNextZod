import { NextRequest, NextResponse } from "next/server"
import { authService } from "./services/authService"


export default async function middleware(request : NextRequest){

    const tokens = {
        accessToken: request.cookies.get('ACCESS_TOKEN')?.value,
        refreshToken: request.cookies.get('REFRESH_TOKEN')?.value
    }
    console.log("tokens", tokens)
    
    const session = await authService.getSession(tokens.accessToken)
    
    if(!session?.ok){
        const refresh = await authService.refresh(tokens)
        // console.log("refresh", refresh)
    }
    
    const signInURL = new URL('/', request.url)

    const dashboardURL = new URL('/dashboard', request.url)

    if(!tokens.accessToken){
        if(request.nextUrl.pathname === '/'){
            return NextResponse.next()
        }
        return NextResponse.redirect(signInURL)
    }

    if(request.nextUrl.pathname === '/'){
        console.log("teste")
        return NextResponse.redirect(dashboardURL)
    }


    console.log("a")
}

export const config = {
    matcher: ['/', '/dashboard/:path*']
}