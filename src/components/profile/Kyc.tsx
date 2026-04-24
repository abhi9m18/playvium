type Kyc = {
  header?: React.ReactNode;
};
export default function Kyc({ header }: Kyc) {
  return (
    <>
      {header}
      <div className="text-xl">Kyc page</div>
    </>
  );
}
