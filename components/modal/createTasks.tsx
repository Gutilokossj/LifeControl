"use client";

import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/modal";
import { useEffect, useState } from "react";

interface Task {
  id: number;
  title: string;
  description: string;
  status: boolean;
  data: string;
}

interface CreateTasksProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: Task) => void;
  task?: Task | null; // ✅ para editar
}

export function CreateTasks({ isOpen, onClose, onSave, task }: CreateTasksProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    } else {
      setTitle("");
      setDescription("");
    }
  }, [task, isOpen]);

  function handleSave() {
    if (!title.trim()) return;

    const newTask: Task = {
      id: task ? task.id : Math.random(),
      title,
      description,
      status: task ? task.status : false,
      data: task ? task.data : new Date().toLocaleDateString(),
    };

    onSave(newTask);
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} backdrop="blur" size="md" placement="center">
      <ModalContent>
        <ModalHeader className="select-none">
          {task ? "Editar Tarefa" : "Adicionar Tarefa"}
        </ModalHeader>
        <ModalBody>
          <Input
            label="Título"
            labelPlacement="inside"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            label="Descrição"
            labelPlacement="inside"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="flex justify-end gap-4 mt-4">
            <Button color="danger" variant="shadow" onPress={onClose}>
              Cancelar
            </Button>
            <Button color="success" variant="shadow" onPress={handleSave}>
              {task ? "Salvar" : "Adicionar"}
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
