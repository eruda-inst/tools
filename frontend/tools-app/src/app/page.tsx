import PageBackground from "@/components/project/pageBackgorund";
import MenuCard from "@/components/project/menuCard";
import { KeyRound, Calculator, PhoneMissed, Car, ListChecks, FileChartColumn } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/project/header";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { 
  Card, 
  CardDescription, 
  CardContent, 
  CardFooter,
  CardHeader,
  CardTitle 
} from "@/components/ui/card";
export default function Home() {
  return (
    <div className="page-body h-full w-screen">
      <Header/>
      <main className="flex h-full w-fill flex-col items-center justify-center p-10 sm:p-24">
        <div className="main-menu w-fill h-3/6 grid grid-cols-1 gap-4 md:grid-cols-4">
        <Card>
        <CardHeader>
          <Car/>
          <CardTitle>Checklist de carro</CardTitle>
          <CardDescription>Controle de integridade veicular</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-col h-full w-full ">
            <Link href={"/"} className="w-full">
            <Button className="flex w-full justify-between">
            <ListChecks className="mr-2 h-4 w-4"/>
               Responder Formulário
            <ListChecks className="opacity-0 mr-2 h-4 w-4"/>
               </Button>
            </Link>
            <Link href={"/reports"} className="w-full">
            <Button className="flex justify-between w-full" variant={"secondary"} >
            <FileChartColumn className="mr-2 h-4 w-4"/>
              Ver Respostas
            <FileChartColumn className="opacity-0 mr-2 h-4 w-4"/>
              </Button>
            </Link>
          </div>
        </CardContent>
        <CardFooter>
          <p>v1.0</p>
        </CardFooter>
      </Card>
          <MenuCard
            link="/password-generator"
            className="w-full transition-all  dark:hover:bg-zinc-50/5 backdrop-blur-md"
            title="Gerador de senhas"
            description="Gerador de senhas simples"
            content="Gere senhas com a complexidade ideal para a maioria dos sites e plataformas de maneira aleatória"
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
