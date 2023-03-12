import { styled } from "@mui/material/styles";

interface ArticleImageElementProps {
  src: string;
}

const Image = styled("img")({
  marginLeft: "-50vw",
  marginRight: "-50vw",
  maxWidth: "100vw",
  position: "relative",
  width: "100vw",
  right: "50%",
  left: "50%"
});

export function ArticleImageElement({ src }: ArticleImageElementProps) {
  return <Image src={`public/${src}`} alt="No Alt" />;
}
