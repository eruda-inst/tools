"use client"
import { CheckedState } from "@radix-ui/react-checkbox";
import "./_Checkbox.scss"
import { Checkbox } from "@/components/ui/checkbox"

type CheckboxTypes= {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void ;
}

export function CheckboxnLabel({label, checked, onChange, ...props}:CheckboxTypes) {
    const handleChange = (checked: CheckedState) => {
        onChange(checked === true);
    }
  return (
    <div className="flex items-center space-x-2">
      <Checkbox checked={checked} onCheckedChange={handleChange} id="terms" {...props}/>
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  )
}
