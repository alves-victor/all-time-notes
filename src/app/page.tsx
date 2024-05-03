"use client";

import NoteList from "@/components/NoteList/noteList";
import { useLocalStorage } from "../../server/useLocalStorage";
import { RawNote, Tag } from "./new-note/page";
import { useMemo } from "react";

export default function Home() {
  const [notes] = useLocalStorage<RawNote[]>("NOTES", [])
  const [tags] = useLocalStorage<Tag[]>("TAGS", [])

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return {...note, tags: tags.filter(tag => note.tagIds.includes(tag.id))}
    })
}, [notes, tags])
  
  return(
    <NoteList notes={notesWithTags} availableTags={tags} />
  )
}
