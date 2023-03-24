import { Box } from "@mui/system";
import Header from "../../components/Header";

const Dashboard = () => {
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Dashboard" subtitle="Welcome to you Dashboard" />
      </Box>
      <h1>Dashboard</h1>
    </Box>
  );
};

export default Dashboard;
