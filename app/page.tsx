"use client";

export default function Home() {
  return (
    <div className="flex flex-col p-10 min-h-screen">
      <h1 className="text-3xl font-bold">Home</h1>

      <div className="font-semibold text-2xl grid grid-cols-1 gap-5 sm:grid-cols-2">
      <p className="bg-blue-300 justify-center items-center p-5 mt-10">
        Página principal, aonde vou desenvolver para ter vários tópicos por CARS ou pela NavBar mesmo, pensando!</p>
      <p className="bg-blue-300 justify-center items-center p-5 mt-10">
        Aqui vai ter um card, provavelmente</p>
      </div>
    </div>
  );
}
