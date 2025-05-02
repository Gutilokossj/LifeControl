"use client";
import { useEffect, useState } from "react";
import { IoHourglassOutline } from "react-icons/io5";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { FaCheck, FaClipboardCheck, FaPencilAlt, FaPlus, FaTrash } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { useDisclosure } from "@heroui/modal";
import { CreateTasks } from "@/components/modal/createTasks";
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { Tooltip } from "@heroui/tooltip";
import { IoMdArrowRoundBack } from "react-icons/io";
import { EditTasks } from "@/components/modal/editTasks";

interface Tasks {
  id: number;
  title: string;
  description: string;
  status: boolean;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Tasks[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const tasksSaved = localStorage.getItem("tasks");
    if (tasksSaved) {
      setTasks(JSON.parse(tasksSaved));
    }
  }, []);
  
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // function handleAddTask(task: Tasks) {
  //   const newTask = { ...task, status: false }; // força status inicial como false
  //   setTasks([...tasks, newTask]);
  // }

  function handleAddTask(task: Omit<Tasks, "id" | "status">) {
    const newTask: Tasks = {
      ...task,
      id: Date.now(), // garante um ID único baseado no timestamp atual
      status: false,
    };
    setTasks([...tasks, newTask]);
  }
  
  

  function handleConcluded(id: number) {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, status: !task.status } : task
    );
    setTasks(updatedTasks);
  }
  

  
  function handleDelete(id: number) {
    const newTasks = tasks.filter((task) => task.id !== id);

    setTasks(newTasks);
  }

  function handleEditTask(updatedTask: Tasks) {
    const newTasks = tasks.map(task =>
      task.id === updatedTask.id ? { ...task, ...updatedTask } : task
    );
    setTasks(newTasks);
  }
  
  function handleOpenEditModal(task: Tasks) {
    setTaskBeingEdited(task); // novo useState
    onOpenEdit();             // outro `useDisclosure` para o modal de edição
  }


const [taskBeingEdited, setTaskBeingEdited] = useState<Tasks | null>(null);
const { isOpen: isEditOpen, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();

useEffect(() => {
  const handleLoadTasks = () => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  };

  // Sempre que o componente for exibido, tenta carregar
  handleLoadTasks();

  // Também escuta o evento de "visibilitychange", útil quando volta de outra aba ou página
  document.addEventListener("visibilitychange", handleLoadTasks);

  return () => {
    document.removeEventListener("visibilitychange", handleLoadTasks);
  };
}, []);


  return (
    <div>
      <h1 className="flex font-bold text-5xl justify-center mb-5">Tarefas</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="justify-center text-2xl font-semibold flex items-center gap-2 mb-3">
            Em andamento
            <IoHourglassOutline />
          </h2>
          <div className="flex relative border-2 hover:border-blue-500 hover:brightness-100 duration-300 gap-4 rounded-md flex-col h-[400px] p-6 overflow-y-auto">
            {tasks.filter((task) => !task.status).map((task, index) => (
              <Card className="min-h-32 hover:translate-x-1 duration-300" key={task.id}>
                <CardBody className="dark: bg-blue-200 dark:text-black dark:bg-blue-300 relative select-none">
                  <div>
                    <div className="flex flex-col">
                      <p className="text-zinc-600 text-lg font-semibold">
                        Título:
                      </p>
                    </div>
                    <p>
                      {task.title}
                    </p>
                    <div className="flex flex-col">
                      <p className="text-zinc-600 text-lg font-semibold">
                        Descrição:
                      </p>
                    </div>
                    <p className="w-4/5">
                      {task.description}
                    </p>
                  </div>
                  <div className="absolute top-2 right-2">
                    <Dropdown className="min-w-fit">
                      <DropdownTrigger className="cursor-pointer h-6 w-6">
                        <HiOutlineDotsHorizontal />
                      </DropdownTrigger>
                      <DropdownMenu className="flex justify-center items-center">
                        <DropdownItem key="concluded" className="w-8 flex justify-center" onClick={() => handleConcluded(task.id)}>
                          <Tooltip content="Concluir Tarefa!"
                          color="success">
                            <FaCheck className="text-green-500" />
                          </Tooltip>
                        </DropdownItem>
                        <DropdownItem key="delete" className="w-8 flex justify-center" onClick={() => handleDelete(task.id)}>
                          <Tooltip content="Deletar Tarefa!"
                          color="danger">
                            <FaTrash className="text-red-500" />
                          </Tooltip>
                        </DropdownItem>
                        <DropdownItem key="edit" className="w-8 flex justify-center" onClick={() => handleOpenEditModal(task)}>
                          <Tooltip content="Editar Tarefa!"
                          color="primary">
                            <FaPencilAlt className="text-blue-500" />
                          </Tooltip>
                          </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
        <div>
          <h2 className="justify-center text-2xl font-semibold flex items-center gap-2 mb-3">
            Concluídas!
            <FaClipboardCheck />
          </h2>
          <div className="flex relative border-2 hover:border-green-500 hover:brightness-100 duration-300 gap-4 rounded-md flex-col h-[400px] p-6 overflow-y-auto">
          {tasks.filter((task) => task.status).map((task) => (
              <Card className="min-h-32 hover:translate-x-1 duration-300" key={task.id}>
                <CardBody className="dark: bg-green-200 dark:text-black dark:bg-green-300 relative select-none">
                  <div>
                    <div className="flex flex-col">
                      <p className="text-zinc-600 text-lg font-semibold">
                        Título:
                      </p>
                    </div>
                    <p>
                      {task.title}
                    </p>
                    <div className="flex flex-col">
                      <p className="text-zinc-600 text-lg font-semibold">
                        Descrição:
                      </p>
                    </div>
                    <p className="w-4/5">
                      {task.description}
                    </p>
                  </div>
                  <div className="absolute top-2 right-2">
                    <Dropdown className="min-w-fit">
                      <DropdownTrigger className="cursor-pointer h-6 w-6">
                        <HiOutlineDotsHorizontal />
                      </DropdownTrigger>
                      <DropdownMenu className="flex justify-center items-center">
                        <DropdownItem key="concluded" className="w-8 flex justify-center" onClick={() => handleConcluded(task.id)}>
                          <Tooltip content="Voltar tarefa!"
                          color="warning">
                            <IoMdArrowRoundBack className="text-yellow-500"/>
                          </Tooltip>
                        </DropdownItem>
                        <DropdownItem key="delete" className="w-8 flex justify-center" onClick={() => handleDelete(task.id)}>
                          <Tooltip content="Deletar Tarefa!"
                          color="danger">
                            <FaTrash className="text-red-500" />
                          </Tooltip>
                        </DropdownItem>
                        <DropdownItem key="edit" className="w-8 flex justify-center" onClick={() => handleOpenEditModal(task)}>
                          <Tooltip content="Editar Tarefa!"
                          color="primary">
                            <FaPencilAlt className="text-blue-500" />
                          </Tooltip>
                          </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  </div>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Button
        isIconOnly
        onPress={onOpen}
        className="fixed bottom-5 right-5 rounded-full h-14 w-14"
        color="primary"
        variant="shadow"
      >
        <FaPlus />
      </Button>
      <CreateTasks isOpen={isOpen} onClose={onClose} onSave={handleAddTask} />
      <EditTasks
          isOpen={isEditOpen}
          onClose={onCloseEdit}
          onSave={handleEditTask}
          task={taskBeingEdited}
          />
    </div>
  );
}
