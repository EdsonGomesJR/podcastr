import { GetStaticProps } from "next";
import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { api } from "../services/api";
import { convertDurationToTimeString } from "../utils/convertDurationToTimeString";
import Image from "next/image";
import { usePlayer } from "../contexts/PlayerContext";
import React from "react";
import styles from "./home.module.scss";
import Link from "next/link";
import Head from "next/head";
import {
  Box,
  Text,
  Button,
  Grid,
  Flex,
  Image as ChakraImage,
} from "@chakra-ui/react";

type Episode = {
  id: string;
  title: string;
  thumbnail: string;
  duration: number;
  durationAsString: string;
  members: string;
  url: string;
  publishedAt: string;
};

type HomeProps = {
  allEpisodes: Episode[]; //ou Array<Episode>
  latestEpisodes: Episode[];
};

export default function Home({ allEpisodes, latestEpisodes }: HomeProps) {
  const { playList } = usePlayer();
  const episodeList = [...latestEpisodes, ...allEpisodes];
  return (
    <Box
      p="0 4rem"
      h="calc(100vh - 6.5rem)"
      overflowY="scroll"
      // className={styles.homepage}
    >
      <Head>
        <title>Home | podcastr</title>
      </Head>
      <Box as="section" className={styles.latestEpisodes}>
        <Text mt="3rem" mb="1.5rem" as="h2">
          Últimos lançamentos
        </Text>

        <Grid
          as="ul"
          listStyleType="none"
          gridTemplateColumns="repeat(2, 1fr)"
          gap="1.5rem"
        >
          {latestEpisodes.map((episode, index) => (
            <Flex
              as="li"
              bgColor="var(--white)"
              border="1px solid"
              borderColor="var(--gray-100)"
              borderRadius="1.5rem"
              p="1.25rem"
              pos="relative"
              align="center"
              key={episode.id}
            >
              <Image
                className={styles.nextImage}
                width={192}
                height={192}
                src={episode.thumbnail}
                alt={episode.title}
                objectFit="cover"
              />

              <Box
                maxW="75%"
                flex="1"
                ml="1rem"
                className={styles.episodeDetails}
              >
                <Link href={`/episodes/${episode.id}`}>
                  <Text
                    as="a"
                    display="block"
                    color="var(--gray-800)"
                    fontFamily="Lexend"
                    fontWeight={600}
                    textDecor="none"
                    cursor="pointer"
                    _hover={{
                      textDecor: "underline",
                    }}
                  >
                    {episode.title}
                  </Text>
                </Link>
                <Text
                  as="p"
                  fontSize="0.875rem"
                  mt="0.5rem"
                  maxW="70%"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  {episode.members}
                </Text>
                <Text
                  as="span"
                  display="inline-block"
                  mt="0.5rem"
                  fontSize="0.875rem"
                >
                  {episode.publishedAt}
                </Text>
                <Text
                  as="span"
                  display="inline-block"
                  mt="0.5rem"
                  fontSize="0.875rem"
                >
                  {episode.durationAsString}
                </Text>
              </Box>

              <Box
                as="button"
                type="button"
                onClick={() => playList(episodeList, index)}
              >
                <img src="/play-green.svg" alt="Tocar episódio" />
              </Box>
            </Flex>
          ))}
        </Grid>
      </Box>
      <section className={styles.allEpisodes}>
        <Box as="h2" mt="3rem" mb="1.5rem">
          Todos os episódios
        </Box>
        <table cellSpacing={0}>
          <thead>
            <tr>
              <th></th>
              <th>Podcast</th>
              <th>Integrantes</th>
              <th>Data</th>
              <th>Duração</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {allEpisodes.map((episode, index) => {
              return (
                <tr key={episode.id}>
                  <td
                    style={{
                      width: 72,
                    }}
                  >
                    <Image
                      width={120}
                      height={120}
                      src={episode.thumbnail}
                      alt={episode.title}
                      objectFit="cover"
                    />
                  </td>
                  <td>
                    <Link href={`/episodes/${episode.id}`}>
                      <a>{episode.title}</a>
                    </Link>
                  </td>
                  <td>{episode.members}</td>
                  <td
                    style={{
                      width: 100,
                    }}
                  >
                    {episode.publishedAt}
                  </td>
                  <td>{episode.durationAsString}</td>
                  <td>
                    <button
                      type="button"
                      onClick={() =>
                        playList(episodeList, index + latestEpisodes.length)
                      }
                    >
                      <img src="/play-green.svg" alt="Tocar episódio" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </Box>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get("episodes", {
    //parametros que eram passados na rota de requisição
    params: {
      _limit: 12,
      _sort: "published_at",
      _order: "desc",
    },
  });

  const episodes = data.map((episode) => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), "d MMM yy", {
        locale: ptBR,
      }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(
        Number(episode.file.duration)
      ),
      description: episode.description,
      url: episode.file.url,
    };
  });

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.lenght);

  return {
    props: {
      latestEpisodes,
      allEpisodes,
    },
    revalidate: 60 * 60 * 8, //8h
  };
};
