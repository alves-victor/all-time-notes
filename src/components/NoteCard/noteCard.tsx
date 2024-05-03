
import { SimplifiedNote } from "../NoteList/noteList";
import { Card } from "flowbite-react";

export default function NoteCard({ id, title, tags }: SimplifiedNote){
    return(
        <div>
            <Card href={`/${id}`}>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 w-full text-center">{title}</h1>

                <ul className="flex justify-center gap-2">
                    {tags.map(tag => {
                        return <li className="py-1 px-2 bg-blue-700 font-semibold text-white rounded-md" key={tag.id}>{tag.label}</li>
                    })}
                </ul>          
            </Card>
        </div>
    )
}