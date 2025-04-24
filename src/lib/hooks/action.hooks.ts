// import { useToast } from "./toast.hook";
import { HookSafeActionFn, useAction } from "next-safe-action/hooks";
import { Schema } from "zod";

type TCustomAction = {
  action: HookSafeActionFn<
    string,
    Schema | undefined,
    readonly Schema[],
    Record<string, string | string[] | undefined>,
    unknown,
    { message: string } | undefined
  >;
  onSuccess?: (data: unknown) => void;
  onError?: (data: unknown) => void;
  successMessage?: string;
  errorMessage?: string;
};

export const useCustomAction = ({
  action,
  onSuccess,
  onError,
  successMessage,
}: // errorMessage,
TCustomAction) => {
  // const { toast } = useToast();

  return useAction(action, {
    onSuccess:
      onSuccess ||
      (({ data }) => {
        console.log("successs");
        // toast({
        //   title: "Success",
        //   description:
        //     successMessage ??
        //     String(data?.message) ??
        //     "Action Performed Successfully",
        //   // action: (() => {}),
        // });
      }),
    onError:
      onError ||
      (({ error }) => {
        console.log(error);
        console.log("errororror");
        // toast({
        //   title: "Error",
        //   description:
        //     // errorMessage ??
        //     // String(error?.serverError ?? error?.validationErrors) ?? 'Action Failed,',
        //     error.serverError,
        //   variant: "destructive",
        //   // action: (() => {}),
        // });
      }),
  });
};
