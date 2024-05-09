"use client"

import NoteEdit from "@/components/NoteEdit/noteEdit"
import { useLocalStorage } from "../../../server/useLocalStorage"
import { NoteData, RawNote, Tag } from "../new-note/page"
import { useSearchParams } from "next/navigation"
import { useMemo } from "react"

export default function EditNote(){
    const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
    const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])
    const params = useSearchParams()

    function onUpdateNote(id: string, {tags, ...data}: NoteData){
        setNotes(prevNotes => {
            return prevNotes.map(note => {
                if(note.id === id){
                    return { ...note, ...data, tagIds: tags.map(tag => tag.id) }
                }else{
                    return note
                }
            })
        })
    }

    const notesWithTags = useMemo(() => {
        return notes.map(note => {
        return {...note, tags: tags.filter(tag => note.tagIds.includes(tag.id))}
        })
    }, [notes, tags])

    function AddTag(tag: Tag){
        setTags(prev => [...prev, tag])
    }

    return(
        <NoteEdit onSubmit={onUpdateNote} onAddTag={AddTag} availableTags={tags} 
        id={params.get("note-id") as string} notes={notesWithTags} />
    )
}