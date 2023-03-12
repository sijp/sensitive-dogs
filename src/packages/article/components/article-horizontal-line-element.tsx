import { styled } from "@mui/material/styles";

const HorizontalLine = styled("hr")({
  height: 1,
  border: 0,
  borderTop: "1px solid #ccc",
  margin: "1em 0"
});

export function ArticleHorizontalLineElement() {
  return <HorizontalLine />;
}
