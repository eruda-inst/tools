import Logo from "@/components/project/logo";
import { ModeToggle } from "@/components/ui/theme-toggle";
import PageBackground from "@/components/project/pageBackgorund";
import Link from "next/link"
import { Checkbox } from "@/components/ui/checkbox"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

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
        <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Gerador de senhas</CardTitle>
        <CardDescription>
          Preencha o formulário abaixo para criar a senha
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Quantidade de caracteres</Label>
            <Input
              id="char-ammount"
              type="number"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
          <Checkbox />
          <Checkbox />
          </div>
          <Button type="submit" className="w-full">
            Gerar senha
          </Button>
        </div>
      </CardContent>
    </Card>
        <PageBackground text="Password" />
      </main>
    </div>
  );
}
