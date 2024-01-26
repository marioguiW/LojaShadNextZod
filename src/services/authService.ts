import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies"

type loginType = {
    email: string,
    password: string
}

type Tokens = {
    accessToken: string,
    refreshToken: string
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";  // Desabilitar a rejeição de certificados não autorizados


export const authService = {

    async login(loginData: loginType) {
        try {
            return await fetch("https://localhost:7148/v1/login", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    Email: loginData.email,
                    Senha: loginData.password
                })
            }).then(async (rest) => {
                if (rest.ok) {
                    const body = {
                        ok: rest.ok,
                        status: rest.status,
                        body: await rest.json()
                    }
                    return body
                } else {
                    const body = {
                        ok: false,
                        status: 404,
                        body: {
                            errorMessage: "Usuário não encontrado"
                        }
                    }
                    return body
                }
            })
        } catch (error) {
            // console.log(error)
        }
    },
    async getSession(accessToken: string | RequestCookie | undefined) {
        try {
            return await fetch(`http://localhost:3000/v1/session?accessToken=${accessToken}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
            });
        } catch (error) {
            // console.error("getSession[ERROR]", error)
        }
    },
    async refresh(tokens: any) {
        try {
            return await fetch('http://localhost:3000/api/refresh', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(tokens),
            });
        } catch (error) {
            // console.error("Refresh[ERROR]", error);
        }
    }
}