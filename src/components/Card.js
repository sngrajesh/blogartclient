import Link from "next/link";
import React, { useContext } from "react";
import { AuthContext } from "@/context/AuthContext";

const Card = ({ news }) => {
  const { localuser, deteteAnyHandler } = useContext(AuthContext);
  const deleteHandler = async () => {
    let res = await deteteAnyHandler("news", news._id);
    if (res === 200) {
      alert("News deleted successfully");
      window.location.reload();
    } else {
      alert("Something went wrong");
    }
  };

  return (
    <div
      role="status"
      className="w-full p-4 md:p-6 flex flex-col gap-4 shadow-lg hover:shadow-xl rounded-lg"
    >
      <div
        role="status"
        style={{
          backgroundImage: `url(${news?.photo[0]})`,
        }}
        className="flex items-center justify-center min-h-[224px] h-56 w-full bg-cover bg-center rounded-lg overflow-hidden"
      ></div>
      <Link href={`/news/${news.slug}`}>
        <div className="font-bold text-lg uppercase text-gray-900 md:hover:text-blue-900">
          {news.title}
        </div>
      </Link>
      <div className="flex flexrow justify-around items-center flex-wrap gap-1 w-fit">
        {news.category.map((c) => (
          <div
            key={c}
            className="text-center text-xs uppercase text-white bg-gray-500 rounded-full py-0.5 px-2.5"
          >
            {c}
          </div>
        ))}
      </div>
      <div role="status" className="space-y-2.5 w-full text-gray-800">
        {news?.excerpt}
      </div>

      <div className="flex items-center w-full">
        <div className="flex items-center space-x-3 mr-auto">
          <img
            src={news?.userid?.profilePicture}
            className="p-1 w-14 h-14 rounded-full object-cover"
          />

          <div className="flex flex-col justify-center items-start">
            <div className="text-sm font-semibold text-gray-800">
              {news?.userid?.name}
            </div>
            <div className="text-xs text-gray-700">
              {new Date(news?.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
        {(localuser?._id === news?.userid?._id  ||  localuser?.isAdmin)&& (
          <div className="flex justify-end">
            <button
              onClick={()=>{
                if(confirm("Are you sure you want to delete this news?")){
                  deleteHandler()
                }
              }}
              className="w-fit text-sm bg-red-400 rounded-md px-2 py-1 ml-auto text-white hover:bg-red-500 transition duration-200 ease-in-out"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
