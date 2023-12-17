import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
  CardMedia,
  Chip,
  Box,
  Button
} from "@mui/material";

import { styled } from "@mui/material/styles";

import { SensitiveSymbol } from "@sensitive-dogs/icons";
import { NonMinifiedText } from "@sensitive-dogs/common";

import { services as allServices, locations as allLocations } from "../config";

interface ResultCardProps {
  result: {
    id: number;
    fullName: string;
    description: string;
    services: string[];
    cities: string[];
    picture: string | null;
    isAdmin: boolean;
    isModerator: boolean;
    pinned: boolean;
    facebookPage: string;
    instagram: string;
    phone: string;
    email: string;
    web: string;
  };
  onSelect?: () => void;
  clearSelection: () => void;
  fullscreen: boolean;
  activeServices: string[] | null;
  activeLocation: string | null;
}

const Tag = styled(Chip)({
  cursor: "inherit"
});

const MAX_CITIES = 1;
const MAX_SERVICES = 2;

export function ResultCard({
  result,
  onSelect,
  clearSelection,
  fullscreen,
  activeLocation,
  activeServices
}: ResultCardProps) {
  const {
    id,
    fullName,
    description,
    services,
    cities,
    picture,
    isAdmin,
    isModerator,
    pinned,
    facebookPage,
    instagram,
    phone,
    email,
    web
  } = result;

  const ConditionalCardActionArea = ({
    selected,
    children,
    onClick
  }: React.PropsWithChildren<{
    selected: boolean;
    onClick?: (() => void) | undefined;
  }>) =>
    selected ? (
      <>{children}</>
    ) : (
      <CardActionArea component="div" sx={{ height: "100%" }} onClick={onClick}>
        {children}
      </CardActionArea>
    );

  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%"
      }}
    >
      <ConditionalCardActionArea
        onClick={onSelect}
        selected={Boolean(fullscreen)}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "100%"
          }}
        >
          {picture ? (
            <CardMedia
              sx={{
                height: fullscreen ? "30vh" : 150,
                backgroundPosition: "50% 30%"
              }}
              image={`/public/${picture}`}
            />
          ) : null}

          <Box sx={{ display: "flex", alignItems: "stretch" }}>
            <CardHeader
              title={fullName}
              sx={{
                width: isAdmin || isModerator || pinned ? "70%" : "100%"
              }}
            />
            {isAdmin || isModerator || pinned ? (
              <Box
                sx={{
                  width: "30%",
                  display: "flex",
                  flexDirection: "row-reverse",
                  alignItems: "center",
                  padding: 2
                }}
              >
                <Typography color="primary" variant="h4">
                  {isAdmin ? (
                    <>
                      <SensitiveSymbol iconName="local_police" />
                    </>
                  ) : isModerator ? (
                    <>
                      <SensitiveSymbol iconName="shield" />
                    </>
                  ) : pinned ? (
                    <>
                      <SensitiveSymbol iconName="favorite" />
                    </>
                  ) : null}
                </Typography>

                {fullscreen ? (
                  <Typography color="GrayText" variant="body2">
                    {isAdmin ? (
                      <>מנהל/ת</>
                    ) : isModerator ? (
                      <>מגשר/ת</>
                    ) : pinned ? (
                      <>פעיל/ה בקהילה</>
                    ) : null}
                  </Typography>
                ) : null}
              </Box>
            ) : null}
          </Box>
          <CardContent
            sx={{
              ...(fullscreen
                ? { overflowY: "auto" }
                : { height: 150, overflowY: "hidden" })
            }}
          >
            <Typography
              variant={fullscreen ? "body1" : "body2"}
              color="text.primary"
              sx={{ whiteSpace: "pre-line" }}
            >
              <NonMinifiedText
                text={
                  !fullscreen && description.length > (picture ? 150 : 200)
                    ? `${description.substring(0, picture ? 150 : 200)}...`
                    : description
                }
              />
            </Typography>
          </CardContent>
          <CardContent
            sx={{
              height: fullscreen ? "auto" : 100,
              display: "flex",
              flexDirection: "column",
              ...(fullscreen ? {} : { marginTop: "auto" })
            }}
          >
            <Box sx={{ marginTop: "auto" }}>
              {services
                .slice(0, fullscreen ? 100 : MAX_SERVICES)
                .map((service) => (
                  <Tag
                    key={`professional-card-${id}-serviceicon-${service}`}
                    color={
                      activeServices?.includes(service) ? "primary" : "default"
                    }
                    size="small"
                    sx={{ margin: "2px", padding: "1px" }}
                    {...(fullscreen
                      ? {
                          icon: (
                            <SensitiveSymbol
                              iconName={allServices[service]?.icon}
                              style={{ margin: 4 }}
                            />
                          )
                        }
                      : {})}
                    label={
                      fullscreen ? (
                        allServices[service]?.label
                      ) : (
                        <SensitiveSymbol
                          iconName={allServices[service]?.icon}
                          style={{ margin: 4 }}
                        />
                      )
                    }
                  />
                ))}
              {!fullscreen && services.length > MAX_SERVICES ? (
                <Tag
                  color="default"
                  size="small"
                  label={`${services.length - 2}+`}
                />
              ) : null}
            </Box>
            <Box>
              {cities.slice(0, fullscreen ? 100 : MAX_CITIES).map((city) => (
                <Tag
                  key={`professional-card-${id}-city-${city}`}
                  label={allLocations[city]?.label}
                  color={city === activeLocation ? "primary" : "default"}
                  size="small"
                  sx={{ margin: "2px", padding: "1px" }}
                />
              ))}
              {!fullscreen && cities.length > MAX_CITIES ? (
                <Tag
                  label={`${cities.length - 1}+`}
                  color="default"
                  size="small"
                />
              ) : null}
            </Box>
            {fullscreen ? (
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {phone ? (
                  <>
                    <Button
                      variant="contained"
                      href={`https://wa.me/972${phone
                        .substring(1)
                        .replace(/\D/gi, "")}?text=${encodeURI(
                        "היי, ראיתי את הכרטיס שלך באינדקס הרגישים ואשמח ליצור עמך קשר :)"
                      )}`}
                      target="_blank"
                      sx={{
                        backgroundColor: "#25D366",
                        color: "black"
                      }}
                      startIcon={
                        <SensitiveSymbol
                          iconName="whatsapp"
                          style={{ color: "white" }}
                        />
                      }
                    >
                      {phone}
                    </Button>
                    <Button
                      variant="contained"
                      href={`tel:${phone}`}
                      target="_blank"
                      startIcon={<SensitiveSymbol iconName="call" />}
                    >
                      {phone}
                    </Button>
                  </>
                ) : null}
                {facebookPage ? (
                  <Button
                    variant="contained"
                    href={facebookPage}
                    target="_blank"
                    sx={{
                      backgroundColor: "#4267B2",
                      color: "white"
                    }}
                    startIcon={<SensitiveSymbol iconName="facebook" />}
                  >
                    פייסבוק
                  </Button>
                ) : null}
                {instagram ? (
                  <Button
                    variant="contained"
                    href={instagram}
                    target="_blank"
                    sx={{
                      backgroundColor: "#C13584",
                      color: "white"
                    }}
                    startIcon={<SensitiveSymbol iconName="instagram" />}
                  >
                    אינסטגרם
                  </Button>
                ) : null}
                {email ? (
                  <Button
                    variant="contained"
                    href={`mailto:${email}`}
                    target="_blank"
                    startIcon={<SensitiveSymbol iconName="mail" />}
                  >
                    {email}
                  </Button>
                ) : null}
                {web ? (
                  <Button
                    variant="contained"
                    href={web}
                    target="_blank"
                    startIcon={<SensitiveSymbol iconName="language" />}
                  >
                    אתר אינטרנט
                  </Button>
                ) : null}
              </Box>
            ) : null}
          </CardContent>
          {fullscreen ? (
            <CardContent
              sx={{
                marginTop: "auto",
                display: "flex",
                flexDirection: ["column", "column", "row"]
              }}
            >
              <Button
                variant="contained"
                color="error"
                onClick={clearSelection}
              >
                חזרה
              </Button>
            </CardContent>
          ) : null}
        </Box>
      </ConditionalCardActionArea>
    </Card>
  );
}
