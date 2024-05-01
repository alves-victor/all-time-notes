"use client"

import NoteForm from "@/components/NoteForm/noteForm"

import { useLocalStorage } from "../../../server/useLocalStorage";
import { useMemo } from "react";
import { v4 as uuidV4 } from "uuid"

export type RawNote = {
    id: string
} & RawNoteData

export type RawNoteData = {
title: string
markdown: string
tagIds: string[]
}

export type Note = {
id: string
} & NoteData

export type NoteData = {
title: string
markdown: string
tags: Tag[]
}

export type Tag = {
id: string
label: string
}

export default function NewNote(){

    const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
    const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])

    const notesWithTags = useMemo(() => {
        return notes.map(note => {
        return {... notes, tags: tags.filter(tag => note.tagIds.includes(tag.id))}
        })
    }, [notes, tags])

    function onCreateNote({tags, ...data}: NoteData){
        setNotes(prevNotes => {
        return [...prevNotes, {...data, id: uuidV4(), tagIds: tags.map(tag => tag.id)}]
        })
    }

    function AddTag(tag: Tag){
        setTags(prev => [...prev, tag])
    }

    return(
        <NoteForm onSubmit={onCreateNote} onAddTag={AddTag} availableTags={tags} />
    )
}