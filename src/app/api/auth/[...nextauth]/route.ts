import axios, { AxiosError } from "axios";
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialProvider from "next-auth/providers/credentials"
import https, { Agent } from 'https';

const agent: Agent = new https.Agent({
	rejectUnauthorized: false
  });

const authOptions : NextAuthOptions = {
	providers: [
		CredentialProvider({
			name: 'credentials',
			credentials: {
				email: { label: 'email', type: 'text' },
				password: { label: 'password', type: 'password' }
			},

			async authorize(credentials, req) {
				console.log("credentialsss", credentials)
				console.log("email", credentials?.email)
				console.log("senha", credentials?.password)
		
				try {
				  const response = await axios.post("https://localhost:7148/v1/login", {
					Email: credentials?.email,
					Senha: credentials?.password
				  }, { httpsAgent: agent });
		
				  const { user } = response.data;
				  console.log("resposta => ", user);
		
				  // Retorne o objeto de usuário ou qualquer informação necessária
				  return user;
				} catch (error) {
				  if (axios.isAxiosError(error)) {
					// Se a solicitação foi feita e o servidor respondeu com um código de status fora do intervalo 2xx
					const axiosError = error as AxiosError;
					console.log("Erro de resposta do servidor:", axiosError.response?.data);
					console.log("Status do erro:", axiosError.response?.status);
					console.log("Cabeçalhos do erro:", axiosError.response?.headers);
				  } else {
					// Se houver um erro na solicitação ou se a solicitação não puder ser enviada
					console.log("Erro ao enviar a solicitação:", error);
				  }
		
				  // Retorne o erro
				  throw error;
				}
			  },
		})
	],
	pages: {
		signIn: "/"
	}
	
}

const handler = NextAuth(authOptions)

export {handler as GET, handler as POST, authOptions}