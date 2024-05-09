import { Note, NoteData, Tag } from "@/app/new-note/page"
import NoteForm from "../NoteForm/noteForm"

type EditFormProps = {
    onSubmit: (id: string, data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
    id: string
    notes: Note[]
}

export default function NoteEdit({ onSubmit, onAddTag, availableTags, id, notes }: EditFormProps){
    const note = notes.find(note => note.id == id)
    
    return(
        <NoteForm onSubmit={data => onSubmit(note!.id, data)} onAddTag={onAddTag} availableTags={availableTags}
            title={note?.title} markdown={note?.markdown} tags={note?.tags}
        />
    )
}