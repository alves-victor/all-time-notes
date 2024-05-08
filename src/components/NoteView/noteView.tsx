import { Note } from "@/app/new-note/page"
import { Button } from "flowbite-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import ReactMarkdown from "react-markdown"
import "./style.css"

type NoteViewProps = {
    notes: Note[]
    id: string
}

export default function NoteView({ notes, id }: NoteViewProps){
    const note = notes.find(note => note.id == id)
    const route = useRouter()

    if(note == null || note == undefined){ route.push("/") }

    return(
        <div className="py-6 px-6 lg:px-64 md:px-32">
            <div className="flex w-full flex-col gap-4 mb-4 md:flex-row sm:justify-between">
                <div className="w-full flex flex-col">
                    <h1 className="text-4xl mb-2">{ note?.title }</h1>
                    <ul className="flex gap-2">
                        {note?.tags.map(tag => {
                            return <li className="py-1 px-2 max-w-max bg-blue-700 font-semibold text-white rounded-md" key={tag.id}>{tag.label}</li>
                        })}
                    </ul>
                </div>

                <div className="w-full flex flex-row gap-4 sm:justify-end md:max-w-max">
                    <Link href="#">
                        <Button>Editar</Button>
                    </Link>
                    <Link href={"#"}>
                        <Button color={"failure"}>Deletar</Button>
                    </Link>
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