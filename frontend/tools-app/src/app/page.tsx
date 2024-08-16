import Logo from "@/components/project/logo";
import { ModeToggle } from "@/components/ui/theme-toggle";
import PageBackground from "@/components/project/pageBackgorund";
import MenuCard from "@/components/project/menuCard";
import { KeyRound, Calculator, PhoneMissed } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

export default function Home() {
  return (
    <div className="page-body h-full w-screen">
      <div className="nav-bar flex flex-row items-center justify-between w-full fixed  p-5">
        <Logo></Logo>
        <div className="right-container">
          <ModeToggle />
        </div>
      </div>
      <main className="flex h-full w-fill flex-col items-center justify-center p-10 sm:p-24">
        <div className="main-menu w-fill h-3/6 grid grid-cols-1 gap-4 md:grid-cols-3">
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
            link="/instal-calc"
            className="w-full transition-all  dark:hover:bg-zinc-50/5 backdrop-blur-md"
            title="Calculadora de Instalação"
            description="Calculo de valor"
            content="Calcule o valor de instalação específica para a situação com base no ultimo custo da fibra"
            footer="v1.0.1"
          >
            <Calculator />
          </MenuCard>
          <MenuCard
            link="http://10.0.2.9:3000/limpabloqueio.html"
            className="w-full transition-all sm:m-0 mb-10 dark:hover:bg-zinc-50/5 backdrop-blur-md"
            title="Limpa bloqueio Simples IP"
            description="Liberação de acesso"
            content="Veja lista de endereços bloqueados, pesquise presença dentro da lista e desbloqueie"
            footer="v0.1"
          >
            <div className="flex flex-row justify-between">
              <PhoneMissed />
              <HoverCard>
               <Badge variant={"default"}>Beta</Badge>
                <HoverCardContent className="dark:bg-zinc-900/60 bg-zinc-50/50 backdrop-blur-md">
                  O sistema já roda em um outro servidor mas ainda não teve updates de frontend para se encaixar com o padrão atual
                </HoverCardContent>
              </HoverCard>

              
            </div>
          </MenuCard>
        </div>
        <PageBackground text="Home" />
      </main>
    </div>
  );
}
