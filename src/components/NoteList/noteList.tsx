import Link from "next/link";
import { Button, TextInput, Label, Modal } from "flowbite-react";
import ReactSelect from "react-select";
import { useMemo, useState } from "react";
import { RawNote, Tag } from "../../app/new-note/page";
import Animated from "react-select/animated"
import NoteCard from "../NoteCard/noteCard";
import { useLocalStorage } from "../../../server/useLocalStorage";

export type SimplifiedNote = {
  id: string
  title: string
  tags: Tag[]
}

export default function NoteList(){
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])
  const [notes] = useLocalStorage<RawNote[]>("NOTES", [])

  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [title, setTitle] = useState("")
  const [openModal, setOpenModal] = useState(false)

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return {...note, tags: tags.filter(tag => note.tagIds.includes(tag.id))}
    })
  }, [notes, tags])

  const filteredNotes = useMemo(() => {
    return notesWithTags.filter(note => {
      return (title === "" || note.title.toLowerCase().includes(title.toLowerCase()))
      && (selectedTags.length === 0 || selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id)))
    })
  }, [title, selectedTags, notesWithTags])

  function updateTag(id: string, label: string){
    setTags(prevTags => {
      return prevTags.map(tag => {
        if(tag.id === id){
          return {...tag, label}
        }else {
          return tag
        }
      })
    })
  }

  function deleteTag(id: string){
    setTags(prevTags => {
      return prevTags.filter(tag => tag.id !== id)
    })
  }

  return (
    <main className="py-6 px-6 sm:px-32">

      <Modal dismissible show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header className="p-6">Editar tags</Modal.Header>
        <Modal.Body>
          <form>
            <ul className="mb-4">
              {tags.map(tag => (
                <li key={tag.id} id={tag.id} className="flex flex-row w-full mb-2">
                  <TextInput onChange={e => updateTag(tag.id, e.target.value)} type="text" className="w-full" style={{backgroundColor: "#fff"}} value={tag.label} />
                  <Button onClick={() => deleteTag(tag.id)} color="red"> X </Button>
                </li>
              ))}
            </ul>

            <div className="flex justify-end">
              <Button color="gray" onClick={() => setOpenModal(false)}>
                Fechar
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      <div className="flex w-full flex-col justify-center gap-4 mb-4 sm:flex-row sm:justify-between">
        <h1 className="text-4xl">Notas</h1>
        <div className="flex flex-row gap-10 w-full items-center sm:max-w-max">
          <Link href="/new-note">
            <Button>Criar nota</Button>
          </Link>
          <Button onClick={() => setOpenModal(true)} color={"gray"}>Editar Tags</Button>
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
            options={tags.map(tag => {
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