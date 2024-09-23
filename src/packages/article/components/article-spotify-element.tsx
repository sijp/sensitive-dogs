import { styled } from "@mui/material/styles";


interface ArticleSpotifyElementProps {
  link: string;
}

const SpotifyContainer = styled("iframe")({
  borderRadius: 12
});

export function ArticleSpotifyElement({ link }: ArticleSpotifyElementProps) {
  return (
    <div>
      <SpotifyContainer
        title="Spotify"
        src={link}
        width="100%"
        height="352"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
      ></SpotifyContainer>
    </div>
  );
}
