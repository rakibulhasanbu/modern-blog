"use client";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { useAppDispatch } from "@/redux/hook";
import { setContent } from "@/redux/features/blog/blogSlice";

type TEditor = {
  initialContent?: string;
  editable?: boolean;
};

const Editor = ({ editable = true, initialContent }: TEditor) => {
  const dispatch = useAppDispatch();

  const editor = useCreateBlockNote({
    initialContent: initialContent ? JSON.parse(initialContent) : undefined,
  });

  return (
    <div className="min-h-[80dvh] text-lg">
      <BlockNoteView
        editor={editor}
        editable={editable}
        theme="light"
        onChange={() => dispatch(setContent(JSON.stringify(editor.document)))}
      />
    </div>
  );
};

export default Editor;
