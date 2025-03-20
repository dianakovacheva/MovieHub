export type BackdropProps = {
  backdrops: {
    aspect_ratio: number;
    height: number;
    iso_639_1?: unknown;
    file_path?: string;
    vote_average: number;
    vote_count: number;
    width: number;
    name?: string | undefined;
  }[];
};
