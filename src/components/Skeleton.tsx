import Skeleton from "@mui/material/Skeleton";

//import styles
import { Container } from "@mui/material";

const SkeletonCard = () => {
  return (
    <Container sx={{ width: "350px" }}>
      <Skeleton width="100%" height="300px" />
      <Skeleton width="100%" height="20px" />
      <Skeleton width="100%" height="40px" />
      <Skeleton width="100%" height="20px" />
    </Container>
  );
};

export default SkeletonCard;
