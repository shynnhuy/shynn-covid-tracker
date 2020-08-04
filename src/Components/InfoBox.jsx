import React from "react";
import { Card, CardContent, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  box: {
    flex: 1,
    "&:not(:last-child)": {
      marginRight: theme.spacing(2),
    },
    borderTop: "10px solid white",

    "&:hover": {
      cursor: "pointer",
    },
  },
  select: {
    borderTop: "10px solid greenyellow",
  },
  red: {
    borderColor: "red",
  },
  greenText: {
    color: "greenyellow !important",
  },
  cases: {
    color: "#cc1034",
    fontWeight: "600",
    fontSize: "1.5rem",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  total: {
    color: "#6c757d",
    fontWeight: "700",
    fontSize: "0.8rem",
    marginTop: theme.spacing(1),
  },
}));
const InfoBox = ({
  title,
  cases,
  active,
  isRed,
  isGreenText,
  total,
  ...props
}) => {
  const classes = useStyles();
  return (
    <Card
      className={`${classes.box} ${active && classes.select} ${
        isRed && active && classes.red
      }`}
      onClick={props.onClick}
    >
      <CardContent>
        <Typography
          align="left"
          className="infoBox__title"
          color="textSecondary"
        >
          {title}
        </Typography>
        <h2 className={`${classes.cases} ${isGreenText && classes.greenText}`}>
          {cases}
        </h2>
        <Typography className={classes.total} color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoBox;
