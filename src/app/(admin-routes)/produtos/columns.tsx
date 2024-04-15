"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ReactNode, useState } from "react"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import FormularioProdutos from "@/components/FormularioProdutos"
import { ProductType, deleteProduct } from "@/services/produtosService"
import DeletarProdutos from "@/components/DeletarProdutor"
import Image from "next/image"

export const columns: ColumnDef<ProductType>[] = [
    {
        accessorKey: "id",
        header: () => <div className="text-center">ID</div>,
        cell: ({ row }) => {
            const amount: ReactNode = row.getValue("id")
            return <div className="text-center font-medium">{amount}</div>
        },
    },
    {
        accessorKey: "urlImagem",
        header: () => <div className="text-center">Imagem</div>,
        cell: ({ row }) => {
            const amount: string = row.getValue("urlImagem")
            console.log(amount)
            return <div className="flex justify-center">{<img alt="Logo Produto" width={25} height={15} src={amount}/>}</div>
        },
    },
    {
        accessorKey: "titulo",
        header: () => <div className="text-center">Titulo</div>,
        cell: ({ row }) => {
            const amount: ReactNode = row.getValue("titulo")
            return <div className="text-center font-medium">{amount}</div>
        },
    },
    {
        accessorKey: "categoria",
        header: () => <div className="text-center">Categoria</div>,
        cell: ({ row }) => {
            const amount: ReactNode = row.getValue("categoria")
            return <div className="text-center font-medium">{amount}</div>
        },
    },
    {
        accessorKey: "unidadeMedida",
        header: () => <div className="text-center">Uni. Medida</div>,
        cell: ({ row }) => {
            const amount: ReactNode = row.getValue("unidadeMedida")
            return <div className="text-center font-medium">{amount}</div>
        },
    },
    {
        accessorKey: "quantidade",
        header: () => <div className="text-center">Quantidade</div>,
        cell: ({ row }) => {
            const amount: ReactNode = row.getValue("quantidade")
            return <div className="text-center font-medium">{amount}</div>
        },
    },
    {
        accessorKey: "preco",
        header: () => <div className="text-center">Amount</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("preco"))
            const formatted = new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
            }).format(amount)

            return <div className="text-center font-medium">{formatted}</div>
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {

            const [editOpen, setEditOpen] = useState(false)
            const [deleteOpen, setDeleteOpen] = useState(false)
            const [payment, setPayment] = useState(row.original)

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className='bg-white'>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                            <Dialog>
                                <DialogTrigger asChild onClick={ () => setEditOpen(true)}>
                                    <p>Edit Profile</p>
                                </DialogTrigger>
                            </Dialog>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Dialog>
                                <DialogTrigger onClick={() => setDeleteOpen(true)} asChild>
                                    <p>Excluir</p>
                                </DialogTrigger>
                            </Dialog>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                    <Dialog open={editOpen} onOpenChange={setEditOpen}>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Edit profile</DialogTitle>
                                <DialogDescription>
                                    Make Aaaaa to your profile here. Click save when you're done.
                                </DialogDescription>
                            </DialogHeader>
                            <FormularioProdutos setOpen={setEditOpen} estilo='PUT' dataProduct={payment} />                    
                        </DialogContent>
                    </Dialog>
                    <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className='mt-3 ml-3 text-md'>Tem certeza que deseja excluir a safra?</DialogTitle>
                            </DialogHeader>
                            <DeletarProdutos setDeleteOpen={setDeleteOpen} id={payment.id} />
                        </DialogContent>
                    </Dialog>
                </DropdownMenu>
            )
        },
    },
]