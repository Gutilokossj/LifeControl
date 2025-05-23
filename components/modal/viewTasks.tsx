"use client";

import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/modal";
import { Button } from "@heroui/button";

interface ViewTasksProps {
  isOpen: boolean;
  onClose: () => void;
  task: { id: number; title: string; description: string; status: boolean } | null;
}

export function ViewTasks({ isOpen, onClose, task }: ViewTasksProps) {
  if (!task) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} backdrop="blur" size="md" placement="center">
      <ModalContent className="w-full max-w-3xl max-h-screen sm:max-w-4xl overflow-auto">
        <ModalHeader className="flex justify-center">Visualizar Tarefa</ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-100">Título</p>
              <p className="text-lg font-bold text-zinc-800 dark:text-zinc-400 break-words whitespace-pre-line">{task.title}</p>
            </div>
            {task.description && (
              <div>
                <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-100">Descrição</p>
                <p className="text-base text-zinc-800 dark:text-zinc-400 break-words whitespace-pre-line">{task.description}</p>
              </div>
            )}
          </div>

          <div className="p-4 flex justify-center">
            <Button color="primary" variant="shadow" onPress={onClose}>
              Fechar Tarefa
            </Button>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
