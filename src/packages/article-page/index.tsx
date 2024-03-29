import { Container } from "@mui/material";

import Article from "@sensitive-dogs/article";

export default function HomePage({ articleId }: { articleId: string }) {
  return (
    <Container maxWidth="md" sx={{ bgcolor: "background.paper" }}>
      <Article articleId={articleId} />
    </Container>
  );
}
