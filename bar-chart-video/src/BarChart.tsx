import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type BarDatum = {
  label: string;
  value: number;
  color: string;
};

const data: BarDatum[] = [
  { label: "Mon", value: 42, color: "#6366F1" },
  { label: "Tue", value: 68, color: "#8B5CF6" },
  { label: "Wed", value: 35, color: "#EC4899" },
  { label: "Thu", value: 90, color: "#F59E0B" },
  { label: "Fri", value: 57, color: "#10B981" },
];

const MAX_VALUE = 100;
const CHART_HEIGHT = 420;
const BAR_WIDTH = 120;
const BAR_GAP = 60;

export const BarChart: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      name="Scene"
      style={{
        backgroundColor: "#0F172A",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <Interactive.Div
        name="Title"
        style={{
          opacity: interpolate(frame, [0, fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          }),
          fontSize: 56,
          fontWeight: 700,
          color: "white",
          marginBottom: 60,
        }}
      >
        Weekly Signups
      </Interactive.Div>

      <div
        style={{
          display: "flex",
          alignItems: "flex-end",
          gap: BAR_GAP,
          height: CHART_HEIGHT,
        }}
      >
        {data.map((bar, i) => {
          const delay = fps * 0.5 + i * fps * 0.15;
          const barHeight = (bar.value / MAX_VALUE) * CHART_HEIGHT;

          return (
            <Interactive.Div
              key={bar.label}
              name={`Bar ${bar.label}`}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-end",
                width: BAR_WIDTH,
                height: CHART_HEIGHT,
              }}
            >
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 600,
                  color: "white",
                  marginBottom: 12,
                  opacity: interpolate(
                    frame,
                    [delay + fps * 0.4, delay + fps * 0.6],
                    [0, 1],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
                  ),
                }}
              >
                {bar.value}
              </div>
              <div
                style={{
                  width: BAR_WIDTH,
                  height: barHeight,
                  backgroundColor: bar.color,
                  borderRadius: "12px 12px 0 0",
                  transformOrigin: "bottom",
                  scale: `1 ${interpolate(
                    frame,
                    [delay, delay + fps * 0.6],
                    [0, 1],
                    {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                      easing: Easing.spring({ damping: 200 }),
                    },
                  )}`,
                }}
              />
              <div
                style={{
                  fontSize: 28,
                  color: "#CBD5E1",
                  marginTop: 20,
                  opacity: interpolate(
                    frame,
                    [delay + fps * 0.4, delay + fps * 0.6],
                    [0, 1],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
                  ),
                }}
              >
                {bar.label}
              </div>
            </Interactive.Div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
