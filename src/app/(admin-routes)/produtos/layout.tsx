
import { ReactNode } from "react"
import { redirect } from "next/navigation"
import Navbar from "@/components/Navbar"


type PrivateRoutesProps = {
    children: ReactNode
}

export default async function PrivateRoutes({children}: PrivateRoutesProps){
    return (
        <main className="h-screen">
            {children}
        </main>
    )
}

