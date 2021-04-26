import {
  Box,
  Typography,
  makeStyles,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import PaymentIcon from "images/payment.svg";
import SavingsIcon from "images/savings.svg";
import PlanChart from "./Chart";

export default function Plan({ result, selectedMonths }) {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));
  const { chartData } = result;

  const classes = useStyles();
  return (
    <Box mt={3}>
      <Box textAlign="center">
        <Typography variant="h5" className={classes.planName}>
          {result.month} Month Investment Plan
        </Typography>
      </Box>

      <Box mt={2} className={classes.planContent}>
        <Box className={classes.paymentSection}>
          <Box className={classes.paymentIconBox} textAlign="center" p={2}>
            <PaymentIcon className={classes.icon} />
          </Box>
          <Box className={classes.paymentContent} p={1}>
            <Box textAlign="center">
              <Typography
                variant="h6"
                style={{ color: "white", fontSize: sm ? 14 : 20 }}
              >
                Your Payments
              </Typography>
            </Box>
            <Box textAlign="center" mt={4}>
              <Typography
                variant="h1"
                style={{
                  color: "white",
                  fontSize: sm ? 36 : 48,
                  fontWeight: 600,
                }}
              >
                ${result.payment.perWeek}
              </Typography>
            </Box>
            <Box textAlign="center">
              <Typography
                variant="h6"
                style={{ color: "white", fontSize: 20, fontWeight: 400 }}
              >
                Per Week
              </Typography>
            </Box>

            <Box textAlign="center" mt={4}>
              <Typography
                variant="subtitle1"
                style={{ color: "white", fontSize: sm ? 12 : 16 }}
              >
                {result.month} Month Total Cost
              </Typography>
            </Box>
            <Box textAlign="center">
              <Typography variant="subtitle1" style={{ color: "white" }}>
                ${result.payment.totalCost}
              </Typography>
            </Box>

            <Box textAlign="center" mt={2}>
              <Typography
                variant="subtitle1"
                style={{ color: "white", fontSize: sm ? 12 : 16 }}
              >
                1st-Year Cost
              </Typography>
            </Box>
            <Box textAlign="center">
              <Typography variant="subtitle1" style={{ color: "white" }}>
                ${(result.payment.totalCost / (result.month / 12)).toFixed(2)}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Box className={classes.savingsSection}>
          <Box className={classes.savingsIconBox} textAlign="center" p={2}>
            <SavingsIcon className={classes.icon} />
          </Box>
          <Box className={classes.savingsContent} p={1}>
            <Box textAlign="center">
              <Typography
                variant="h6"
                style={{ color: "white", fontSize: sm ? 14 : 20 }}
              >
                Estimated Benefits
              </Typography>
            </Box>
            <Box textAlign="center" mt={4}>
              <Typography
                variant="h1"
                style={{
                  color: "white",
                  fontSize: sm ? 36 : 48,
                  fontWeight: 600,
                }}
              >
                ${result.savings.perWeek}
              </Typography>
            </Box>
            <Box textAlign="center">
              <Typography
                variant="h6"
                style={{ color: "white", fontSize: 20, fontWeight: 400 }}
              >
                Per Week
              </Typography>
            </Box>

            <Box textAlign="center" mt={4}>
              <Typography
                variant="subtitle1"
                style={{ color: "white", fontSize: sm ? 12 : 16 }}
              >
                {result.month} Month Total Estimated
              </Typography>
            </Box>
            <Box textAlign="center">
              <Typography variant="subtitle1" style={{ color: "white" }}>
                ${result.savings.totalCost}
              </Typography>
            </Box>
            <Box textAlign="center" mt={2}>
              <Typography
                variant="subtitle1"
                style={{ color: "white", fontSize: sm ? 12 : 16 }}
              >
                1st-Year Benefits
              </Typography>
            </Box>
            <Box textAlign="center">
              <Typography variant="subtitle1" style={{ color: "white" }}>
                ${(result.savings.perWeek * 52).toFixed(2)}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box className={classes.planChart}>
        <Box p={4}>
          <PlanChart {...{ chartData }} />
        </Box>
      </Box>
    </Box>
  );
}
const useStyles = makeStyles((theme) => ({
  planChart: {
    backgroundColor: "#fafafa",
  },
  planName: {
    fontFamily: "Poppins",
    fontSize: 20,
    fontWeight: 600,
  },
  planContent: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
  },
  paymentIconBox: {
    backgroundColor: "#3361C5",
  },
  paymentContent: {
    backgroundColor: "#3361C5",
    marginTop: 4,
  },
  savingsIconBox: {
    backgroundColor: "#4C9A5A",
  },
  savingsContent: {
    backgroundColor: "#4C9A5A",
    marginTop: 4,
  },
  icon: {
    width: 60,
    color: "white",
  },
}));
