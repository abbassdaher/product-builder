interface IProps {
  msg: string;
}

const ValidationErrorMSG = ({ msg }: IProps) => {
  return (
    <span className="text-red-500 font-semibold text-sm">
      {msg}
    </span>
  );
};
export default ValidationErrorMSG;
