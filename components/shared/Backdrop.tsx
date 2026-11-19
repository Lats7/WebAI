/** Fixed page background and film grain. Each site style has its own light. */
export function Backdrop() {
  return (
    <>
      <div className="backdrop" aria-hidden="true">
        <div className="backdrop-mission mc-only" />
        <div className="backdrop-workspace ws-only" />
      </div>
      <div className="grain" aria-hidden="true" />
    </>
  );
}
