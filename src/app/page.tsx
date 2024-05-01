"use client";

import NoteList from "@/components/NoteList/noteList";
import { useLocalStorage } from "../../server/useLocalStorage";
import { Tag } from "./new-note/page";

export default function Home() {
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])
  
  return(
    <NoteList availableTags={tags} />
  )
}
