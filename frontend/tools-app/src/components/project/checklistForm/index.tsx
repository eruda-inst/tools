"use client";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { API } from "@/config/env";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import SelectCar from "./selectCar/selectCar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRef, useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function Form() {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.focus();
    }
  }, []);

  const [formData, setFormData] = useState({
    data_inspecao: new Date().toISOString(),
    veiculo_id: "1",
    tecnico_id: 0,
    freio_pe: "ruim",
    freio_estacionamento: "ruim",
    motor_partida: "ruim",
    limpador_parabrisa: "ruim",
    lavador_parabrisa: "ruim",
    buzina: "ruim",
    farois: "ruim",
    lanternas_dianteiras: "ruim",
    lanternas_traseiras: "ruim",
    luz_freio: "ruim",
    luz_re: "ruim",
    triangulo_advertencia: "ruim",
    extintor_seguranca: "ruim",
    espelhos_retrovisores: "ruim",
    indicadores_painel: "ruim",
    condicao_pneus: "ruim",
    pneu_step: "ruim",
    vidros: "ruim",
    portas: "ruim",
    cinto_seguranca: "ruim",
    macaco: "ruim",
    chave_roda: "ruim",
    nivel_oleo: "ruim",
    nivel_fluido_freio: "ruim",
    nivel_agua: "ruim",
    ruido_interno: "ruim",
    lataria: "ruim",
    cones_sinalizacao: "ruim",
    suspensao: "ruim",
    reservatorio_agua: "ruim",
    trava_portas: "ruim",
    parabrisa: "ruim",
    engrenagem: "ruim",
    manchas_geral: "ruim",
    borracha_portas: "ruim",
    quilometragem: 0,
  });

  const [buttonStatus, setButtonStatus] = useState({
    disabled: true,
  });
  const handleRadioChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value,
    });
    if (formData.tecnico_id != 0 && formData.quilometragem != 0) {
      setButtonStatus({
        ...buttonStatus,
        disabled: false,
      });
    } else {
      ({
        ...buttonStatus,
        disabled: true,
      });
    }
  };

  const handleCarChange = (value: string) => {
    setFormData({
      ...formData,
      veiculo_id: value, // Atualiza o veiculo_id com o valor selecionado
    });
    if (formData.tecnico_id != 0 && formData.quilometragem != 0) {
      setButtonStatus({
        ...buttonStatus,
        disabled: false,
      });
    } else {
      ({
        ...buttonStatus,
        disabled: true,
      });
    }
  };
  const checklistItems = [
    { label: "Freio de pé", key: "freio_pe" },
    { label: "Freio de estacionamento", key: "freio_estacionamento" },
    { label: "Motor de partida", key: "motor_partida" },
    { label: "Limpador de para-brisa", key: "limpador_parabrisa" },
    { label: "Lavador de para-brisa", key: "lavador_parabrisa" },
    { label: "Buzina", key: "buzina" },
    { label: "Faróis", key: "farois" },
    { label: "Lanternas Dianteiras", key: "lanternas_dianteiras" },
    { label: "Lanternas Traseiras", key: "lanternas_traseiras" },
    { label: "Luz de Freio", key: "luz_freio" },
    { label: "Luz de Ré", key: "luz_re" },
    { label: "Triângulo de Advertência", key: "triangulo_advertencia" },
    { label: "Extintor de Segurança", key: "extintor_seguranca" },
    { label: "Espelhos Retrovisores", key: "espelhos_retrovisores" },
    { label: "Indicadores do Painel", key: "indicadores_painel" },
    { label: "Condição dos Pneus", key: "condicao_pneus" },
    { label: "Pneu de Step", key: "pneu_step" },
    { label: "Vidros", key: "vidros" },
    { label: "Portas", key: "portas" },
    { label: "Cinto de Segurança", key: "cinto_seguranca" },
    { label: "Macaco", key: "macaco" },
    { label: "Chave de Roda", key: "chave_roda" },
    { label: "Nível de Óleo", key: "nivel_oleo" },
    { label: "Nível de Fluido de Freio", key: "nivel_fluido_freio" },
    { label: "Nível de Água", key: "nivel_agua" },
    { label: "Ruído Interno", key: "ruido_interno" },
    { label: "Lataria", key: "lataria" },
    { label: "Cones de Sinalização", key: "cones_sinalizacao" },
    { label: "Suspensão", key: "suspensao" },
    { label: "Reservatório de Água", key: "reservatorio_agua" },
    { label: "Trava das Portas", key: "trava_portas" },
    { label: "Parabrisa", key: "parabrisa" },
    { label: "Engrenagem", key: "engrenagem" },
    { label: "Manchas Gerais", key: "manchas_geral" },
    { label: "Borracha das Portas", key: "borracha_portas" },
  ];

  const { toast } = useToast();
  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${API.CHECKLIST}/api/checklist_form`,
        formData
      );
      console.log("Dados enviados com sucesso:", response.data.message);
      toast({
        title: "Dados enviados",
        description: `${response.data.message}`,
      });
    } catch (error) {
      toast({
        title: "Erro ao enviar dados",
        description: `${error}`,
      });
      console.error("Erro ao enviar dados:", error);
    }
  };
  return (
    <Card className="main-card sm:w-96 sm:h-min sm:bg-card sm:border bg-transparent border-none w-full h-full">
      <CardHeader>
        <CardTitle>Formulário de checklist de carro</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea
          className="sm:h-[40vh] h-[40vh] outline-none"
          ref={scrollAreaRef}
          tabIndex={-1}
        >
          <Table>
            <TableCaption></TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-4/6">Itens Avaliados</TableHead>
                <TableHead>
                  <div className="flex flex-row justify-around">
                    <span>Ok</span>
                    <span>Ruim</span>
                  </div>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {checklistItems.map((item) => (
                <TableRow key={item.key}>
                  <TableCell className="font-medium">{item.label}</TableCell>
                  <TableCell>
                    <RadioGroup
                      defaultValue="ruim"
                      className="flex flex-row justify-around"
                      onValueChange={(value) =>
                        handleRadioChange(item.key, value)
                      }
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          className="text-emerald-500"
                          value="ok"
                          id={`${item.key}-ok`}
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          className="text-rose-500"
                          value="ruim"
                          id={`${item.key}-ruim`}
                        />
                      </div>
                    </RadioGroup>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
      <CardFooter className="flex gap-3 flex-col justify-between">
        <SelectCar onCarChange={handleCarChange} />
        <Input
          placeholder="Código do tecnico"
          type="number"
          onChange={(e) => {
            setFormData({ ...formData, tecnico_id: parseInt(e.target.value) });
            if (formData.tecnico_id != 0 && formData.quilometragem != 0) {
              setButtonStatus({
                ...buttonStatus,
                disabled: false,
              });
            } else {
              ({
                ...buttonStatus,
                disabled: true,
              });
              handleCarChange;
            }
          }}
        />
        <Input
          placeholder="Quilometragem"
          type="number"
          onChange={(e) => {
            setFormData({
              ...formData,
              quilometragem: parseInt(e.target.value),
            });
            if (formData.tecnico_id != 0 && formData.quilometragem != 0) {
              setButtonStatus({
                ...buttonStatus,
                disabled: false,
              });
            } else {
              ({
                ...buttonStatus,
                disabled: true,
              });
            }
            handleCarChange;
          }}
        />
        <AlertDialog>
          <AlertDialogTrigger
            asChild
            disabled={buttonStatus.disabled}
            className="w-full"
          >
            <Button className="w-full">Continuar</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Está certo de seu relatório?</AlertDialogTitle>
              <AlertDialogDescription>
                Ao clicar em Enviar estará submetendo as respostas do formulário
                para o banco de dados da empresa.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleSubmit}>
                Enviar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
