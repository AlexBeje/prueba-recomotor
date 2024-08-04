export default function Section({ children }: { children: string }) {
  return (
    <div className="flex">
      <div className="rounded-l bg-primary-light px-4 py-3 font-bold text-dark">
        <h2 className="text-h2 text-nowrap">{children}</h2>
      </div>
      <div className="w-full bg-dark"></div>
    </div>
  );
}
