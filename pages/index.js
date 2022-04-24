import NavBar from '../components/NavBar';
import Head from 'next/head';
import Seo from '../components/Seo';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
export default function Home({ results }) {
  const router = useRouter();
  const onClick = (id, title) => {
    router.push(`/movies/${title}/${id}`);
  };
  return (
    <div className="container">
      <Seo title="Home" />
      {results?.map((movie) => (
        <div
          onClick={() => onClick(movie.id, movie.original_title)}
          className="movie"
          key={movie.id}
        >
          <Link href={`/movies/${movie.original_title}/${movie.id}`} key={movie.id}>
            <a>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                width={150}
                height={200}
                alt={movie.title}
              />
            </a>
          </Link>
          <h4>{movie.original_title}</h4>
          <h5>{movie.title}</h5>
        </div>
      ))}
      <style jsx>{`
        .container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          padding: 20px;
          gap: 20px;
        }
        .movie {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin: 1rem auto 0;
          box-sizing: border-box;
        }
        .movie img {
          display: block;
          border-radius: 10px;
          box-shadow: 2px 2px 3px grey;
          transition: 0.2s;
        }
        .movie img:hover {
          cursor: pointer;
          box-shadow: 2px 2px 10px grey;
          transform: translate(0, -5px);
        }
        h4 {
          width: 220px;
          text-align: center;
          font-size: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps() {
  //어떤 코드를 쓰든지간에 그 코드는 server에서 동작한다.
  const { results } = await (
    await fetch(`http://localhost:3000/api/movies`)
  ).json();
  return {
    props: {
      results,
    },
  };
}
