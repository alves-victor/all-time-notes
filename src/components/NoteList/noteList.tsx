import Link from "next/link";
import { Button, TextInput, Label, Card } from "flowbite-react";
import ReactSelect from "react-select";
import { useMemo, useState } from "react";
import { Tag } from "../../app/new-note/page";
import Animated from "react-select/animated"
import NoteCard from "../NoteCard/noteCard";

export type SimplifiedNote = {
  id: string
  title: string
  tags: Tag[]
}

type NoteListProps = {
  availableTags: Tag[]
  notes: SimplifiedNote[]
}

export default function NoteList({ availableTags, notes } : NoteListProps){
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const [title, setTitle] = useState("")

    const filteredNotes = useMemo(() => {
      return notes.filter(note => {
        return (title === "" || note.title.toLowerCase().includes(title.toLowerCase()))
        && (selectedTags.length === 0 || selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id)))
      })
    }, [title, selectedTags, notes])

    return (
        <main className="py-6 px-6 sm:px-32">
          <div className="flex w-full flex-col justify-center gap-4 mb-4 sm:flex-row sm:justify-between">
            <h1 className="text-4xl">Notas</h1>
            <div className="flex flex-row gap-10 w-full justify-center sm:max-w-max">
              <Link href="/new-note">
                <Button>Criar nota</Button>
              </Link>
              <Button color={"gray"}>Editar Tags</Button>
            </div>
          </div>
    
          <form autoComplete="off" className="grid gap-2 grid-flow-row mb-3 md:grid-flow-col md:grid-cols-2">
            <div>
              <Label htmlFor="title" value="Título" className="text-lg" />
              <TextInput type="text" id="title" value={title} style={{
                height: "38px",
                borderRadius: "4px",
                backgroundColor: "#fff"
              }}
              onChange={ event => setTitle(event.target.value)} />
            </div>
    
            <div>
            <Label htmlFor="tags" value="Tags" className="text-lg" />
              <ReactSelect id="tags" isMulti components={Animated()} className="w-full"
                options={availableTags.map(tag => {
                    return {label: tag.label, value: tag.id}
                })}
                value={selectedTags.map(tag => {
                    return {label: tag.label, value: tag.id}
                })}
                onChange={tags => {
                    setSelectedTags(tags.map(tag =>{
                        return {label: tag.label, id: tag.value}
                    }))
                }}
              />
            </div>
          </form>

          <ul className="grid gap-3 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
                {filteredNotes.map(note => (
                  <li key={note.id}>
                    <NoteCard id={note.id} title={note.title} tags={note.tags} />
                  </li>
                ))}
          </ul>

        </main>
      )
}