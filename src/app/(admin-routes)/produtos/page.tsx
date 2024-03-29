import axios from "axios";
import { Payment, columns } from "./columns"
import { DataTable } from "./data-table"
import { useState } from "react";



export async function getData(): Promise<Payment[]> {
    const response = await axios.get("http://localhost:5193/produto/produtos");

    console.log(response)

    return response.data


}

export default async function DemoPage() {

  const data = await getData()
  console.log("columns", columns)
  console.log("data", data)

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} dado={data} />
    </div>
  )
}
