export const Container = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  return (
    <main className="container max-w-md mx-auto h-screen overflow-hidden">
      {children}
    </main>
  );
};
