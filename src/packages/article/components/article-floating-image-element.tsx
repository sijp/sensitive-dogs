import { styled } from "@mui/material/styles";

interface ArticleImageElementProps {
  src: string;
}

const Image = styled("img")(({ theme }) => ({
  float: "left",
  margin: theme.spacing(2),
  marginLeft: 0
}));

export function ArticleFloatingImageElement({ src }: ArticleImageElementProps) {
  return <Image src={`/public/${src}`} alt="No Alt" />;
}
