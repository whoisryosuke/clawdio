import { Heading } from "@whoisryosuke/oat-milk-design";
import SamplePad from "../SamplePad/SamplePad";
import Moog from "./Moog";

type Props = {};

const MoogExample = (props: Props) => {
  return (
    <div>
      <Heading type="h2">Moog</Heading>
      <SamplePad file="./music/ff8-magic.mp3" waveform>
        <Moog />
      </SamplePad>
    </div>
  );
};

export default MoogExample;
