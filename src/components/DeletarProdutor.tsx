'use client'
import { ProductType, deleteProduct } from "@/services/produtosService";
import { Button } from "./ui/button";
import { Dispatch, SetStateAction, useContext } from "react";
import { ProdutosContext } from "@/context/ProdutosContext";

type DeletarProdutosProps = {
    id: number | undefined,
    setDeleteOpen: Dispatch<SetStateAction<boolean>>
}

export default function DeletarProdutos({id, setDeleteOpen} : DeletarProdutosProps) {

    const {setData} = useContext(ProdutosContext)

    return(
        <div className='flex justify-around'>
                <Button
                    variant='outline'
                    className='bg-gray-200'
                    onClick={()=> setDeleteOpen(false)}
                >
                    Cancelar
                </Button>
                <Button
                    variant='destructive'
                    onClick={() => {
                        deleteProduct(id).then((a)=> {
                            setData( (prevData : any) => 
                                prevData.filter((item : any) => item.id != id))
                            setDeleteOpen(false)
                        })
                    }}
                >
                    Excluir
                </Button>
        </div>
    )
}