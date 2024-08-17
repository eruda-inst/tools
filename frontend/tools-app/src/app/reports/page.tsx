"use client";
import Header from "@/components/project/header";
import { useEffect, useState } from "react";
import axios from "axios";
import PageBackground from "@/components/project/pageBackgorund";
import { API } from "@/config/env";

export default function Reports() {
  const [cars, setCars] = useState<{ id: number, modelo: string }[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [plates, setPlates] = useState<string[]>([]);  // Estado para armazenar as placas
  const [selectedCar, setSelectedCar] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedPlate, setSelectedPlate] = useState<string>("");  // Estado para a placa selecionada
  const [reports, setReports] = useState<any[]>([]);
  const [techs, setTechs] = useState<{ id: number, nome: string }[]>([]);
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
    setSelectedDate("");  // Limpar a data selecionada ao mudar o carro

    if (carId) {
      // Fazer requisições para obter as placas e datas relacionadas ao carro selecionado
      const platesResponse = await axios.get(API.CHECKLIST + `/api/plates_by_car`, { params: { veiculo_id: carId } });
      const datesResponse = await axios.get(API.CHECKLIST + `/api/dates_by_car`, { params: { veiculo_id: carId } });
      
      setPlates(platesResponse.data);
      setDates(datesResponse.data);
    } else {
      // Se não houver carro selecionado, limpar as placas e datas
      setPlates([]);
      setDates([]);
    }
  };

  const fetchReports = async () => {
    try {
      const params: any = {};
      if (selectedCar) {
        params.veiculo_id = selectedCar;
      }
      if (selectedDate) {
        params.data_inspecao = selectedDate;
      }
      if (selectedPlate) {
        params.placa = selectedPlate;
      }

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

  const getTechName = (tecnico_id: number) => {
    const tech = techs.find((t) => t.id === tecnico_id);
    return tech ? tech.nome : "Desconhecido";
  };

  return (

    <div className="page-body h-full overflow-clip w-screen">
    <Header/>
    <main className="page-body h-screen flex flex-row gap-3 items-center justify-center  w-full p-5">
      <div className="p-0 container flex flex-col gap-4 items-center sm:flex-row w-full justify-center h-full">
      
      <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md space-y-4 text-black">
      <h1 className="text-2xl font-bold text-gray-800 text-center">Relatórios de Inspeção</h1>

      {/* Filtro de Carro */}
      <div className="space-y-2">
        <label className="block text-gray-700">Selecionar Carro</label>
        <select
          className="w-full p-2 border border-gray-300 rounded-lg text-black"
          value={selectedCar}
          onChange={(e) => handleCarSelection(e.target.value)}  // Chama a função para buscar placas e datas
        >
          <option value="">Todos os carros</option>
          {cars.map((car) => (
            <option key={car.id} value={car.id}>
              {car.modelo}
            </option>
          ))}
        </select>
      </div>

      {/* Filtro de Placa - Aparece apenas se houver placas disponíveis */}
      {plates.length > 0 && (
        <div className="space-y-2">
          <label className="block text-gray-700">Selecionar Placa</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-lg text-black"
            value={selectedPlate}
            onChange={(e) => setSelectedPlate(e.target.value)}
          >
            <option value="">Todas as placas</option>
            {plates.map((plate) => (
              <option key={plate} value={plate}>
                {plate}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Filtro de Data - Aparece apenas se houver datas disponíveis */}
      {dates.length > 0 && (
        <div className="space-y-2">
          <label className="block text-gray-700">Selecionar Data</label>
          <select
            className="w-full p-2 border border-gray-300 rounded-lg text-black"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          >
            <option value="">Todas as datas</option>
            {dates.map((date) => (
              <option key={date} value={date}>
                {new Date(date).toLocaleDateString()}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Botão para buscar relatórios */}
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={fetchReports}
        >
          Buscar Relatórios
        </button>
      </div>

      {/* Listagem dos relatórios */}
      <div className="mt-6">
        {reports.length > 0 ? (
          reports.map((report) => (
        <div key={report.id} className="border p-4 mb-4 rounded-lg">
          <div
            className="cursor-pointer text-xl font-bold text-gray-700"
            onClick={() => toggleExpand(report.id)}
          >
            {`Relatório ID: ${report.id} - Data: ${new Date(report.data_inspecao).toLocaleDateString()}`}
          </div>

          {expandedReportId === report.id && (
            <ul className="mt-2 space-y-2">
              <li>Técnico: {getTechName(report.tecnico_id)}</li> {/* Exibir o nome do técnico e a placa */}
              <li>Placa: {report.placa}</li>
              <li>Quilometragem: {report.quilometragem}</li>
              <li>Freio de Pé: {report.freio_pe}</li>
              <li>Freio de Estacionamento: {report.freio_estacionamento}</li>
              <li>Motor de Partida: {report.motor_partida}</li>
              <li>Limpador de Parabrisa: {report.limpador_parabrisa}</li>
              <li>Lavador de Parabrisa: {report.lavador_parabrisa}</li>
              <li>Buzina: {report.buzina}</li>
              <li>Faróis: {report.farois}</li>
              <li>Lanternas Dianteiras: {report.lanternas_dianteiras}</li>
              <li>Lanternas Traseiras: {report.lanternas_traseiras}</li>
              <li>Luz de Freio: {report.luz_freio}</li>
              <li>Luz Traseira: {report.luz_re}</li>
              <li>Triângulo de Advertência: {report.triangulo_advertencia}</li>
              <li>Extintor de Segurança: {report.extintor_seguranca}</li>
              <li>Espelhos Retrovisores: {report.espelhos_retrovisores}</li>
              <li>Indicadores de Painel: {report.indicadores_painel}</li>
              <li>Condição dos Pneus: {report.condicao_pneus}</li>
              <li>Pneu Step: {report.pneu_step}</li>
              <li>Vidros: {report.vidros}</li>
              <li>Portas: {report.portas}</li>
              <li>Cinto de Segurança: {report.cinto_seguranca}</li>
              <li>Macaco: {report.macaco}</li>
              <li>Chave de Roda: {report.chave_roda}</li>
              <li>Nível de Óleo: {report.nivel_oleo}</li>
              <li>Nível de Fluído de Freio: {report.nivel_fluido_freio}</li>
              <li>Nível de Água: {report.nivel_agua}</li>
              <li>Ruído Interno: {report.ruido_interno}</li>
              <li>Lataria: {report.lataria}</li>
              <li>Cones de Sinalização: {report.cones_sinalizacao}</li>
              <li>Suspensão: {report.suspensao}</li>
              <li>Reservatório de Água: {report.reservatorio_agua}</li>
              <li>Trava das Portas: {report.trava_portas}</li>
              <li>Parabrisa: {report.parabrisa}</li>
              <li>Engrenagem: {report.engrenagem}</li>
              <li>Marchas: {report.manchas_geral}</li>
              <li>Borracha das Portas: {report.borracha_portas}</li>
            </ul>
          )}
        </div>

          ))
        ) : (
          <p className="text-gray-600">Nenhum relatório encontrado.</p>
        )}
      </div>
    </div>
      </div>
    <PageBackground text="Relatórios" />
    </main>
  </div>
    
  );
}
