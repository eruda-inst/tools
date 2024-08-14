import { Input } from "@/components/ui/input";

type FiberProps = {
  currentPrice: number;
  onChangeFunction: (fiberLength: number) => void;
};

export default function DynamicInput({ currentPrice, onChangeFunction }: FiberProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Permitir apenas números e pontos decimais
    if (!isNaN(parseFloat(value)) && !/[^\d.]/.test(value)) {
      onChangeFunction(parseFloat(value)); // Passa o valor do input como número
    }
  };

  if (!currentPrice) {
    return (
      <Input
        onChange={handleChange}
        disabled
        type="number"
        placeholder="Digite o comprimento"
      />
    );
  }

  return (
    <Input
      onChange={handleChange}
      type="number"
      placeholder="Digite o comprimento"
    />
  );
}
