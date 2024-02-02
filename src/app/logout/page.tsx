'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookie from 'js-cookie'


export default function Logout(){

    const router = useRouter()

    useEffect(() => {
        // Função assíncrona dentro do useEffect
        (async ()=>{
            try {
                console.log("passou por aqui")
                Cookie.remove('ACCESS_TOKEN')
                Cookie.remove('REFRESH_TOKEN')
                router.push("/");
              } catch (error) {
                console.error("Erro ao fazer logout:", error);
                // Trate o erro conforme necessário
              }
        })()
      }, []);

    return(
        <div>Voce está sendo redirecionado</div>
    )
}