const TripConfigurator = ({ id }: { id: string | undefined }): JSX.Element => {
  console.log(id);
  return (
    <>
      <h1> helli world {id}</h1>
    </>
  );
};

export default TripConfigurator;
