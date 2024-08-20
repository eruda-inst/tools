import { API } from "@/config/env";

import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
  } from "@/components/ui/select";
  import { useEffect, useState } from "react";
  import axios from "axios";
  
  // Interface para tipar os dados da API
  interface Car {
    id: number;
    info: string;
  }
  
  export default function SelectCar({ onCarChange }: { onCarChange: (value: string) => void }) {
    const [cars, setCars] = useState<Car[]>([]); // Estado para armazenar os carros
    const [loading, setLoading] = useState(true); // Estado de carregamento
    const [selectedCar, setSelectedCar] = useState(""); // Estado para o carro selecionado
  
    // Função para buscar os dados da API
    const fetchCars = async () => {
      try {
        const response = await axios.get(`${API.CHECKLIST}/api/cars_form`);
        setCars(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar carros:", error);
        setLoading(false);
      }
    };
  
    // Buscar os carros ao montar o componente
    useEffect(() => {
      fetchCars();
    }, []);
  
    // Função chamada quando o valor do select muda
    const handleCarChange = (value: string) => {
      setSelectedCar(value);
      onCarChange(value); // Passar o valor para o formulário
    };
  
    return (
      <Select onValueChange={handleCarChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={loading ? "Carregando..." : "Selecione um carro"} />
        </SelectTrigger>
        <SelectContent>
          {cars.map((car) => (
            <SelectItem key={car.id} value={car.id.toString()}>
              {car.info}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }
  