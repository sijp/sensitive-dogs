import { styled } from "@mui/material/styles";

interface ArticleYoutubeElementProps {
  link: string;
}

const YoutubeContainer = styled("iframe")({
  border: 0
});

export function ArticleYoutubeElement({ link }: ArticleYoutubeElementProps) {
  return (
    <div style={{ textAlign: "center" }}>
      <YoutubeContainer
        title="Youtube"
        width="560"
        height="315"
        src={link}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></YoutubeContainer>
    </div>
  );
}
