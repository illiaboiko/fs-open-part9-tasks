import { Box  } from "@mui/material";
import { HealthCheckRating } from "../../../../../types";
import FavoriteIcon from '@mui/icons-material/Favorite';

interface Props {
  healthCheckRating: HealthCheckRating
}

const HealthCheckDetails = ({healthCheckRating}:Props) => {

const colorRating = () => {
  switch (healthCheckRating) {
    case 0:
      return 'green';
    case 1:
      return "#8e9441ff";
    case 2:
      return 'yellow';
    case 3:
      return 'red';
    default:
      return '';
  }
};

return (
  <Box sx={{minWidth: 2}}>
    <FavoriteIcon sx={{color: colorRating()}} />
  </Box>
);
};

export default HealthCheckDetails;
