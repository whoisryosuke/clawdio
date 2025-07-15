import Bitcrusher from "./Bitcrusher";
import SamplePad from "../SamplePad/SamplePad";
import Waveform from "../Waveform/Waveform";
import StaticWaveform from "../Waveform/StaticWaveform";
import { Heading } from "@whoisryosuke/oat-milk-design";

type Props = {};

const BitcrusherExample = (props: Props) => {
  return (
    <div>
      <Heading type="h2">Bitcrusher</Heading>

      <SamplePad file="./music/ff8-magic.mp3" waveform>
        <Bitcrusher />
      </SamplePad>
    </div>
  );
};

export default BitcrusherExample;
