import { Note, RawNote } from "@/app/new-note/page"
import { Button, Modal } from "flowbite-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import ReactMarkdown from "react-markdown"
import "./style.css"
import { useLocalStorage } from "../../../server/useLocalStorage"
import { useState } from "react"
import { HiOutlineExclamationCircle } from "react-icons/hi"

type NoteViewProps = {
    notes: Note[]
    id: string
}

export default function NoteView({ notes, id }: NoteViewProps){
    const [notes_, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
    const [openModal, setOpenModal] = useState(false)
    const note = notes.find(note => note.id == id)
    const route = useRouter()

    if(note == null || note == undefined){ route.push("/") }

    function DeleteNote(){
        setNotes(prevNotes => {
            return prevNotes.filter(note => note.id !== id)
        })

        route.push("/")
    }

    return(
        <div className="py-6 px-6 lg:px-64 md:px-32">

            <Modal dismissible show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Tem certeza que quer deletar esta nota?
                        </h3>
                        <div className="flex justify-center gap-4">
                        <Button color="failure" onClick={() => DeleteNote()}>
                            Sim, tenho certeza
                        </Button>
                        <Button color="gray" onClick={() => setOpenModal(false)}>
                            Não quero
                        </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

            <div className="flex w-full flex-col gap-4 mb-4 md:flex-row sm:justify-between">
                <div className="w-full flex flex-col">
                    <h1 className="text-4xl mb-2">{ note?.title }</h1>
                    <ul className="flex gap-2">
                        {note?.tags.map(tag => {
                            return <li className="py-1 px-2 max-w-max bg-blue-700 font-semibold text-white rounded-md" key={tag.id}>{tag.label}</li>
                        })}
                    </ul>
                </div>

                <div className="w-full flex flex-row gap-4 items-center sm:justify-end md:max-w-max">
                    <Link href={{
                        pathname: "/edit-note",
                        query: {"note-id": note?.id}
                    }}>
                        <Button>Editar</Button>
                    </Link>
                    
                    <Button className="max-h-min" onClick={() => setOpenModal(true)} color={"failure"}>Excluir</Button>
                    
                    <Link href={"/"}>
                        <Button color={"gray"}>Voltar</Button>
                    </Link>
                </div>
            </div>
            <div className="markdown">
                <ReactMarkdown>
                    {note?.markdown}
                </ReactMarkdown>
            </div>
        </div>
    )

}