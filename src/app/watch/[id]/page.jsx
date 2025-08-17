import BackLink from "./BackLink";


function page({ params }) {
  return (
    <div className="relative h-screen">
      <BackLink />
      <iframe
        allowFullScreen
        src={`https://vixsrc.to/movie/${params.id}/?autoplay=true&lang=it`}
        className="w-full h-full"
      />
    </div>
  );
}

export default page;