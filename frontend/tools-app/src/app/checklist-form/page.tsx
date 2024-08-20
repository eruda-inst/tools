"use client"
import { API } from "@/config/env"
import Header from "@/components/project/header";
import PageBackground from "@/components/project/pageBackgorund";
import { useState } from "react";
import Form from "@/components/project/checklistForm";

export default function CheckListForm() {
  
    const baseUrl = API.CHECKLIST + "/api/checklist_form";
  return(
    <div className="page-body h-min pb-10 scroll/ overflow-clip w-screen">
      <Header/>
      <main className="page-body fixed overflow-clip h-full flex flex-col items-center justify-center  w-full pt-12 p-5">
          <Form>

          </Form>

      <PageBackground text="Calculadora" />
      </main>
    </div>
  );
}