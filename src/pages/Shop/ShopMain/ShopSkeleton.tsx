import Home_Skeleton from "../../Home/Home_Skeleton";

interface Props {
  loading: boolean;
}
const ShopSkeleton: React.FC<Props> = ({ loading }) => {
  if (loading) {
    return (
      <>
        {loading &&
          [...Array(10)].map((_, index) => (
            <Home_Skeleton key={index} index={index} />
          ))}
      </>
    );
  } else {
    return;
  }
};

export default ShopSkeleton;
