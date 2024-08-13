"use client";

import Logo from "@/components/project/logo";
import axios from "axios"
import { ModeToggle } from "@/components/ui/theme-toggle";
import PageBackground from "@/components/project/pageBackgorund";
import { CheckboxnLabel } from "@/components/project/checkbox";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Home() {
  const [inputNumberValue, setInputNumberValue] = useState(8);
  const [includeUpperCases, setIncludeUpperCases] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeSpecialCharacters, setIncludeSpecialCharacters] =
    useState(false);
  const [passwordButton, setPasswordButton] = useState({
    text: "Gerar senha",
    copyMode: false,
  });

  const handleSubmit = async () => {
    const baseUrl = 'http://10.0.2.9:3000/generate-password';
    const params = {
      length: inputNumberValue, 
      uppercase: includeUpperCases, 
      numbers: includeNumbers, 
      special: includeSpecialCharacters, 
    };

    try {
      const response = await axios.get(baseUrl, { params });

      if (response.status === 200) {
        const generatedPassword = response.data; // Supondo que a resposta contenha a senha gerada
        console.log('Senha gerada:', generatedPassword);
        return generatedPassword
      } else {
        console.error('Erro:', response.status);
        return "error"
      }
    } catch (error) {
      console.error('Erro de rede:', error);
      return error
    }
  };

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
                  onChange={(e) => {
                    let eventValue = parseInt(e.target.value);
                    if (eventValue > 32) {
                      eventValue = 32;
                      setInputNumberValue(eventValue);
                    } else {
                      setInputNumberValue(eventValue);
                    }
                  }}
                  id="char-ammount"
                  type="number"
                  placeholder="8"
                  value={inputNumberValue}
                  required
                />
              </div>
              <div className="grid gap-2">
                <CheckboxnLabel
                  label="Incluir Letras Maiúsculas"
                  checked={includeUpperCases}
                  onChange={setIncludeUpperCases}
                />
                <CheckboxnLabel
                  label="Incluir Números"
                  checked={includeNumbers}
                  onChange={setIncludeNumbers}
                />
                <CheckboxnLabel
                  label="Incluir Caracteres Especiais"
                  checked={includeSpecialCharacters}
                  onChange={setIncludeSpecialCharacters}
                />
              </div>
              <Button
                type="submit"
                className="w-full transition-all"
                onClick={async (e) => {
                  if (passwordButton.copyMode) {
                    setPasswordButton({ text: "Gerar Senha", copyMode: false });
                    await navigator.clipboard.writeText(passwordButton.text);
                    console.log("Senha copiada para o clipboard!");
                  } else {
                    const response = await handleSubmit()
                    setPasswordButton({ text: response, copyMode: true });
                  }
                }}
              >
                <div className="buttoncontent flex flex-row items-center justify-between w-full">
                  <Copy opacity={0} />
                  {passwordButton.text}
                  <Copy
                    className="h-5 transition-all"
                    opacity={passwordButton.copyMode ? 1 : 0}
                  />
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
        <PageBackground text="Password" />
      </main>
    </div>
  );
  }
