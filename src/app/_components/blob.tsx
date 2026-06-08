//We adjust the size and position of the blob with props
export default function Blob({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full bg-[radial-gradient(circle_at_center,#fe5b4b_0%,rgba(255,0,0,.5)_70%)] opacity-50 blur-[80px] ${className}`}
    />
  );
}
