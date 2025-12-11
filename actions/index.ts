"use server";

import { updateCoffeeStore } from "../app/lib/airtable";

// Define a common type for the state that flows between client and server
type prevState = {
  voting: number;
  id: string;
};

// Ensure the signature matches useFormState requirements exactly
const upvoteAction = async (
  prevState: prevState | undefined
  //   formData: FormData
) => {
  console.log("upvote action");

  const id = prevState?.id;

  //   console.log("form Data : ", { formData });
  //   const id1 = formData.get("id") as string;
  //   console.log("form data get id1 :", id1);

  console.log("PREVSTATE", { prevState });
  console.log("prev state id", id);

  // Use a fallback for the previous voting count if prevState is undefined (on first render/initial state)
  // Use nullish coalescing to safely access voting, defaulting to 0 if prevState is undefined

  const previousVoting = prevState?.voting ?? 0;

  if (!id) {
    console.error("ID is missing from form data");
    return { voting: previousVoting, id: id! };
  }

  const data = await updateCoffeeStore(id);
  console.log({ data });

  // Assuming updateCoffeeStore returns an array where data[0].voting has the new number
  if (data && data.length > 0) {
    return {
      voting: data[0].voting,
      id: id,
    };
  }

  // Return previous state if update failed
  return { voting: previousVoting, id: id };
};

export default upvoteAction;
