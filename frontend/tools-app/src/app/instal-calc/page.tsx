"use client";
import "./_InstalCalc.scss"
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DynamicInput from "@/components/project/dynamicStateInput";
import Logo from "@/components/project/logo";
import { ModeToggle } from "@/components/ui/theme-toggle";
import FiberValue from "@/components/project/fiberValueAPI";
import { useState, useEffect } from "react";
import axios from "axios";
import PageBackground from "@/components/project/pageBackgorund";
export default function InstalCalc() {
  const [fiberValue, setFiberValue] = useState(0);
  const [refreshFiber, setRefreshFiber] = useState(false)
  const [installValue, setInstallValue] = useState(0);
  const handleSubmit = async () => {
    const baseUrl = "http://10.0.2.9:3000/calculadora_instalacao";

    try {
      const response = await axios.get(baseUrl);
      if (response.status === 200) {
        const valueGot = response.data;
        console.log("valor: ", valueGot);
        setFiberValue(valueGot); // Atualiza o valor da fibra
        setRefreshFiber(true); // Sinaliza que o valor foi atualizado
      } else {
        console.error("Erro:", response.status);
      }
    } catch (error) {
      console.error("Erro de rede:", error);
    }
  };

  type fiberTypes = {
    fiberLength: number,
    fiberPrice: number
  }
  const calculateResult = ({fiberLength, fiberPrice}: fiberTypes) => {
    if (fiberLength <= 300) {
        setInstallValue(100);
    } else if (fiberLength >= 300 && fiberLength <= 399) {
        setInstallValue(150);
    } else if (fiberLength >= 400 && fiberLength <= 499) {
        setInstallValue(200);
    } else if (fiberLength >= 500 && fiberLength <= 550) {
        setInstallValue(250);
    } else {
        setInstallValue(parseFloat((fiberPrice * 2 * fiberLength).toFixed(2)));
    } 
  }

  useEffect(() => {
    handleSubmit();
  }, []);

  useEffect(() => {
    if (refreshFiber) {
      setRefreshFiber(false);
    }
  }, [refreshFiber]);

  return (
    <div className="page-body h-full w-screen p-5">
      <div className="nav-bar flex flex-row items-center justify-between w-100 ">
        <Logo></Logo>
        <div className="right-container">
          <ModeToggle />
        </div>
      </div>
      <main className="page-body h-full flex flex-row items-center justify-center  w-full p-5">
        <div className="container flex flex-row w-full justify-center h-min">
          <Card className="h-min dark:bg-primary-foreground bg-primary-foreground/50 w-3/12 min-w-48">
            <CardHeader>
              <CardTitle>Preço atual do metro da fibra</CardTitle>
              <CardDescription className="text-zinc-700 dark:text-zinc-300">
                Ultimo preço da fibra baseado no banco de dados
              </CardDescription>
            </CardHeader>
            <CardContent>
              {refreshFiber ? (
                <FiberValue currentPrice={fiberValue} key={fiberValue} /> // Força a re-renderização com a key
              ) : (
                <FiberValue currentPrice={fiberValue} />
              )}
            </CardContent>
          </Card>
          <Card className="ml-4 h-min w-2/6 min-w-48">
            <CardHeader>
              <CardTitle>Calculadora de Valor de Instalação</CardTitle>
            </CardHeader>
            <CardContent>
              Valor da instalação
              <div className="main-value text-4xl w-full h-min flex flex-row justify-start items-center">
                R$ {installValue}
              </div>
            </CardContent>
            <CardFooter className="grid gap-4">
              <Input placeholder="Digite o comprimento da fibra em metros" type="number" onChange={(e) => {
                let fiberLength: number = parseInt(e.target.value) || 0
                calculateResult({ fiberLength, fiberPrice: fiberValue })
                
              }}/>
              {/* <DynamicInput onChangeFunction={(e) => {
                calculateResult()
              }} currentPrice={fiberValue}/> */}
            </CardFooter>
          </Card>
        </div>
      <PageBackground text="Calculadora" />
      </main>
    </div>
  );
}