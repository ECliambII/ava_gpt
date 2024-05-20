import Link from "next/link";
import { ICard } from "@/types/card";


const ChatCard = (props: { data: ICard[]; }) => {
  const typeArray = ["All", "Not Read", "Completed", "Reassigned", "Read"]
  const colorArray = ["", "text-slate-400 bg-slate-200", "text-slate-400 bg-slate-300", "text-sky-500 border-sky-500", "text-purple-600 border-purple-600"]
  const bgColorArray = ["bg-white", "bg-slate-300", "bg-slate-200", "bg-slate-100", "bg-white"]
  const data = props.data;
  return (
    <div className="col-span-12 border border-stroke py-3 dark:border-strokedark dark:bg-boxdark xl:col-span-4 overflow-auto h-2/3 lg:h-5/6">
      {data && data.map((card : ICard, key: number) => (
        <Link
          href=""
          className={`flex items-center m-2 gap-5 p-7 rounded-md shadow-default hover:bg-gray-3 dark:hover:bg-meta-4 ${bgColorArray[card.type]}`}
          key={key}
        >  
        <div className="flex flex-col w-full gap-3">
          <div className="flex flex-1 items-center justify-between">
            <h5 className="font-medium text-black dark:text-white">
              {card.name}
            </h5>
            {card.type !== 0 && (
              <div className={`flex items-center justify-center rounded-md border px-2 ${colorArray[card.type]}`}>
                <span className="text-sm font-medium">
                  {typeArray[card.type]}
                </span>
              </div>
            )}
          </div>
          <div className="flex flex-1 items-center justify-between">
            <span className="text-sm flex-1 text-black dark:text-white">
              {card.text}
            </span>
            <div className="items-center justify-center text-slate-600">
              <span className="text-sm font-medium">
                {card.time} min
              </span>
            </div>
          </div>
        </div>
        </Link>
      ))}
    </div>
  );
};

export default ChatCard;
