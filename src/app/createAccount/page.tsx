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
import { isSet } from "util/types";
import { RxCheckCircled } from "react-icons/rx";
import { RxCrossCircled } from "react-icons/rx";



const loginFormSchema = z.object({
    nome: z.string().nonempty(),
    email: z.string().nonempty("O campo de email é obrigatório"),
    password: z.string()
        .nonempty("O campo de senha é obrigatório")
})

type LoginFormData = z.infer<typeof loginFormSchema>

export default function CreateAccountPage() {

    const [isLoading, setIsLoading] = useState(false)
    const [erroAuth, setErroAuth] = useState(false)
    const [output, setOutput] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const router = useRouter()
    const { register, handleSubmit, formState: { errors }, control } = useForm<LoginFormData>({
        resolver: zodResolver(loginFormSchema)
    })

    async function signUp(infos: LoginFormData) {
        console.log(infos)
    }

    return (
        <main className="flex min-h-screen flex-col items-center p-24 bg-zinc-700">
            <form onSubmit={handleSubmit(signUp)} onFocus={() => setErroAuth(false)} className="p-6 flex rounded flex-col bg-slate-800 text-white max-w-3xl w-full gap-4 ">
                <div className="flex gap-10 ">
                    <div className="flex flex-col gap-5 w-full border-2 border-red-500">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="">Nome</label>
                            <input {...register('nome')} className="rounded bg-zinc-400 text-black border-s-zinc-700 p-2" type="text" />
                            {errors.nome && <span>{errors.nome.message}</span>}
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="">E-mail</label>
                            <input {...register('email')} className="rounded bg-zinc-400 text-black border-s-zinc-700 p-2" type="email" />
                            {errors.email && <span>{errors.email.message}</span>}
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="">Senha { }</label>
                            <input value={password} onChange={(a) => setPassword(a.target.value)} className="rounded bg-zinc-400 text-black border-s-zinc-700 p-2" type="password" />
                            {errors.password && <span>{errors.password.message}</span>}
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="" className="flex items-center gap-2">Confirmar Senha {confirmPassword && confirmPassword == password ? <RxCheckCircled color="green" /> : confirmPassword ? <RxCrossCircled color="red" /> : <></>}</label>
                            <input value={confirmPassword} onChange={(a) => setConfirmPassword(a.target.value)} className="rounded bg-zinc-400 text-black border-s-zinc-700 p-2" type="password" />
                            {errors.password && <span>{errors.password.message}</span>}
                        </div>


                    </div>
                    <div className="flex flex-col gap-5 w-full">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="">CEP</label>
                            <input {...register('nome')} className="rounded bg-zinc-400 text-black border-s-zinc-700 p-2" type="text" />
                            {errors.nome && <span>{errors.nome.message}</span>}
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="">Estado</label>
                            <input {...register('email')} className="rounded bg-zinc-400 text-black border-s-zinc-700 p-2" type="email" />
                            {errors.email && <span>{errors.email.message}</span>}
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="">Cidade</label>
                            <input value={password} onChange={(a) => setPassword(a.target.value)} className="rounded bg-zinc-400 text-black border-s-zinc-700 p-2" type="password" />
                            {errors.password && <span>{errors.password.message}</span>}
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="" className="flex items-center gap-2">Confirmar Senha {confirmPassword && confirmPassword == password ? <RxCheckCircled color="green" /> : confirmPassword ? <RxCrossCircled color="red" /> : <></>}</label>
                            <input value={confirmPassword} onChange={(a) => setConfirmPassword(a.target.value)} className="rounded bg-zinc-400 text-black border-s-zinc-700 p-2" type="password" />
                            {errors.password && <span>{errors.password.message}</span>}
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
                {erroAuth ? <h6 className="text-red-500">E-mail ou senha inválidos</h6> : null}
                <div className="flex items-center justify-center">
                    {isLoading ? <ButtonLoading /> : <Button className="w-[50%] bg-emerald-500 hover:bg-emerald-600" type="submit" >Criar conta</Button>}
                </div>
                <div className="flex flex-col gap-4 items-center min-w-max">
                    <label htmlFor="" className="text-sm">Already have account? <Link href='/' className="text-blue-300 hover:underline">Sign in</Link></label>
                </div>
            </form>
            <pre>
                {output}
            </pre>
        </main>
    );
}
