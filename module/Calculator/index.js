import { useState, useEffect } from "react";
import {
  Container,
  Box,
  Grid,
  makeStyles,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import CalculationForm from "./CalculationForm";
import Plan from "./Plan";
import InfoContent from "./InfoContent";
import { v4 as uuid } from "uuid";

const validationSchema = Yup.object().shape({
  totalAmount: Yup.number()
    .moreThan(1, "Please insert a valid amount")
    .positive("Please insert a valid amount")
    .typeError("Please insert a valid amount"),
  systemSize: Yup.number()
    .moreThan(1, "Please insert a valid size")
    .positive("Please insert a valid size")
    .typeError("Please insert a valid size"),
  efficiency: Yup.number()
    .moreThan(1, "Please insert a valid efficiency")
    .positive("Please insert a valid efficiency")
    .typeError("Please insert a valid efficiency"),
});

export default function Calculator() {
  const classes = useStyles();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedMonths, setSelectedMonths] = useState([12]);
  const [months] = useState([12, 24, 36, 48, 60, 72]);
  const [results, setResults] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  let initialValues = {
    totalAmount: "",
    systemSize: "",
    efficiency: "",
  };

  let onSubmit = async (values) => {
    setIsSubmitted(true);
    generateResults();
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  const { values, resetForm } = formik;

  const handleMonthSelection = (month) => {
    if (month === 12) {
      return;
    }

    let isExists = selectedMonths.indexOf(month) >= 0 ? true : false;

    if (!isExists) {
      setSelectedMonths([...selectedMonths, month]);
    } else {
      let index = selectedMonths.indexOf(month);
      setSelectedMonths(selectedMonths.filter((item) => item !== month));
    }
  };

  const resetFields = () => {
    setIsSubmitted(false);
    resetForm();
  };

  // Calculation functions
  function calculatePayment({ values, month }) {
    let { totalAmount } = values;
    let yearCount = month / 12;
    let factor = new Map([
      [12, 1.03],
      [24, 1.03],
      [36, 1.05],
      [48, 1.07],
      [60, 1.1],
      [72, 1.1],
    ]);

    let totalCost = (
      totalAmount * factor.get(month) +
      (month === 24 ? 200 : 0)
    ).toFixed(2);
    let perWeek = (totalCost / 52 / yearCount).toFixed(2);

    return {
      totalCost,
      perWeek,
    };
  }

  function calculateSavings({ values, month }) {
    let yearCount = month / 12;
    let weeks = 52;
    let { systemSize, efficiency } = values;
    let perWeek = ((systemSize * 0.18 * 7 * 3.9 * efficiency) / 100).toFixed(2);
    let totalCost = (perWeek * weeks * yearCount).toFixed(2);

    return {
      perWeek,
      totalCost,
    };
  }

  function generateResults() {
    let results = [];
    selectedMonths.forEach((month) => {
      let result = {
        month,
        payment: calculatePayment({ values, month }),
        savings: calculateSavings({ values, month }),
      };

      results.push(result);
    });

    setResults(results);
  }

  useEffect(() => {
    if (isSubmitted) {
      generateResults();
    } else {
      setIsSubmitted(false);
    }
  }, [isSubmitted, selectedMonths]);

  return (
    <Container>
      <Box mt={4}>
        <Grid container justify="center" spacing={6}>
          <Grid item xs={12} lg={6}>
            <Paper variant="outlined">
              <Box p={3}>
                <CalculationForm {...{ formik, resetFields }} />
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} lg={6}>
            <Paper variant="outlined" className={classes.infoCard}>
              <InfoContent
                {...{ values, months, selectedMonths, handleMonthSelection }}
              />
            </Paper>
          </Grid>

          <Grid item xs={12}>
            {isSubmitted && results.length > 0 && (
              <Paper>
                <Box p={sm ? 2 : 4}>
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      <Box textAlign="center" mt={1} mb={2}>
                        <Typography
                          variant="h1"
                          className={classes.resultTitle}
                        >
                          Solar is a HIGH performing INVESTMENT
                        </Typography>
                      </Box>
                    </Grid>
                    {results.map((result) => (
                      <Grid key={uuid()} item lg={6} xs={12}>
                        <Plan {...{ result }} />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Paper>
            )}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  resultTitle: {
    fontFamily: "Poppins",
    fontSize: 48,
    letterSpacing: "0.01em",
    fontWeight: 700,
  },
  infoCard: {
    height: "100%",
  },
}));
