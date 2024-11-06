interface Props {
  children: React.ReactNode;
}

const EducatorsLayout = ({ children }: Props) => {
  return (
    <div className="grid grid-cols-12">
      <div className="col-start-2 col-span-10 my-10">{children}</div>
    </div>
  );
};

export default EducatorsLayout;
