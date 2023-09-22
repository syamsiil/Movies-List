import { LoaderArgs, json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";

export async function loader({ params }: LoaderArgs) {
  const url = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}?language=en-US`,
    {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZjczNTU0NGQ0ZGI1NWRiZjhiN2RjY2Q3ZmFlMTAwYSIsInN1YiI6IjY0ZWRiNzUzMWZlYWMxMDBmZTVlOWM2NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7gLP3ULJvTccwdCsGVRa_WO0N7ExuFxXZIOus_ZKXCQ",
      },
    }
  );
  return json(await url.json());
}

export default function MovieId() {
  const data = useLoaderData();
  console.log(data);
  return (
    <div className="min-h-screen p-10">
      <img
        src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}
        className="h-[40vh] object-cover w-full rounded-lg"
      />
      <h1 className="text-4xl font-bold text-center pt-5">{data.title}</h1>

      <div className="flex gap-x-10 mt-10">
        <div className="w-1/2 font-medium">
          <h1>
            <span className="underline">Watch:</span>{" "}
            <Link to={data.homepage} target="blank">
              Link
            </Link>
          </h1>

          <h1>
            <span className="underline">Original Language:</span>
            {""} {data.original_language}
          </h1>

          <p>
            <span className="underline">Overview:</span> {data.overview}
          </p>

          <p>
            <span className="underline">Release Date:</span> {data.release_date}
          </p>
        </div>

        <div className="w-1/2">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
