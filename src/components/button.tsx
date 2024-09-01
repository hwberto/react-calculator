import { cn } from "../lib/utils";

export default function Button({
  className,
  action,
  children,
}: Readonly<{
  className?: string;
  action: () => void;
  children: React.ReactNode;
}>) {
  return (
    <button
      className={cn(
        "rounded-full h-[55px] w-[55px] [&:not(:nth-child(4n))]:bg-gradient-to-b [&:not(:nth-child(4n))]:from-slate-900/20 [&:not(:nth-child(4n))]:to-slate-800 shadow-[inset_0px_3px_5px_hsla(0,100%,100%,.06),inset_0px_-3px_5px_hsla(0,0%,0%,.3),0px_10px_15px_hsla(0,0%,0%,.3)] [&:nth-child(4n)]:bg-gradient-to-b [&:nth-child(4n)]:from-indigo-950 [&:nth-child(4n)]:to-indigo-900 hover:brightness-150 flex justify-center items-center font-semibold text-xl uppercase",
        className,
      )}
      onClick={action}
    >
      {children}
    </button>
  );
}
