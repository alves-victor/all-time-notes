"use client"

import NoteView from "@/components/NoteView/noteView";
import { useSearchParams } from "next/navigation";
import { useLocalStorage } from "../../../server/useLocalStorage";
import { useMemo } from "react";
import { RawNote, Tag } from "../new-note/page";

export default function ViewNote(){
    const [notes] = useLocalStorage<RawNote[]>("NOTES", [])
    const [tags] = useLocalStorage<Tag[]>("TAGS", [])
    const params = useSearchParams()

    const notesWithTags = useMemo(() => {
        return notes.map(note => {
        return {...note, tags: tags.filter(tag => note.tagIds.includes(tag.id))}
        })
    }, [notes, tags])

    return(
        <NoteView notes={notesWithTags} id={params.get("note-id") as string} />
    )
}