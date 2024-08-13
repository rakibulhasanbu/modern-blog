"use client";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";

type TEditor = {
  initialContent?: string;
  editable?: boolean;
};

const Editor = ({ editable = true, initialContent }: TEditor) => {
  const editor = useCreateBlockNote({
    initialContent: initialContent ? JSON.parse(initialContent) : undefined,
  });

  return (
    <div className="min-h-[80dvh] text-lg">
      <BlockNoteView
        editor={editor}
        editable={editable}
        theme="light"
        onChange={() => console.log(editor.document)}
      />
    </div>
  );
};

export default Editor;
