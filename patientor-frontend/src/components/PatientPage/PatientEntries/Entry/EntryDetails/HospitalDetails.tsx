import { Discharge } from "../../../../../types";

interface Props {
  discharge: Discharge;
}

const HospitalDetails = ({ discharge }: Props) => {
  return (
    <div>
      Discharge:
      <p>date: {discharge.date}</p>
      <p>criteria: {discharge.criteria}</p>
    </div>
  );
};

export default HospitalDetails;
