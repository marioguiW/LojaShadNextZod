"use client"
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import axios from "axios";
import { NumericFormat, PatternFormat } from 'react-number-format';
import NumberFormat from 'react-number-format';
import { DialogClose, DialogTrigger } from "@/components/ui/dialog";


const formSchema = z.object({
    titulo: z.string().nonempty({
        message: "O nome da propriedade não pode ser vazio",
    }),
    categoria: z.string().min(8, {
        message: "Deve ter no mínimo 8 caracteres"
    }),
    unidadeMedida: z.string().min(1, {
        message: "Top"
    }),
    quantidade: z.string().min(1, {
        message: "Top"
    }),
    preco: z.string().min(1, {
        message: "Mínimo 9 digitos (XX) X XXXX-XXXX"
    })
})

type FormularioProps = {
    setOpen: (boolean: boolean) => void,
    estilo: string
}

export default function Formulario({ setOpen, estilo }: FormularioProps) {
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        setOpen(false)
        console.log("teste")
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })


    return (
        <div className={`flex items-center  w-full ${estilo}`}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full rounded space-y-4">

                    <FormField
                        control={form.control}
                        name="titulo"
                        render={({ field }) => (
                            <FormItem className="w-full flex flex-col">
                                <FormLabel className="text-black">Titulo</FormLabel>
                                <FormControl>
                                    <Input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="Fazenda Santa Luzia" {...field} />
                                </FormControl>
                                <FormMessage className="text-[10px]" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="categoria"
                        render={({ field: { ref, ...rest } }) => (
                            <FormItem className="w-full flex flex-col">
                                <FormLabel className="text-black">Categoria</FormLabel>
                                <FormControl>
                                    {/* mateus */}
                                    <PatternFormat
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="23.456.789/0001-12"
                                        format="##.###.###/####-##"
                                        allowEmptyFormatting
                                        mask={'_'}
                                        getInputRef={ref}
                                        {...rest}
                                    />
                                </FormControl>
                                <FormMessage className="text-[10px]" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="unidadeMedida"
                        render={({ field: { ref, ...rest } }) => (
                            <FormItem className="w-full flex flex-col">
                                <FormLabel className="text-black">Unidade de Medida</FormLabel>
                                <FormControl>
                                    {/* mateus */}
                                    <PatternFormat
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="(00) 0 0000-0000"
                                        format="(##) # ####-####"
                                        allowEmptyFormatting
                                        mask={'_'}
                                        getInputRef={ref}
                                        {...rest}
                                    />
                                </FormControl>
                                <FormMessage className="text-[10px]" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="preco"
                        render={({ field: { ref, ...rest } }) => (
                            <FormItem className="w-full flex flex-col">
                                <FormLabel className="text-black">Preco</FormLabel>
                                <FormControl>
                                    {/* mateus */}
                                    <NumericFormat
                                        thousandSeparator=","
                                        decimalSeparator="."
                                        prefix="$ "
                                        decimalScale={2}
                                        {...rest}
                                    />


                                </FormControl>
                                <FormMessage className="text-[10px]" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="quantidade"
                        render={({ field: { ref, ...rest } }) => (
                            <FormItem className="w-full flex flex-col">
                                <FormLabel className="text-black">Quantidade</FormLabel>
                                <FormControl>
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
                                </FormControl>
                                <FormMessage className="text-[10px]" />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full mt-10 bg-emerald-500 hover:bg-emerald-600">Submit</Button>
                </form>
            </Form>
        </div>
    )
}