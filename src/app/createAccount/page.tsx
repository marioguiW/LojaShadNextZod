"use client"

import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { RxCheckCircled } from "react-icons/rx";
import { RxCrossCircled } from "react-icons/rx";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import axios, { AxiosError } from "axios"
import { ButtonLoading } from "@/components/ButtonLoading"
import { Checkbox } from "@/components/ui/checkbox"

const LoginFormSchema = z.object({
  nome: z.string(),
  email: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
  cep: z.string(),
  estado: z.string(),
  cidade: z.string(),
  rua: z.string(),
  numero: z.string(),
  bairro: z.string(),
}).refine(
  (values) => {
    return values.password === values.confirmPassword;
  },
  {
    message: "Passwords must match!",
    path: ["confirmPassword"],
  }
);

export default function SelectForm() {

  const [isLoading, setIsLoading] = useState(false);
  const [erroAuth, setErroAuth] = useState();

  const abreviacoesEstados = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
  })

  useEffect(() => {
    const fetchData = async () => {
      const cepValue = form.watch('cep', '1'); 
      if (cepValue.length === 8) {
        try {
          const response = await axios.get(`https://viacep.com.br/ws/${form.watch('cep')}/json/`);
          console.log(response)
          if(response.status == 200){
            form.setValue('estado', response.data.uf)
            form.setValue('cidade', response.data.localidade)
            form.setValue('bairro', response.data.bairro)
            form.setValue('rua', response.data.logradouro)
          }
        } catch (error) {
          console.error("Erro na requisição:", error);
        }
      }
    };

    fetchData();
  }, [form.watch('cep')]);

  async function onSubmit(data: z.infer<typeof LoginFormSchema>) {
    setIsLoading(true)

    console.log(data)
    try{
      const response = await axios.post('http://localhost:5193/cliente/clientes', {
        Nome : data.nome,
        Email : data.email,
        Senha: data.password,
        Endereco: {
            Cep: parseInt(data.cep),
            Logradouro: data.rua,
            Numero: parseInt(data.numero),
            Bairro: data.bairro,
            Cidade: data.cidade
        },
      })

      console.log("foi")
    }catch(error : any){
      console.log(error.response.status)
      setErroAuth(error.response.status)
    }

    setIsLoading(false)

  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-zinc-700">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-3/5 space-y-6 bg-slate-800 p-6 rounded text-white ">
          <div className="flex gap-10">
            <div className="flex flex-col gap-5 w-full">
              <FormField
                control={form.control}
                name="nome"
                render={({ field }) => (
                  <div className="flex flex-col gap-1">
                    <FormLabel>Nome</FormLabel>
                    <Input {...field} className="rounded bg-zinc-400 text-black border-s-zinc-700 p-2" type="text" />
                    <FormMessage />
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <div className="flex flex-col gap-1 ">
                    <FormLabel>E-mail</FormLabel>
                    <Input {...field} className="rounded bg-zinc-400 text-black border-s-zinc-700 p-2" type="email" />
                    <FormMessage />
                  </div>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <div className="flex flex-col gap-1">
                    <FormLabel className="flex gap-2">Senha {form.watch('password') && !form.watch('confirmPassword') ?
                      <RxCheckCircled color="green" />
                      : !form.watch('password') ? <></> : form.watch('password') != form.watch('confirmPassword')
                        ? <RxCrossCircled color="red" /> : <RxCheckCircled color="green" />
                    }
                    </FormLabel>
                    <Input {...field} className="rounded bg-zinc-400 text-black border-s-zinc-700 p-2" type="password" />
                    <FormMessage />
                  </div>
                )}
              />
              <FormField
                name="confirmPassword"
                render={({ field }) => (
                  <div className="flex flex-col gap-1">
                    <FormLabel className="flex gap-2">Confirmar Senha {form.watch('confirmPassword') && form.watch('confirmPassword') == form.watch('password') ?
                      <RxCheckCircled color="green" />
                      : form.watch('confirmPassword') ? <RxCrossCircled color="red" />
                        : <></>}
                    </FormLabel>
                    <Input {...field} className="rounded bg-zinc-400 text-black border-s-zinc-700 p-2" type="password" />
                    <FormMessage />
                  </div>
                )}
              />
            </div>
            <div className="flex flex-col gap-5 w-full ">
              <FormField
                control={form.control}
                name="cep"
                render={({ field }) => (
                  <div className="flex flex-col gap-1">
                    <FormLabel>Cep</FormLabel>
                    <Input {...field} className="rounded bg-zinc-400 text-black border-s-zinc-700 p-2" type="text" />
                    <FormMessage />
                  </div>
                )}
              />
              <div className="flex gap-3">
                <FormField
                  control={form.control}
                  name="cidade"
                  render={({ field }) => (
                    <div className="flex flex-col gap-1 w-full">
                      <FormLabel>Cidade</FormLabel>
                      <Input {...field} className="rounded bg-zinc-400 text-black border-s-zinc-700 p-2 w-full" type="text" />
                      <FormMessage />
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="estado"
                  render={({ field }) => (
                    <div className="flex flex-col w-[25%] gap-1">
                      <FormLabel>Estado</FormLabel>
                      <Select {...field} >
                        <FormControl className="rounded bg-zinc-400 h-10 text-black border-s-zinc-700 p-2 w-full">
                          <SelectTrigger >
                            <SelectValue className="rounded bg-zinc-400 text-black border-s-zinc-700 p-2" placeholder="" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded bg-zinc-400 text-black border-s-zinc-700 p-2">
                          {abreviacoesEstados.map((estadoAbrev) => (
                            <SelectItem className="" key={estadoAbrev} value={estadoAbrev}>
                              {estadoAbrev}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </div>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="bairro"
                render={({ field }) => (
                  <div className="flex flex-col gap-1 w-full">
                    <FormLabel>Bairro</FormLabel>
                    <Input {...field} className="rounded bg-zinc-400 text-black border-s-zinc-700 p-2 w-full" />
                    <FormMessage />
                  </div>
                )}
              />
              <div className="flex gap-3">
                <FormField
                  control={form.control}
                  name="rua"
                  render={({ field }) => (
                    <div className="flex flex-col gap-1 w-full">
                      <FormLabel>Rua</FormLabel>
                      <Input {...field} className="rounded bg-zinc-400 text-black border-s-zinc-700 p-2 w-full" />
                      <FormMessage />
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="numero"
                  render={({ field }) => (
                    <div className="flex flex-col gap-1 w-[25%]">
                      <FormLabel>Numero</FormLabel>
                      <Input {...field} className="rounded bg-zinc-400 text-black border-s-zinc-700 p-2 w-full" />
                      <FormMessage />
                    </div>
                  )}
                />

              </div>
            </div>
          </div>
          <div className="items-top flex space-x-2">
            <Checkbox type="button" id="terms1" />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="terms1"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Accept terms and conditions
              </label>
            </div>
          </div>



          {erroAuth == 409 ? <h6 className="text-red-500">Email já está em uso</h6> : null}

          <div className="flex items-center justify-center">
            {isLoading ? <ButtonLoading /> : <Button className="w-[50%] bg-emerald-500 hover:bg-emerald-600" type="submit">Criar conta</Button>}
          </div>

          <div className="flex flex-col gap-4 items-center min-w-max">
            <label htmlFor="" className="text-sm">Already have an account? <Link href='/' className="text-blue-300 hover:underline">Sign in</Link></label>
          </div>
        </form>
      </Form>
    </main>
  )
}
