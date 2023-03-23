import { styled, useTheme } from "@mui/material/styles";

interface ArticleYoutubeElementProps {
  link: string;
}

const YoutubeContainer = styled("iframe")({
  border: 0
});

export function ArticleYoutubeElement({ link }: ArticleYoutubeElementProps) {
  const theme = useTheme();
  return (
    <div style={{ textAlign: "center" }}>
      <YoutubeContainer
        title="Youtube"
        width={theme.breakpoints.values.md}
        height={(theme.breakpoints.values.md * 9) / 16}
        src={link}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        sx={{ display: ["none", "none", "block"] }}
      ></YoutubeContainer>
      <YoutubeContainer
        title="Youtube"
        width={400}
        height={300}
        src={link}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        sx={{ display: ["block", "block", "none"] }}
      ></YoutubeContainer>
    </div>
  );
}
