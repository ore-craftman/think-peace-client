export const Container = ({
  children,
  overflow,
}: {
  children: JSX.Element | JSX.Element[];
  overflow?: boolean;
}) => {
  return (
    <main
      className={`container max-w-md mx-auto ${
        overflow ? "min-h-screen" : " h-screen overflow-hidden"
      }`}
    >
      {children}
    </main>
  );
};
