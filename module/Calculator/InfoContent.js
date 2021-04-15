import { useState } from "react";
import {
  Box,
  Typography,
  Chip,
  Avatar,
  makeStyles,
  colors,
} from "@material-ui/core";
import { CheckRounded } from "@material-ui/icons";
import clsx from "clsx";
import { v4 as uuid } from "uuid";

export default function InfoContent({
  values,
  months,
  selectedMonths,
  handleMonthSelection,
}) {
  const classes = useStyles();
  return (
    <Box p={3}>
      {values.systemSize > 0 && (
        <Box>
          <Typography variant="subtitle2">
            {values.systemSize} kW solar system Daily output average
          </Typography>
        </Box>
      )}
      {values.systemSize > 0 && (
        <Box>
          <Typography variant="subtitle2">
            {(values.systemSize * 3.9).toFixed(2)} kWh
          </Typography>
        </Box>
      )}
      {values.efficiency > 0 && (
        <Box>
          <Typography variant="subtitle2">
            {values.efficiency}% Efficiency
          </Typography>
        </Box>
      )}

      <Box mt={3} style={{ marginLeft: "-5px" }}>
        {months.length > 0 &&
          months.map((month) => (
            <Chip
              key={uuid()}
              className={classes.chip}
              color={selectedMonths.indexOf(month) >= 0 ? "primary" : "default"}
              avatar={
                <Avatar>
                  <CheckRounded style={{ fontSize: 16 }} />
                </Avatar>
              }
              label={`${month} month`}
              clickable
              style={{ margin: 5 }}
              onClick={() => handleMonthSelection(month)}
            />
          ))}
      </Box>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({}));
