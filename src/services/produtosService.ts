import axios, { AxiosError, AxiosResponse } from "axios"

export type ProductType = {
    id?: number ,
    titulo: string,
    categoria: string,
    unidadeMedida: string,
    quantidade: number,
    preco: number,
    urlImagem: any
}

export async function getProduct(): Promise<ProductType[]> {
    const get = await axios.get("http://localhost:5193/produto/produtos");
    return get.data
}

export async function postProduct(dataProduct : ProductType) : Promise<ProductType> {
    console.log('Data no post', dataProduct)
    const post = await axios.post("http://localhost:5193/produto/produtos", {
        Categoria: dataProduct.categoria,
        Preco: dataProduct.preco,
        Quantidade: dataProduct.quantidade,
        Titulo: dataProduct.titulo,
        UnidadeMedida: dataProduct.unidadeMedida,
        UrlImagem: dataProduct.urlImagem
    })
    console.log("post", post)
    return post.data;
}

export async function putProduct(newDataProduct: ProductType) : Promise<ProductType> {
    const put = await axios.put(`http://localhost:5193/produto/produtos/${newDataProduct.id}`, {
        id: newDataProduct.id,
        categoria: newDataProduct.categoria,
        preco: newDataProduct.preco,
        quantidade: newDataProduct.quantidade,
        titulo: newDataProduct.titulo,
        unidadeMedida: newDataProduct.unidadeMedida,
        UrlImagem: newDataProduct.urlImagem
    })

    return put.data
}

export async function deleteProduct(id: number | undefined) {
    const response = await axios.delete(`http://localhost:5193/produto/produtos/${id}`)
    return response.data
}