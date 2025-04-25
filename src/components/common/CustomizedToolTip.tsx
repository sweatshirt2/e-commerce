import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

type CustomizedToolTipProps = {
  title: string;
  paragraph?: string | null;
};

export default function CustomizedToolTip({
  title,
  paragraph,
}: CustomizedToolTipProps) {
  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <p className="text-xs">{title}</p>
          </TooltipTrigger>
          <TooltipContent>
            <p>{paragraph ?? ""}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
