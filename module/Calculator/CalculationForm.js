import React, { useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Grid,
  makeStyles,
  Typography,
  colors,
} from "@material-ui/core";

export default function InputForm({ formik, resetFields, selectedMonths }) {
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
                  <Typography
                    variant="subtitle2"
                    className={classes.inputAdornment}
                  >
                    $
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

          <Grid item xs={12} lg={12}>
            <TextField
              required
              size="small"
              variant="outlined"
              fullWidth
              name="energyCost"
              label="ENERGY COST"
              value={values.energyCost}
              onChange={handleChange}
              error={errors.energyCost && true}
              helperText={errors.energyCost}
              InputProps={{
                endAdornment: (
                  <Typography
                    variant="subtitle2"
                    className={classes.inputAdornment}
                  >
                    $
                  </Typography>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12} lg={12}>
            <TextField
              required
              size="small"
              variant="outlined"
              fullWidth
              name="yearlyIncreasing"
              label="ELECTRICITY YEARLY INCREASING"
              value={values.yearlyIncreasing}
              onChange={handleChange}
              error={errors.yearlyIncreasing && true}
              helperText={errors.yearlyIncreasing}
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

          <Grid item xs={12} lg={12}>
            <TextField
              required
              size="small"
              variant="outlined"
              fullWidth
              name="environmentEfficiency"
              label="ENVIRONMENT EFFICIENCY"
              value={values.environmentEfficiency}
              onChange={handleChange}
              error={errors.environmentEfficiency && true}
              helperText={errors.environmentEfficiency}
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
              disabled={!(isValid && dirty) || selectedMonths.length <= 0}
            >
              APPLY
              {/*  */}
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
