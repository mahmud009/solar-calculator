import React from "react";
import {
  Box,
  TextField,
  Button,
  Grid,
  makeStyles,
  Typography,
  colors,
} from "@material-ui/core";
import AttachMoneyRoundedIcon from "@material-ui/icons/AttachMoneyRounded";

export default function InputForm({ formik, resetFields }) {
  const classes = useStyles();
  const { errors, values, handleChange, dirty, isValid, handleSubmit } = formik;

  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <TextField
              required
              size="small"
              variant="outlined"
              fullWidth
              name="totalAmount"
              label="TOTAL AMOUNT"
              value={values.totalAmount}
              onChange={handleChange}
              error={errors.totalAmount && true}
              helperText={errors.totalAmount}
              InputProps={{
                endAdornment: (
                  <AttachMoneyRoundedIcon className={classes.inputAdornment} />
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} lg={6}>
            <TextField
              required
              size="small"
              variant="outlined"
              fullWidth
              name="systemSize"
              label="SYSTEM SIZE"
              value={values.systemSize}
              onChange={handleChange}
              error={errors.systemSize && true}
              helperText={errors.systemSize}
              InputProps={{
                endAdornment: (
                  <Typography
                    variant="subtitle2"
                    className={classes.inputAdornment}
                  >
                    kW
                  </Typography>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} lg={6}>
            <TextField
              required
              size="small"
              variant="outlined"
              fullWidth
              name="efficiency"
              label="EFFICIENCY"
              value={values.efficiency}
              onChange={handleChange}
              error={errors.efficiency && true}
              helperText={errors.efficiency}
              InputProps={{
                endAdornment: (
                  <Typography
                    variant="subtitle2"
                    className={classes.inputAdornment}
                  >
                    %
                  </Typography>
                ),
              }}
            />
          </Grid>

          <Grid item xs={6}>
            <Button
              type="submit"
              size="large"
              color="primary"
              fullWidth
              disableElevation
              variant="contained"
              disabled={!(isValid && dirty)}
            >
              APPLY
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              size="large"
              color="default"
              fullWidth
              disableElevation
              variant="contained"
              onClick={resetFields}
            >
              reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
}

const useStyles = makeStyles((theme) => ({
  inputAdornment: {
    color: colors.grey["600"],
  },
}));
