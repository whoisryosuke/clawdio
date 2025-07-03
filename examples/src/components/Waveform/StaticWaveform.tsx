import { LineGraph } from "@whoisryosuke/oat-milk-design";
import mapRange from "../../utils/mapRange";

type Props = {
  buffer?: AudioBuffer;
};

const StaticWaveform = ({ buffer, ...props }: Props) => {
  // Get the waveform data
  const waveformData = buffer ? buffer.getChannelData(0) : [];

  const graph: number[] = [];

  // Map the waveform data form -1 to 1 to the graphs Y axis
  // Default is 0,1 for graph (lowest scale) - but we might scale up for zooming
  waveformData.forEach((data) => graph.push(mapRange(data, -1, 1, -4, 5)));

  return <LineGraph data={graph} color={"blue"} width={400} height={300} />;
};

export default StaticWaveform;
