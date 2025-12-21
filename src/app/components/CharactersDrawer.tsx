"use client";

import Image from "next/image";
import { Character } from "@/graphql/queries";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@heroui/react";

interface CharacterDrawerProps {
  character: Character | null;
  onClose: () => void;
}

export default function CharactersDrawer({
  character,
  onClose,
}: CharacterDrawerProps) {
  const isOpen = !!character;

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={() => onClose()}
      placement="center"
      classNames={{
        wrapper:
          "fixed inset-0 z-[90] flex items-center justify-center bg-black/90",
        base: "z-[100] m-0 h-auto max-h-[90vh] w-full max-w-xl rounded-xl bg-slate-950 text-slate-50 shadow-[0_0_50px_rgba(16,185,129,0.6)]",
        body: "flex-1 overflow-y-auto",
        header: "border-b border-emerald-700",
        closeButton: "p-4 self-end text-lg text-emerald-200",
      }}
    >
      <ModalContent>
        {character && (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <span className="text-lg font-semibold text-emerald-300">
                {character.name}
              </span>
              <span className="text-xs text-emerald-200/80">
                {character.species} • {character.status} • {character.gender}
              </span>
            </ModalHeader>

            <ModalBody className="flex flex-col gap-4 items-center px-6 py-4">
              <Image
                src={character.image}
                alt={character.name}
                className="rounded-lg border border-emerald-600"
                width={300}
                height={300}
              />
              <p className="flex gap-2 font-medium">
                <span className="text-emerald-300">Episode count:</span>
                {character.episode.length}
              </p>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
