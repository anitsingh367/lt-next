import { Box, Button, Card, CardActions, CardContent, CardMedia, Chip, Container, SvgIcon, Typography, IconButton } from "@mui/material";
import defaultImage from "../assets/default-card-image.jpg";

interface ChipTemplate {
  icon?: any;
  chipText: string;
  iconColor?: string;
  textColor?: string;
}

interface SecondaryButton {
  icon?: any;
  btnText: string;
  onClick: () => void;
}

interface PrimaryButton {
  btnIcon?: any;
  btnText: string;
  onClick: () => void;
}

interface Content {
  image?: string;
  heading?: string;
  description: string;
  orientation: string;
  hoverEffect: boolean;
  chipTemplate?: ChipTemplate;
  secondaryBtns?: SecondaryButton[];
  primaryBtn?: PrimaryButton;
  actionIcon?: any;
  type?: string;
}

interface CustomCardProps {
  content: Content;
}

function extractContent(s: string | undefined) {
  var span = document.createElement("span");
  span.innerHTML = s || "";
  return span.textContent || span.innerText;
}

export default function CustomCard(props: CustomCardProps) {
  let description = extractContent(props.content?.description);

  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: {
          lg: props.content?.orientation === "list" ? "row" : "column",
          sm: props.content?.orientation === "list" ? "row" : "column",
          xs: "column",
        },
        width: "100%",
        height: "100%",
        boxShadow: 4,
        "&:hover": {
          boxShadow: props.content?.hoverEffect ? 1 : 4,
        },
      }}
    >
      <CardMedia
        component="img"
        image={props.content?.image ? props.content.image : defaultImage.src}
        alt=""
        sx={{
          width: {
            lg: props.content?.orientation === "list" ? 0 : 1,
            sm: props.content?.orientation === "list" ? 0 : 1,
            xs: 1,
          },
        }}
      />
      <CardContent sx={{ paddingBottom: "0" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexDirection: "column",
            gap: props.content?.orientation === "list" ? "2rem" : "0",
          }}
        >
          <Container
            sx={{
              padding: "0 !important",
            }}
            className="truncate"
          >
            <Typography
              className="truncate"
              variant="h6"
              component="div"
              whiteSpace="wrap"
            >
              {props.content?.heading}
            </Typography>
            {props.content?.type && (
              <Typography variant="body2" sx={{ color: "#388E3C" }}>
                {props.content?.type.charAt(0).toUpperCase() +
                  props.content?.type.slice(1)}
              </Typography>
            )}
          </Container>

          {props.content.chipTemplate && (
            <Chip
              size="small"
              sx={{
                color: `${props.content.chipTemplate.textColor} !important`,
                textTransform: "uppercase",
                marginTop: "0.2rem",
              }}
              icon={
                props.content.chipTemplate.icon && (
                  <SvgIcon
                    component={props.content.chipTemplate.icon}
                    sx={{
                      color: props.content.chipTemplate.iconColor
                        ? `${props.content.chipTemplate.iconColor} !important`
                        : `${props.content.chipTemplate.textColor} !important`,
                      fontSize: "0.7rem !important",
                    }}
                  />
                )
              }
              label={props.content.chipTemplate.chipText}
            />
          )}
          <Typography
            className="event-line-clamp"
            variant="body2"
            color="text.secondary"
            gutterBottom={!!!props.content.actionIcon}
          >
            {description}
          </Typography>
        </Box>
        {props.content?.secondaryBtns && (
          <CardActions sx={{ marginTop: "auto" }}>
            {props.content?.secondaryBtns?.map((buttons, index) => {
              return (
                <Button
                  key={index}
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={buttons.onClick}
                  sx={{ flex: 1, color: "primary.contrastText" }}
                  startIcon={
                    buttons.icon && <SvgIcon component={buttons.icon} />
                  }
                >
                  {buttons.btnText}
                </Button>
              );
            })}
          </CardActions>
        )}

        {props.content?.primaryBtn && (
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: props.content?.secondaryBtns ? 0 : "auto",
              padding: "0.1rem 0.5rem",
            }}
          >
            <Button
              sx={{ color: "secondary.main" }}
              size="small"
              onClick={props.content.primaryBtn?.onClick}
              startIcon={
                props.content.primaryBtn?.btnIcon && (
                  <SvgIcon component={props.content.primaryBtn.btnIcon} />
                )
              }
            >
              {props.content?.primaryBtn?.btnText}
            </Button>
            {props.content.actionIcon && (
              <IconButton>
                <SvgIcon component={props.content?.actionIcon} />
              </IconButton>
            )}
          </CardActions>
        )}
      </CardContent>
    </Card>
  );
}
