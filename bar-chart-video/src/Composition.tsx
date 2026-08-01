import { Composition } from "remotion";
import { BarChart } from "./BarChart";

export const MyComposition = () => {
  return (
    <Composition
      id="BarChart"
      component={BarChart}
      durationInFrames={150}
      fps={30}
      width={1280}
      height={720}
    />
  );
};
