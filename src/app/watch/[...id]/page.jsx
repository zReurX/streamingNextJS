import { auth } from "@/lib/auth";
import BackLink from "./BackLink";
import { redirect } from "next/navigation";


async function page({ params }) {
  const {id} = await params

  return (
    <div className="relative h-screen">
      <BackLink />
      <iframe
        allowFullScreen
        src={`https://vixsrc.to/${id[0]}/${encodeURIComponent(id[1])}${id[0] === 'tv' ? `/${id[2]}/${id[3]}` : ''}/?autoplay=true&lang=it`}
        className="w-full h-full"
      />
    </div>
  );
}

export default page;