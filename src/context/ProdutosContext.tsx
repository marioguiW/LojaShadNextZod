'use client'
import { ProductType } from "@/services/produtosService";
import axios from "axios";
import { Dispatch, ReactNode, SetStateAction, createContext, useEffect, useState } from "react";

type ProdutosContextType = {
    data: ProductType[],
    setData: Dispatch<SetStateAction<ProductType[] | []>>
}

export const ProdutosContext = createContext({} as any);

export function ProdutosProvider({children} : {children: ReactNode}){
    
    const [data, setData] = useState([])

    useEffect(()=>{
        console.log("mudou a data");
    },[data])

    return(
        <ProdutosContext.Provider value={{data, setData}}>
            {children}
        </ProdutosContext.Provider>
    )
}

