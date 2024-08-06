import Image from "next/image";
import calc from "../app/assets/calculate.svg"
import "./_Index.scss"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <a href="/calculadora-instalacao">
        <div className="card flex flex-row items-center justify-between">
          <Image src={calc} alt="calc icon"></Image>
          <div className="tet ml-1">Calculadora de Instalação</div>
        </div>
      </a>
    </main>
  );
}
