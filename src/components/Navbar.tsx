import Link from "next/link";
import { Button } from "./ui/button";


export default function Navbar() {

  return (
    <header className="flex p-8 bg-rose-300">
      <nav className="flex justify-between m-auto w-[80%]">
        <div className="text-white text-2xl">Logo</div>
        <div>
          <ul className="flex gap-20 text-lg">
            <li>
              <Link href='/produtos' className="text-white hover:duration-75 hover:underline	">Produtos</Link>
            </li>
            <li>
              <Link href='/produtos' className="text-white hover:underline">Produtos</Link>
            </li>
            <li>
              <Link href='/produtos' className="text-white hover:underline">Produtos</Link>
            </li>
          </ul>
        </div>
      </nav>
      <Button className="bg-red-400 hover:bg-red-500">
        <Link href="/logout">Logout</Link>
      </Button>
    </header>
  )
} 
