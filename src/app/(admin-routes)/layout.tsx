import { getServerSession } from "next-auth"
import { ReactNode } from "react"
import { authOptions } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"


type PrivateRoutesProps = {
    children: ReactNode
}

export default async function PrivateRoutes({children}: PrivateRoutesProps){
    const session = await getServerSession(authOptions)
    console.log(session)
    if(!session){
        redirect("/")
    }else{
        return (
            <main className="h-screen">
                {children}
            </main>
        )
    }
}