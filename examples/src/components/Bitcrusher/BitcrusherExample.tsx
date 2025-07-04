import Bitcrusher from "./Bitcrusher";
import SamplePad from "../SamplePad/SamplePad";
import Waveform from "../Waveform/Waveform";
import StaticWaveform from "../Waveform/StaticWaveform";

type Props = {};

const BitcrusherExample = (props: Props) => {
  return (
    <div>
      <SamplePad file="./music/ff8-magic.mp3" waveform>
        <Bitcrusher />
      </SamplePad>
    </div>
  );
};

export default BitcrusherExample;
