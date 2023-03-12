import { Typography } from "@mui/material";

import { NonMinifiedText } from "@sensitive-dogs/common";

interface ArticleTextElementProps {
  text: string;
  bold: boolean;
  underline: boolean;
  italic: boolean;
}

export function ArticleTextElement({
  text,
  bold,
  underline,
  italic
}: ArticleTextElementProps) {
  return (
    <Typography
      variant="inherit"
      component="span"
      sx={{
        fontWeight: bold ? "bold" : "normal",
        textDecoration: underline ? "underline" : "none",
        fontStyle: italic ? "italic" : "normal"
      }}
    >
      <NonMinifiedText text={text || ""} />
    </Typography>
  );
}
