"use client"
import { API } from "@/config/env"
import Header from "@/components/project/header";
import PageBackground from "@/components/project/pageBackgorund";
export default function InstalCalc() {
    const baseUrl = API.CHECKLIST + "/calculadora_instalacao";




  return (
    <div className="page-body h-full overflow-clip w-screen">
      <Header/>
      <main className="page-body h-screen flex flex-row gap-3 items-center justify-center  w-full p-5">
        <div className="p-0 container flex flex-col gap-4 items-center sm:flex-row w-full justify-center h-full">
        
      
        </div>
      <PageBackground text="Calculadora" />
      </main>
    </div>
  );
}