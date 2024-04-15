import axios from "axios";
import { DataTable } from "./data-table"
import { ProdutosProvider } from "@/context/ProdutosContext";
import { CadastrarProduto } from "@/components/CadastrarProduto";
import { ProductType } from "@/services/produtosService";



export async function getData(): Promise<ProductType[]> {
    const response = await axios.get("http://localhost:5193/produto/produtos");
    console.log("produtos", response)
    return response.data
}

export default async function DemoPage() {

  return (
    <ProdutosProvider >
      <div className="flex flex-col gap-5 mt-10 mx-32">
        <div className="flex justify-end">
          <CadastrarProduto/>
        </div>
        <div>
          <DataTable />
        </div>
      </div>
    </ProdutosProvider>
  )
}
