"use client";

import { useEffect, useState } from "react";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/modal";

interface EditTasksProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (task: { id: number; title: string; description: string; status: boolean }) => void;
  task: { id: number; title: string; description: string; status: boolean } | null;
}

export function EditTasks({ isOpen, onClose, onSave, task }: EditTasksProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
    }
  }, [task]);

  function handleSave() {
    if (!task) return;

    onSave({
      ...task,
      title,
      description,
    });

    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} backdrop="blur" size="md" placement="center">
      <ModalContent>
        <ModalHeader>Editar Tarefa</ModalHeader>
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
            <Button color="primary" variant="shadow" onPress={handleSave}>
              Salvar
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
