import { JSX } from "react";
import { YouTubePlayer } from "react-youtube";

type VideoListTitle = string | JSX.Element | undefined;
type SectionName = string | undefined;

// Video Gallery
export type VideoGalleryProps = {
  videos: {
    iso_639_1?: string;
    iso_3166_1?: string;
    name?: string;
    key?: string;
    site?: string;
    size: number;
    type?: string;
    official: boolean;
    published_at?: string;
    id?: string;
    movie_title?: string | undefined;
    movie_id?: string | undefined;
  }[];
  videoListTitle: VideoListTitle;
  sectionName: SectionName;
};

// Video List
export type VideoListProps = {
  videoListTitle: VideoListTitle;
  videos: {
    iso_639_1?: string;
    iso_3166_1?: string;
    name?: string;
    key?: string;
    site?: string;
    size: number;
    type?: string;
    official: boolean;
    published_at?: string;
    id?: string;
    movie_title?: string | undefined;
    movie_id?: string | undefined;
  }[];
  handlePrevious: () => void;
  handleNext: () => void;
  selectedVideo: {
    iso_639_1?: string;
    iso_3166_1?: string;
    name?: string;
    key?: string;
    site?: string;
    size: number;
    type?: string;
    official: boolean;
    published_at?: string;
    id?: string;
    movie_title?: string | undefined;
    movie_id?: string | undefined;
  };
  setSelectedVideo: React.Dispatch<
    React.SetStateAction<
      | {
          iso_639_1?: string;
          iso_3166_1?: string;
          name?: string;
          key?: string;
          site?: string;
          size: number;
          type?: string;
          official: boolean;
          published_at?: string;
          id?: string;
          movie_title?: string | undefined;
          movie_id?: string | undefined;
        }
      | undefined
    >
  >;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  player: YouTubePlayer | null;
};
