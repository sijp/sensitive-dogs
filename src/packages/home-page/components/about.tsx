import React from "react";
import { DataContext } from "@sensitive-dogs/app/App";
import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography
} from "@mui/material";

import { styled } from "@mui/material/styles";

import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

import { NonMinifiedText } from "@sensitive-dogs/common";
import Article from "@sensitive-dogs/article";

interface TeamRecord {
  name: string;
  picture: string;
  description: string;
}

const AdminCardMedia = styled(CardMedia)`
  height: 360px;
  background-position: 50% 30%;
`;

const ModeratorCardMedia = styled(CardMedia)`
  height: 260px;
  background-position: 50% 30%;
`;

function TeamList({
  CardMediaComponent,
  list,
  xs,
  sm
}: {
  CardMediaComponent: typeof AdminCardMedia | typeof ModeratorCardMedia;
  list: Array<TeamRecord>;
  xs: number;
  sm: number;
}) {
  return (
    <Grid container spacing={6} sx={{ justifyContent: "center" }}>
      {list.map((member) => (
        <Grid xs={xs} sm={sm} key={`${member.name}`}>
          <Card
            variant="elevation"
            sx={{
              height: "100%"
            }}
          >
            <CardMediaComponent
              image={`/public/${member.picture}`}
              title={member.name}
            />

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {member.name}
              </Typography>
              <Typography variant="body2" component="div">
                <NonMinifiedText text={member.description} />
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default function About() {
  const data = React.useContext(DataContext);
  const team = data?.team;
  const admins = team?.filter((member) => member.admin);
  const moderators = team?.filter((member) => !member.admin);

  const parser = (element: { text?: string | null | undefined }) => {
    const text = element.text?.slice(0, 5);

    return text === "**1**" && admins ? (
      <TeamList
        list={admins}
        xs={12}
        sm={4}
        CardMediaComponent={AdminCardMedia}
      />
    ) : text === "**2**" && moderators ? (
      <TeamList
        list={moderators}
        xs={12}
        sm={3}
        CardMediaComponent={ModeratorCardMedia}
      />
    ) : null;
  };

  return (
    <Container maxWidth="lg">
      <Article articleId="home-page" elementParsers={[parser]} />
    </Container>
  );
}
