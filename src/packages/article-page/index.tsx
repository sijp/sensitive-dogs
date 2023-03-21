import { Box, Container } from "@mui/material";

import Navigation from "@sensitive-dogs/navigation";
import Article from "@sensitive-dogs/article";
import Footer from "@sensitive-dogs/footer";

export default function HomePage({ articleId }: { articleId: string }) {
  return (
    <Box>
      <Navigation />

      <Container
        maxWidth="md"
        sx={{ bgcolor: "background.paper", paddingBottom: 10 }}
      >
        <Article articleId={articleId} />
      </Container>

      <Footer />
    </Box>
  );
}
