import {cn} from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export const GradientWrapper = ({children, className}: Props) => {
  return (
    <div className="h-full bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-900 via-blue-700 to-blue-800">
      <div className={cn("h-full w-full space-y-4", className)}>{children}</div>
    </div>
  );
};
