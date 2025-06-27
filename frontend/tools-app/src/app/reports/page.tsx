"use client";
import Header from "@/components/project/header";
import { useEffect, useState } from "react";
import axios from "axios";
import PageBackground from "@/components/project/pageBackgorund";
import { API } from "@/config/env";
import { isSameDay, add } from 'date-fns';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import "./_Reports.scss";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
 
import * as React from "react"
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { ListChecks } from "lucide-react"
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { link } from "fs";

export default function Reports() {
  const [cars, setCars] = useState<{ id: number; modelo: string }[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [plates, setPlates] = useState<string[]>([]); // Estado para armazenar as placas
  const [selectedCar, setSelectedCar] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | string | undefined>("");
  const [selectedPlate, setSelectedPlate] = useState<string>(""); // Estado para a placa selecionada
  const [reports, setReports] = useState<any[]>([]);
  const [techs, setTechs] = useState<{ id: number; nome: string }[]>([]);
  const [expandedReportId, setExpandedReportId] = useState<number | null>(null);

  useEffect(() => {
    async function fetchData() {
      const carsResponse = await axios.get(API.CHECKLIST + "/api/cars_list");
      setCars(carsResponse.data);
      const techsResponse = await axios.get(API.CHECKLIST + "/api/techs");
      setTechs(techsResponse.data);
    }
    fetchData();
  }, []);

  // Função para buscar placas e datas baseadas no carro selecionado
  const handleCarSelection = async (carId: string) => {
    setSelectedCar(carId);
    setSelectedPlate(""); // Limpar a placa selecionada ao mudar o carro
    setSelectedDate(""); // Limpar a data selecionada ao mudar o carro

    if (carId) {
      // Fazer requisições para obter as placas e datas relacionadas ao carro selecionado
      const platesResponse = await axios.get(
        API.CHECKLIST + `/api/plates_by_car`,
        { params: { veiculo_id: carId } }
      );
      const datesResponse = await axios.get(
        API.CHECKLIST + `/api/dates_by_car`,
        { params: { veiculo_id: carId } }
      );
      console.log(datesResponse)

      setPlates(platesResponse.data);
      setDates(datesResponse.data);
    } else {
      // Se não houver carro selecionado, limpar as placas e datas
      setPlates([]);
      setDates([]);
    }
    
  };
  const [date, setDate] = useState<Date>()

  const fetchReports = async () => {
    const formatedDate = date ? format(date, "MM-dd-yyyy") : ""
    try {
      const params: any = {};
      if (selectedCar) {
        params.veiculo_id = selectedCar;
      }
      if (formatedDate) {
        params.data_inspecao = formatedDate;
      }
      if (selectedPlate) {
        params.placa = selectedPlate;
      }
      console.log(params)
      console.log(date)
      const response = await axios.get(API.CHECKLIST + "/api/reports", {
        params,
      });
      setReports(response.data);
    } catch (error) {
      console.error("Erro ao carregar relatórios", error);
    }
  };

  const toggleExpand = (reportId: number) => {
    setExpandedReportId((prevId) => (prevId === reportId ? null : reportId));
  };

  const isDateAllowed = (date: Date) => {
    
    return dates.some((allowedDate) => isSameDay(add(date, { days: -1 }), allowedDate) );
  };

  const getTechName = (tecnico_id: number) => {
    const tech = techs.find((t) => t.id === tecnico_id);
    return tech ? tech.nome : "Desconhecido";
  };


  return (
    <div className="page-body h-full  w-screen">
      <Header />
      <main className="page-body h-screen flex flex-col gap-3 items-center justify-start  w-full pt-28 p-5 ">
        <Card className="sm:w-2/6 sm:border-2 sm:border-zinc-300 w-full border-none ">
          <CardHeader className="">
            <CardTitle className="">Relatórios de Inspeção</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Filtro de Carro */}

            <Label htmlFor="select-car-input">Selecionar carro</Label>

            <Select onValueChange={(value) => handleCarSelection(value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione um carro" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Carros</SelectLabel>
                  <SelectItem value=" ">Todos os carros</SelectItem>

                  {cars.map((car) => (
                    <SelectItem key={car.id} value={`${car.id}`}>
                      {car.modelo}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Filtro de Placa - Aparece apenas se houver placas disponíveis */}
            {plates.length > 0 && (
              <div>
                <Label className="">Selecionar Placa</Label>
                <Select onValueChange={(value) => setSelectedPlate(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecionar uma placa" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value=" ">Todas as placas</SelectItem>
                    {plates.map((plate) => (
                      <SelectItem key={plate} value={plate}>
                        {plate}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Filtro de Data - Aparece apenas se houver datas disponíveis */}
            {dates.length > 0 && (
              <div className="">
                <Label>Selecionar Data</Label>
                <Popover >
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Escolha uma data</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                      disabled={(date) =>{
                        return !isDateAllowed(date)
                      } 
                    }
                    />
                  </PopoverContent>
                </Popover>
                
              </div>
            )}
           

            {/* Listagem dos relatórios */}
            <div className="mt-6">
              {reports.length > 0 ? (
                reports.map((report) => (
                  <div key={report.id} className="mb-4 rounded-lg">
                    <Button
                    variant={"secondary"}
                      className="w-full flex flex-row justify-between"
                      onClick={() => toggleExpand(report.id)}
                    >
                      <ListChecks></ListChecks>
                      {`Relatório ${report.id} de ${report.placa}  em ${new Date(
                        add(report.data_inspecao, {days: 1})
                      ).toLocaleDateString()}`}
                      <ListChecks className="text-transparent"></ListChecks>
                    </Button>

                    {expandedReportId === report.id && (
                     
                      <Table className="mt-2 space-y-2">
                          <TableHeader>
                            <TableRow>
                                <TableHead >Atributo</TableHead>
                                <TableHead >Resposta</TableHead>
                            </TableRow>
                          </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>
                              Técnico 
                            </TableCell>
                            <TableCell>
                              {getTechName(report.tecnico_id)}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              Quilometragem 
                            </TableCell>
                            <TableCell>
                              {report.quilometragem}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              Freio de pé 
                            </TableCell>
                            <TableCell>
                              {report.freio_pe}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              Freio de Estacionamento
                            </TableCell>
                            <TableCell>
                              {report.freio_estacionamento}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              Motor de Partida
                            </TableCell>
                            <TableCell>
                              {report.motor_partida}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              Limpador de Parabrisa
                            </TableCell>
                            <TableCell>
                              {report.limpador_parabrisa}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              Lavador de Parabrisa
                            </TableCell>
                            <TableCell>
                              {report.lavador_parabrisa}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              Buzina
                            </TableCell>
                            <TableCell>
                              {report.buzina}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              Faróis
                            </TableCell>
                            <TableCell>
                              {report.farois}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              Lanternas Dianteiras
                            </TableCell>
                            <TableCell>
                              {report.lanternas_dianteiras}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              Lanternas Traseiras
                            </TableCell>
                            <TableCell>
                              {report.lanternas_traseiras}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              Luz de Freio
                            </TableCell>
                            <TableCell>
                              {report.luz_freio}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              Luz Traseira
                            </TableCell>
                            <TableCell>
                              {report.luz_re}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              Triangulo de Advertência Traseiras
                            </TableCell>
                            <TableCell>
                              {report.triangulo_advertencia}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              Extintor de Segurança
                            </TableCell>
                            <TableCell>
                              {report.lanternas_traseiras}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              Espelhos Retrovisores
                            </TableCell>
                            <TableCell>
                              {report.espelhos_retrovisores}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              Indicadores de Painel
                            </TableCell>
                            <TableCell>
                              {report.indicadores_painel}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              Condição dos Pneus
                            </TableCell>
                            <TableCell>
                              {report.condicao_pneus}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              Pneu Step
                            </TableCell>
                            <TableCell>
                              {report.pneu_step}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              Lanternas Traseiras
                            </TableCell>
                            <TableCell>
                              {report.lanternas_traseiras}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              Vidros
                            </TableCell>
                            <TableCell>
                              {report.vidros}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              Portas
                            </TableCell>
                            <TableCell>
                              {report.portas}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              Cinto de Segurança
                            </TableCell>
                            <TableCell>
                              {report.cinto_seguranca}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              Macaco
                            </TableCell>
                            <TableCell>
                              {report.macaco}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              Chave de Roda
                            </TableCell>
                            <TableCell>
                              {report.chave_roda}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              Nível de Óleo
                            </TableCell>
                            <TableCell>
                              {report.nivel_oleo}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              Lanternas Traseiras
                            </TableCell>
                            <TableCell>
                              {report.lanternas_traseiras}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              Nivel de Fluido de Freio Traseiras
                            </TableCell>
                            <TableCell>
                              {report.nivel_fluido_freio}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              Nivel de Água
                            </TableCell>
                            <TableCell>
                              {report.nivel_agua}
                            </TableCell>
                          </TableRow> 
                          <TableRow>
                            <TableCell>
                              Ruído Interno
                            </TableCell>
                            <TableCell>
                              {report.ruido_interno}
                            </TableCell>
                          </TableRow>   
                          <TableRow>
                            <TableCell>
                              Lataria
                            </TableCell>
                            <TableCell>
                              {report.lataria}
                            </TableCell>
                          </TableRow>  
                          <TableRow>
                            <TableCell>
                              Cones de sinalização
                            </TableCell>
                            <TableCell>
                              {report.cones_sinalizacao}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              Suspenção
                            </TableCell>
                            <TableCell>
                              {report.suspensao}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              Reservatório de Água
                            </TableCell>
                            <TableCell>
                              {report.reservatorio_agua}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              Trava das Portas
                            </TableCell>
                            <TableCell>
                              {report.trava_portas}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              Parabrisa
                            </TableCell>
                            <TableCell>
                              {report.parabrisa}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              Engrenagem
                            </TableCell>
                            <TableCell>
                              {report.engrenagem}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              Manchas no Geral
                            </TableCell>
                            <TableCell>
                              {report.manchas_geral}
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>
                              Borracha das Portas
                            </TableCell>
                            <TableCell>
                              {report.borracha_portas}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-rose-600">Nenhum relatório encontrado.</p>
              )}
            </div>
          </CardContent>
          <CardFooter>
              <Button
                className="w-full"
                onClick={fetchReports}
              >
                Buscar Relatórios
              </Button>
            </CardFooter>
        </Card>
        <PageBackground text="Relatórios" />
      </main>
    </div>
  );
}
