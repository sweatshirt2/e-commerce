import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";

export const actionClient = createSafeActionClient({
  defineMetadataSchema: () => {
    return z.object({
      actionName: z.string(),
    });
  },
  handleServerError: (e, utils) => {
    const { clientInput, metadata } = utils;

    const errorMessage = e.message;

    if (e) {
      console.log("\n\n Error", e);
      console.log("\n\n Error Message", errorMessage);
      console.log("\n\n Client Input", clientInput);
      console.log("\n\n Metadata", metadata);
    }

    return errorMessage;
  },
});
