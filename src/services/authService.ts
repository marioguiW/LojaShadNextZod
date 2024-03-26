import axios from "axios"
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies"

type loginType = {
    email: string,
    password: string
}

type Tokens = {
    accessToken: string,
    refreshToken: string
}


export const authService = {

    async login(loginData: loginType) {
        try {
            return await fetch("http://localhost:5193/v1/login", {
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
            console.log(error)
        }
    },
    async getSession(accessToken: string | RequestCookie | undefined) {
        try {
            console.log("testando");
    
            const response = await fetch(`http://localhost:5193/v1/session?accessToken=${accessToken}`, {
                headers: {
                    "Content-Type": "application/json"
                },
            });
    
            if (response.ok) {
                const body = {
                    ok: response.ok,
                    status: response.status,
                    body: await response.text()
                };
                return body;
            } else {
                const errorText = await response.text(); // Read the response as text
                const body = {
                    ok: response.ok,
                    status: response.status,
                    error: errorText // Include the error text in the response
                };
                return body;
            }
        } catch (error) {
            console.error("getSession[ERROR]", error);
        }
    },
    async refresh(tokens: any) {
        try {
            const response = await fetch('http://localhost:5193/v1/refresh', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(tokens),
            });

            if (response.ok) {
                const body = {
                    ok: response.ok,
                    status: response.status,
                    body: await response.json()
                };
                return body;
            } else {
                const errorText = await response.text();
                const body = {
                    ok: response.ok,
                    status: response.status,
                    error: errorText
                };
                return body;
            }
        } catch (error) {
            console.error("Refresh[ERROR]", error);
        }
    }
}