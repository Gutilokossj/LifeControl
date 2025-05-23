"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col p-10 min-h-screen">
      <h1 className="text-3xl font-bold">Home</h1>

      <div className="font-semibold text-2xl grid grid-cols-1 gap-5 sm:grid-cols-2">
      <Link href="/tasks">
        <p className="bg-blue-300 justify-center items-center text-center p-5 mt-10 cursor-pointer rounded-md hover:translate-x-1 duration-300">
          Controle de tarefas</p>
      </Link>
      <p className="bg-green-600 justify-center items-center text-center p-5 mt-10 cursor-pointer rounded-md hover:translate-x-1 duration-300">
        Controle de financeiro</p> 
        <p className="bg-yellow-500 justify-center items-center text-center p-5 mt-10 cursor-pointer rounded-md hover:translate-x-1 duration-300">
        Controle de estudos</p>
        <p className="bg-orange-400 justify-center items-center text-center p-5 mt-10 cursor-pointer rounded-md hover:translate-x-1 duration-300">
        Controle de treinos</p>
      </div>
    </div>
  );
}
