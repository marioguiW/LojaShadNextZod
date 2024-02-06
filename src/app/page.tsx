'use client'
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { authService } from "@/services/authService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Cookie from 'js-cookie'
import { ButtonLoading } from "@/components/ButtonLoading";
import Link from "next/link";

const loginFormSchema = z.object({
  email: z.string().nonempty("O campo de email é obrigatório"),
  password: z.string()
    .nonempty("O campo de senha é obrigatório")
})

type LoginFormData = z.infer<typeof loginFormSchema>

export default function Home() {

  const [isLoading, setIsLoading] = useState(false)
  const [erroAuth, setErroAuth] = useState(false)
  const [output, setOutput] = useState('')
  const router = useRouter()
  const { register, handleSubmit, formState: { errors }, control } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema)
  })

  async function login(data: any) {
    setIsLoading(true)
    setOutput(JSON.stringify(data, null, 2))
    const login = await authService.login(data)
    console.log(login)
    if (login?.status == 200) {
      Cookie.set('ACCESS_TOKEN', login.body.user.accessToken)
      Cookie.set('REFRESH_TOKEN', login.body.user.refreshToken)

      router.replace('/dashboard')
    } else {
      setIsLoading(false)
      setErroAuth(true)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-zinc-700">
      <form onSubmit={handleSubmit(login)} onFocus={() => setErroAuth(false)} className="p-6 rounded bg-slate-800 text-white flex flex-col gap-5 max-w-sm w-full">
        <div className="flex flex-col gap-1">
          <label htmlFor="">E-mail</label>
          <input {...register('email')} className="rounded bg-zinc-400 text-black border-s-zinc-700 p-2" type="text" />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="">Senha</label>
          <input {...register('password')} className="rounded bg-zinc-400 text-black border-s-zinc-700 p-2" type="password" />
          {errors.password && <span>{errors.password.message}</span>}
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
        {erroAuth ? <h6 className="text-red-500">E-mail ou senha inválidos</h6> : null}
        {isLoading ? <ButtonLoading /> : <Button type="submit" >Entrar</Button>}
        <div className="flex flex-col gap-4 items-center min-w-max">
          <label htmlFor="" className="text-sm">New in Shop?</label>
          <Button type="button" className="w-[100%] bg-zinc-500 hover:bg-zinc-500 hover:bg-opacity-70">
            <Link href='/createAccount'>
              Create your Shop account
            </Link>
          </Button>
        </div>
      </form>
      <pre>
        {output}
      </pre>
    </main>
  );
}
