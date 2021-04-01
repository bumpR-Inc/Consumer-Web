import { useRecoilState } from "recoil";
import { landingPageState } from "../state/Atoms";
import LandingPage from "./LandingPage/LandingPage";
import OrderingHomePage from "./Ordering/OrderingHomePage";

export default function HomePage() {
  const [onLanding] = useRecoilState(landingPageState);

  return onLanding ? <LandingPage /> : <OrderingHomePage/>;
}
