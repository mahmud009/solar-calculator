import {
  Box,
  Typography,
  makeStyles,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { HomeRounded, AccountBalanceRounded } from "@material-ui/icons";

export default function Plan({ result }) {
  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

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
          <Box className={classes.paymentIconBox} textAlign="center" p={1}>
            <HomeRounded className={classes.icon} />
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
          </Box>
        </Box>

        <Box className={classes.savingsSection}>
          <Box className={classes.savingsIconBox} textAlign="center" p={1}>
            <AccountBalanceRounded className={classes.icon} />
          </Box>
          <Box className={classes.savingsContent} p={1}>
            <Box textAlign="center">
              <Typography
                variant="h6"
                style={{ color: "white", fontSize: sm ? 14 : 20 }}
              >
                Estimated Savings
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
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
const useStyles = makeStyles((theme) => ({
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
    backgroundColor: "#4C9A5A",
  },
  paymentContent: {
    backgroundColor: "#4C9A5A",
    marginTop: 4,
  },
  savingsIconBox: {
    backgroundColor: "#3361C5",
  },
  savingsContent: {
    backgroundColor: "#3361C5",
    marginTop: 4,
  },
  icon: {
    fontSize: 80,
    color: "white",
  },
}));
