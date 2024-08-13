import Logo from "@/components/project/logo";
import { ModeToggle } from "@/components/ui/theme-toggle";
import PageBackground from "@/components/project/pageBackgorund";
import MenuCard from "@/components/project/menuCard";
import { KeyRound, Calculator, PhoneMissed } from "lucide-react";

export default function Home() {
  return (
    <div className="page-body h-full w-screen p-5">
      <div className="nav-bar flex flex-row items-center justify-between w-100 ">
        <Logo></Logo>
        <div className="right-container">
        <ModeToggle />
        </div>
      </div>
      <main className="flex h-full flex-col items-center justify-center p-24">
        <div className="main-menu w-4/6 h-3/6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <MenuCard 
          link="/password-generator"
          className="w-full transition-all  dark:hover:bg-zinc-50/5 backdrop-blur-md"
          title="Gerador de senhas" 
          description="Gerador de senhas simples"
          content="Gere senhas com a complexidade ideal para a maioria dos sites e plataformas"
          footer="v1.0"
          >
            <KeyRound />
          </MenuCard>
          <MenuCard 
          link="/"
          className="w-full transition-all  dark:hover:bg-zinc-50/5 backdrop-blur-md"
          title="Calculadora de Instalação" 
          description="Calculo de valor"
          content="Calcule o valor de instalação específica para a situação com base no ultimo custo da fibra"
          footer="v1.0"
          >
            <Calculator />
          </MenuCard>
          <MenuCard 
          link="/"
          className="w-full transition-all  dark:hover:bg-zinc-50/5 backdrop-blur-md"
          title="Limpa bloqueio Simples IP" 
          description="Liberação de acesso"
          content="Veja lista de endereços bloqueados, pesquise presença dentro da lista de bloqueio e desbloqueie "
          footer="v1.0"
          >
            <PhoneMissed />
          </MenuCard>
         
        </div>
        <PageBackground text="Home" />
      </main>
    </div>
  );
}
