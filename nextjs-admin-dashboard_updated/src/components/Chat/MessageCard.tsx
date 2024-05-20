import { IMessage } from "@/types/message";


const Message = (props: { data: IMessage[]; }) => {
    const data = props.data;
    return (
        <div className="flex flex-col gap-2 justify-end h-full overflow-y-auto">
            {data.map(datum => (
                <div key={datum.id} className="flex">
                    {datum.agent === 0 ? (
                        <div className="ms-auto bg-sky-400 rounded-md rounded-br-none p-3 max-w-100 text-white">
                            {datum.content}
                        </div>
                    ) : (
                        <div className="me-auto bg-slate-200 rounded-md rounded-bl-none p-3 max-w-100 text-black">
                            {datum.content}
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}

export default Message;