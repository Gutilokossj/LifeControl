"use client";
import { useEffect, useState } from "react";
import { IoHourglassOutline } from "react-icons/io5";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { FaClipboardCheck, FaPlus } from "react-icons/fa";

interface Tasks {
  id: number;
  title: string;
  description: string;
  status: boolean;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const [concluded, setConcluded] = useState<boolean[]>([]);

  useEffect(() => {
    const tasksSaved = localStorage.getItem("tasks");
    const concludedSaved = localStorage.getItem("concluded");

    if (tasksSaved) {
      const tasks = JSON.parse(tasksSaved);

      setTasks(tasks);
      setConcluded(JSON.parse(concludedSaved || "[]"));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("concluded", JSON.stringify(concluded));
  }, [tasks, concluded]);

  function handleAddTask(task: Tasks) {
    setTasks([...tasks, task]);
    setConcluded([...concluded, false]);
  }

  function handleConcluded(id: number) {
    const newConcluded = [...concluded];

    newConcluded[id] = !newConcluded[id];
    setConcluded(newConcluded);
  }

  function handleDelete(id: number) {
    const newTasks = tasks.filter((task) => task.id !== id);

    setTasks(newTasks);
  }

  return (
    <div>
      <h1 className="flex font-bold text-5xl justify-center mb-5">Tarefas</h1>

      <input
            type="text"
            className="flex font-medium border-2 rounded-md p-2 w-full mb-14"
            placeholder="Adicione uma tarefa"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const task: Tasks = {
                  id: new Date().getTime(),
                  title: e.currentTarget.value,
                  description: "",
                  status: false,
                };

                handleAddTask(task);
                e.currentTarget.value = "";
              }
            }}
          />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="justify-center text-2xl font-semibold flex items-center gap-2 mb-3">
            Em andamento
            <IoHourglassOutline />
          </h2>
          <div className="flex relative border-2 gap-4 rounded-md flex-col h-[400px] p-3 overflow-y-scroll">
            {tasks.map((task, index) => (
              <Card className="min-h-[55px]"key={task.id}>
                <CardBody className="relative select-none">
                  <div>
                    <p>{task.title}</p>
                    <p>{task.description}</p>
                  </div>
                  <div className="absolute top-2 right-2">
                    <Button isIconOnly onPress={() => handleConcluded(index)}>
                      <FaPlus />
                    </Button>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
        <div>
        <h2 className="justify-center text-2xl font-semibold flex items-center gap-2 mb-3">
            Concluídas!
            <FaClipboardCheck/>
          </h2>
          <div className="flex relative border-2 rounded-md flex-col gap-4 min-h-[400px] p-3 overflow-y-scroll">
        </div>
        </div>
      </div>
    </div>
  );
}
