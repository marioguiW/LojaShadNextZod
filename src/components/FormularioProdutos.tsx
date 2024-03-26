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
import { NumericFormat } from 'react-number-format';
import axios from "axios"
import { useContext } from "react";
import { ProdutosContext } from "@/context/ProdutosContext";
import { ProductType, postProduct, putProduct } from "@/services/produtosService";



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
    setOpen?: (boolean: boolean) => void,
    estilo?: string
    dataProduct?: ProductType,
}

export default function FormularioProdutos({ setOpen, estilo, dataProduct }: FormularioProps) {

    const { data, setData } = useContext(ProdutosContext);

    async function onSubmit(values: z.infer<typeof formSchema>) {

        const precoSemPrefixo = values.preco.replace('R$ ', '');
        const precoNumerico = parseFloat(precoSemPrefixo.replace(/[^\d,.]/g, ''));

        
        const valuesMask : ProductType = {
            id: dataProduct?.id,
            titulo: values.titulo,
            categoria: values.categoria,
            unidadeMedida: values.unidadeMedida,
            quantidade: parseInt(values.quantidade),
            preco: precoNumerico
        }
        console.log(valuesMask)
        if (estilo == "POST") {
            const post = await postProduct(valuesMask)
            setData((prevData: any) => [...prevData, post]);
        } else {
            const put = await putProduct(valuesMask)

            setData((prevData: any[]) =>
                prevData.map((item: any) => {
                    if(item.id == dataProduct?.id){
                        return put
                    }else{
                        return item
                    }
                })
            );
            console.log(data);
        }
        console.log("oxi")
        setOpen && setOpen(false)
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            titulo: dataProduct?.titulo,
            categoria: dataProduct?.categoria,
            unidadeMedida: dataProduct?.unidadeMedida,
            quantidade: String(dataProduct?.quantidade),
            preco: String(dataProduct?.preco)
        }
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
                        render={({ field }) => (
                            <FormItem className="w-full flex flex-col">
                                <FormLabel className="text-black">Categoria</FormLabel>
                                <FormControl>
                                    <Input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" placeholder="Categoria" {...field} />
                                </FormControl>
                                <FormMessage className="text-[10px]" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="quantidade"
                        render={({ field }) => (
                            <FormItem className="w-full flex flex-col">
                                <FormLabel className="text-black">Quantidade</FormLabel>
                                <FormControl>
                                    {/* mateus */}
                                    <Input type="number" className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"  {...field} />
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
                                    <NumericFormat
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        thousandSeparator=" "
                                        decimalSeparator="."
                                        prefix="R$ "
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
                        name="unidadeMedida"
                        render={({ field }) => (
                            <FormItem className="w-full flex flex-col">
                                <FormLabel className="text-black">Unidade de Medida</FormLabel>
                                <FormLabel className="text-black"><pre></pre></FormLabel>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger className="col-span-3">
                                            <SelectValue placeholder="Selecione a unidade" />
                                        </SelectTrigger>
                                        <SelectContent >
                                            <SelectGroup >
                                                <SelectLabel>Unidade de Medida</SelectLabel>
                                                <SelectItem value="Grama">Grama</SelectItem>
                                                <SelectItem value="Mililitro">Mililitro</SelectItem>
                                                <SelectItem value="Unidade">Unidade</SelectItem>
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