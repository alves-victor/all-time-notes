
import { Button, Label, TextInput, Textarea } from "flowbite-react";
import CreatableSelect from "react-select/creatable"
import Animated from "react-select/animated"
import { FormEvent, useRef, useState } from "react";
import { NoteData, Tag } from "@/app/page";

type NoteFormProps = {
    onSubmit: (data: NoteData) => void
}

export default function NoteForm({ onSubmit }: NoteFormProps){
    const titleRef = useRef<HTMLInputElement>(null)
    const markdownRef = useRef<HTMLTextAreaElement>(null)
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])

    function handleSubmit(event: FormEvent){
        event.preventDefault()

        onSubmit({
            title: titleRef.current!.value,
            markdown: markdownRef.current!.value,
            tags: []
        })
    }

    return(
        <main className="px-6 py-6 flex flex-col m-auto lg:w-3/5 md:w-4/5 h-screen">
            <h1 className="text-4xl mb-4">Nova Nota</h1>

            <form onSubmit={handleSubmit} className="lg:grid lg:grid-flow-row lg:gap-2 grid gap-2">

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
                        <Button color={"gray"}>Cancelar</Button>
                    </div>
                </div>

            </form>
        </main>
    )
}