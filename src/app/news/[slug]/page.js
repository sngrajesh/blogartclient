import React from "react";

export const revalidate = 172800;
// export const revalidate = 1;
export async function generateStaticParams() {
  const news = await fetch("https://blogartserver.onrender.com//api/v1/news").then((res) =>
    res.json()
  );
  return news.results.map((n) => ({ slug: n.slug }));
}

const Page = async ({ params }) => {
  let news = null;
  try {
    const response = await fetch(
      `https://blogartserver.onrender.com//api/v1/news/${params.slug}`
    );
    const data = await response.json();
    news = data?.result;
  } catch (error) {
    console.error(error);
  }

  return (
    <>
      <div role="status" className="w-full p-4 md:p-6 flex flex-col gap-4">
        <div className="break-words font-bold text-2xl uppercase text-gray-800">
          {news?.title}
        </div>

        <div
          role="status"
          style={{
            backgroundImage: `url(${news?.photo[0]})`,
          }}
          className="flex items-center justify-center min-h-[224px] h-64 w-full bg-cover bg-center rounded-lg overflow-hidden"
        ></div>

        <div className="flex flex-row justify-between items-center">
          <div className="flex items-center space-x-3">
            <img
              src={news?.userid?.profilePicture}
              className="p-1 w-14 h-14 rounded-full bg-contain"
            />

            <div className="flex flex-col justify-start items-start">
              <div className="h-2.5  mb-2 text-sm font-semibold text-gray-800">
                {news?.userid?.name}
              </div>
              <div className="h-auto text-xs text-gray-700">
                {new Date(news?.createdAt).toLocaleDateString()} AT{" "}
                {new Date(news?.createdAt).toLocaleTimeString()}
              </div>
            </div>
          </div>
          <div className="flex flexrow justify-around items-center flex-wrap gap-1 max-w-[50%]">
            {news?.category?.map((c) => (
              <div 
              key={c}
              className="text-center text-xs uppercase text-white bg-gray-600 rounded-full py-1 px-2.5">
                {c}
              </div>
            ))}
          </div>
        </div>

        <div
          role="status"
          className="space-y-2.5 w-full text-gray-800"
          dangerouslySetInnerHTML={{ __html: news?.desc }}
        />
        
        <div
        className="h-auto text-xs text-gray-700 ml-auto" 
        >
          Last updated: {new Date(news?.updatedAt).toLocaleString()}
        </div>
      </div>
    </>
  );
};

export default Page;
