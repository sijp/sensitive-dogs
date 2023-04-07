import { Card, Typography, Button, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

import { SensitiveIcon } from "@sensitive-dogs/icons";
import { useDispatch } from "@sensitive-dogs/event-bus";

interface HeaderCTAProps {
  logo?: string | null;
  text?: string | null;
  buttonText?: string | null;
  buttonIcon?: string | null;
  buttonLink?: string | null;
}

const CTACard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(4),

  alignSelf: "flex-start",
  backgroundColor: "#FFFFFFCC",
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,

  [theme.breakpoints.up("md")]: {
    marginRight: theme.spacing(8),

    minHeight: `calc(min(700px, 90vh) - ${
      (theme.mixins.toolbar.minHeight as number) * 2 + 64
    }px )`,
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    "& > *": {
      flex: 1,
      flexBasis: "100%"
    }
  },
  [theme.breakpoints.down("md")]: {
    margin: 0,
    borderRadius: 0,
    flexGrow: 1
  }
}));

const CTAText = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  [theme.breakpoints.down("md")]: {
    fontSize: theme.typography.h6.fontSize
  }
}));

const CTAButton = styled(Button)(({ theme }) => ({
  fontSize: theme.typography.h5.fontSize,
  width: "100%",
  [theme.breakpoints.down("md")]: {
    fontSize: theme.typography.body1.fontSize,
    width: "auto",
    marginRight: "auto",
    marginLeft: "auto"
  }
}));

const Logo = styled("img")(({ theme }) => ({
  margin: "0 auto",
  display: "block",
  width: 236,
  height: 236,
  padding: theme.spacing(5),
  [theme.breakpoints.down("sm")]: {
    float: "left",
    width: 100,
    height: 100,
    padding: theme.spacing(1)
  }
}));

export default function HeaderCTA({
  logo,
  text,
  buttonIcon,
  buttonText,
  buttonLink
}: HeaderCTAProps) {
  const navigateFn = useDispatch<[string]>("app.navigate");

  return (
    <CTACard>
      <div>
        <Logo src={`/public/${logo}`} />
      </div>
      <CTAText variant="h5">{text}</CTAText>
      <Box sx={{ textAlign: "center", paddingTop: 2 }}>
        <CTAButton
          variant="contained"
          color="primary"
          data-testid="cta-button"
          href={buttonLink || ""}
          startIcon={<SensitiveIcon iconName={buttonIcon || ""} />}
          onClick={() => {
            buttonLink && navigateFn([buttonLink]);
          }}
        >
          {buttonText}
        </CTAButton>
      </Box>
    </CTACard>
  );
}
