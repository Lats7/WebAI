/** Fixed page background. Each site style has its own layer. */
export function Backdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      <div className="backdrop-mission mc-only" />
      <div className="backdrop-workspace ws-only" />
    </div>
  );
}
