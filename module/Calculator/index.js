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
import { CollectionsOutlined } from "@material-ui/icons";

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
  energyCost: Yup.number()
    .moreThan(0, "Please insert a valid energy cost")
    .positive("Please insert a valid energy cost")
    .typeError("Please insert a valid energy cost"),
  yearlyIncreasing: Yup.number()
    .moreThan(0, "Please insert a valid yearly increasing")
    .positive("Please insert a valid yearly increasing")
    .typeError("Please insert a valid yearly increasing"),
  environmentEfficiency: Yup.number()
    .moreThan(0, "Please insert a valid environment efficiency")
    .positive("Please insert a valid yearly environment efficiency")
    .typeError("Please insert a valid yearly environment efficiency"),
});

export default function Calculator() {
  const classes = useStyles();
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [months] = useState([12, 24, 36, 48, 60, 72]);
  const [results, setResults] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  let initialValues = {
    totalAmount: "",
    systemSize: "",
    efficiency: "",
    energyCost: "0.18",
    yearlyIncreasing: "3",
    environmentEfficiency: "100",
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
    let totalWeeks = yearCount * weeks;
    let {
      systemSize,
      efficiency,
      energyCost,
      yearlyIncreasing,
      environmentEfficiency,
    } = values;
    // let energyCost = 0.25;
    let dailyAverage = 3.9;

    // Old calculation method
    // let perWeek = ((systemSize * 0.18 * 7 * 3.9 * efficiency) / 100).toFixed(2);
    // let totalCost = (perWeek * weeks * yearCount).toFixed(2);

    // New calculation
    let dailyCost = (systemSize * dailyAverage * energyCost * efficiency) / 100;
    let totalCost = (dailyCost * 365 * environmentEfficiency) / 100;
    let perWeek = (totalCost / weeks).toFixed(2);

    // For chart usage
    let twoYearCost = totalCost + (totalCost * yearlyIncreasing) / 100;
    let threeYearCost = twoYearCost + (twoYearCost * yearlyIncreasing) / 100;
    let fourYearCost = threeYearCost + (threeYearCost * yearlyIncreasing) / 100;
    let fiveYearCost = fourYearCost + (fourYearCost * yearlyIncreasing) / 100;
    let sixYearCost = fiveYearCost + (fiveYearCost * yearlyIncreasing) / 100;

    let costs = new Map([
      [1, totalCost.toFixed(2)],
      [2, twoYearCost.toFixed(2)],
      [3, threeYearCost.toFixed(2)],
      [4, fourYearCost.toFixed(2)],
      [5, fiveYearCost.toFixed(2)],
      [6, sixYearCost.toFixed(2)],
    ]);

    // for column usage
    let twoYearSavings =
      totalCost + (totalCost * yearlyIncreasing) / 100 + totalCost;
    let threeYearSavings =
      twoYearSavings + (twoYearSavings * yearlyIncreasing) / 100 + totalCost;
    let fourYearSavings =
      threeYearSavings +
      (threeYearSavings * yearlyIncreasing) / 100 +
      totalCost;
    let fiveYearSavings =
      fourYearSavings + (fourYearSavings * yearlyIncreasing) / 100 + totalCost;
    let sixYearSavings =
      fiveYearSavings + (fiveYearSavings * yearlyIncreasing) / 100 + totalCost;

    let savings = new Map([
      [1, totalCost.toFixed(2)],
      [2, twoYearSavings.toFixed(2)],
      [3, threeYearSavings.toFixed(2)],
      [4, fourYearSavings.toFixed(2)],
      [5, fiveYearSavings.toFixed(2)],
      [6, sixYearSavings.toFixed(2)],
    ]);

    return {
      perWeek,
      totalCost: costs.get(yearCount),
      yearlySavings: savings.get(yearCount),
      firstYearSavings: totalCost.toFixed(2),
      perWeekNew: (savings.get(yearCount) / yearCount / 52).toFixed(2),
    };
  }

  function generateChartData(monthSelected) {
    let appMonths = [...months];

    let index = appMonths.indexOf(monthSelected) + 1;
    let resultMonths = appMonths.slice(0, index);

    let charAnnualCosts = [];
    let chartSavings = [];

    for (let month of resultMonths) {
      let payment =
        calculatePayment({ values, month: monthSelected }).totalCost /
        (monthSelected / 12);

      let savings = calculateSavings({ values, month }).totalCost;
      charAnnualCosts.push(payment);
      chartSavings.push(savings);
    }
    let chartLabels = resultMonths.map((month, index) => {
      let monthsLength = resultMonths.length;
      let resultIndex = index + 1;

      // if (monthsLength === resultIndex) {
      //   return `${month}   (month)`;
      // } else {
      //   return month;
      // }
      return [month, "Months"];
    });

    let extra = new Map([
      [12, [600]],
      [24, [600, 800]],
      [36, [600, 800, 1000]],
      [48, [600, 800, 1000, 1200]],
      [60, [600, 800, 1000, 1200, 1400]],
      [72, [600, 800, 1000, 1200, 1400, 1600]],
    ]);

    return {
      chartLabels,
      charAnnualCosts,
      chartSavings,
      chartExtra: extra.get(monthSelected),
    };
  }

  function generateResults() {
    let results = [];

    selectedMonths.forEach((month) => {
      let chartData = generateChartData(month);
      let result = {
        month,
        payment: calculatePayment({ values, month }),
        savings: calculateSavings({ values, month }),
        chartData,
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
                <CalculationForm {...{ formik, resetFields, selectedMonths }} />
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
                        <Plan {...{ result, selectedMonths }} />
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
