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
import { ReactNode } from "react"
import DialogDemo from "@/components/Dialog"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    id: string
    titulo: string
    categoria: string
    preco: number
    unidadeMedida: string
    quantidade: number
}

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "id",
        header: () => <div className="text-center">ID</div>,
        cell: ({ row }) => {
            const amount: ReactNode = row.getValue("id")
            return <div className="text-center font-medium">{amount}</div>
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
            const payment = row.original

            return (
                <Dialog>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => navigator.clipboard.writeText(payment.id)}
                            >
                                Copy payment ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <DialogTrigger asChild>
                                    <p>Edit Profile</p>
                                </DialogTrigger>
                            </DropdownMenuItem>
                            <DropdownMenuItem>View payment details</DropdownMenuItem>
                        </DropdownMenuContent>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Edit profile</DialogTitle>
                                <DialogDescription>
                                    Make changes to your profile here. Click save when you're done.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="titulo" className="text-right">
                                        Titulo
                                    </Label>
                                    <Input id="titulo" value={payment.titulo} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="categoria" className="text-right">
                                        Categoria
                                    </Label>
                                    <Input id="categoria" value={payment.categoria} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="uniMedida" className="text-right">
                                        Uni. Medida
                                    </Label>
                                    <Select>
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Selecione a unidade" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Unidade de Medida</SelectLabel>
                                                <SelectItem value="apple">Grama</SelectItem>
                                                <SelectItem value="banana">Quilograma</SelectItem>
                                                <SelectItem value="blueberry">Litro</SelectItem>
                                                <SelectItem value="grapes">Mililitro</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="categoria" className="text-right">
                                        Categoria
                                    </Label>
                                    <Input id="categoria" value={payment.categoria} className="col-span-3" />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="categoria" className="text-right">
                                        Categoria
                                    </Label>
                                    <Input id="categoria" value={payment.categoria} className="col-span-3" />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Save changes</Button>
                            </DialogFooter>
                        </DialogContent>
                    </DropdownMenu>
                </Dialog>
            )
        },
    },
]