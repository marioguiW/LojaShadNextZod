import { NextRequest, NextResponse } from "next/server"
import { authService } from "./services/authService"
import Cookies from 'js-cookie'


export default async function middleware(request : NextRequest){

    const tokens = {
        accessToken: request.cookies.get('ACCESS_TOKEN')?.value,
        refreshToken: request.cookies.get('REFRESH_TOKEN')?.value
    }
    console.log("tokens", tokens)
    
    const signInURL = new URL('/', request.url)

    const dashboardURL = new URL('/dashboard', request.url)

    if(!tokens.accessToken){
        if(request.nextUrl.pathname === '/'){
            return NextResponse.next()
        }
        return NextResponse.redirect(signInURL)
    }

    const session = await authService.getSession(tokens.accessToken)
    console.log("Session -> ", session)

    if(!session?.ok){
        console.log("Tokens a serem refreshados -> ", tokens)
        const refresh = await authService.refresh(tokens)
        console.log("refresh antes do if", refresh)
        if(refresh?.ok){
            console.log("Atualizo os token")
            console.log("accessToken", refresh.body.value.accessToken)
            console.log("refreshToken", refresh.body.value.refreshToken)

            const response = NextResponse.next()

            response.cookies.set('ACCESS_TOKEN', refresh.body.value.accessToken)
            response.cookies.set('REFRESH_TOKEN', refresh.body.value.refreshToken)

            console.log("Atualizou???? ")
            console.log(request.cookies.get('ACCESS_TOKEN')?.value)
            console.log(request.cookies.get('REFRESH_TOKEN')?.value)

            return response

        }else{
            console.log("refresh[ERRO]", refresh)
        }
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