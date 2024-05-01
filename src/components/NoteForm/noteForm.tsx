
import { Button, Label, TextInput, Textarea } from "flowbite-react";
import CreatableSelect from "react-select/creatable"
import Animated from "react-select/animated"
import { FormEvent, useRef, useState } from "react";
import { NoteData, Tag } from "@/app/new-note/page";
import { v4 as uuidV4 } from "uuid"
import Link from "next/link";
import { useRouter } from "next/navigation";

type NoteFormProps = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void
    availableTags: Tag[]
}

export default function NoteForm({ onSubmit, onAddTag, availableTags }: NoteFormProps){
    const titleRef = useRef<HTMLInputElement>(null)
    const markdownRef = useRef<HTMLTextAreaElement>(null)
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const route = useRouter()

    function handleSubmit(event: FormEvent){
        event.preventDefault()

        onSubmit({
            title: titleRef.current!.value,
            markdown: markdownRef.current!.value,
            tags: selectedTags
        })

        route.push("/")
    }

    return(
        <main className="lg:w-3/5 md:w-4/5 p-6 flex flex-col m-auto h-screen">
            <h1 className="text-4xl mb-4">Nova Nota</h1>

            <form autoComplete="off" onSubmit={handleSubmit} className="lg:grid-flow-row grid gap-2">

                <div className="lg:grid lg:grid-flow-col lg:grid-cols-2 lg:gap-2 grid-flow-row">
                    <div>
                        <Label htmlFor="title" value="Título" className="text-lg" />
                        <TextInput ref={titleRef} type="text" id="title" required style={{
                            height: "38px",
                            borderRadius: "4px",
                            backgroundColor: "#fff"
                        }}/>
                    </div>
                    <div>
                        <Label htmlFor="tags" value="Tags" className="text-lg" />
                        <CreatableSelect id="tags" isMulti components={Animated()} className="w-full"
                            onCreateOption={label => {
                                const newTag = { id: uuidV4(), label}
                                onAddTag(newTag)
                                setSelectedTags(prev => [...prev, newTag])
                            }}
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
                </div>

                <Textarea ref={markdownRef} rows={15} style={{backgroundColor: "#fff"}} required />

                <div className="w-full flex justify-end">
                    <div className="flex">
                        <Button className="mr-2" type="submit">Salvar</Button>
                        <Link href="/">
                            <Button color={"gray"}>Cancelar</Button>
                        </Link>
                    </div>
                </div>

            </form>
        </main>
    )
}