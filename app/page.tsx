"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col p-10 min-h-screen">
      <h1 className="text-3xl font-bold">Seja bem-vindo(a)</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 mt-10">
        <Link href="/tasks">
          <div className="bg-blue-500 text-white text-center p-6 rounded-2xl shadow-md cursor-pointer hover:scale-105 transition-transform duration-300">
            <p className="text-lg sm:text-xl font-semibold">
              Controle de Tarefas
            </p>
          </div>
        </Link>
        <div className="bg-green-500 text-white text-center p-6 rounded-2xl shadow-md cursor-pointer hover:scale-105 transition-transform duration-300">
          <p className="text-lg sm:text-xl font-semibold">
            Controle Financeiro
          </p>
        </div>
        <div className="bg-yellow-400 text-black text-center p-6 rounded-2xl shadow-md cursor-pointer hover:scale-105 transition-transform duration-300">
          <p className="text-lg sm:text-xl font-semibold">
            Controle de Estudos
          </p>
        </div>
        <div className="bg-orange-500 text-white text-center p-6 rounded-2xl shadow-md cursor-pointer hover:scale-105 transition-transform duration-300">
          <p className="text-lg sm:text-xl font-semibold">
            Controle de Treinos
          </p>
        </div>
      </div>
    </div>
  );
}
