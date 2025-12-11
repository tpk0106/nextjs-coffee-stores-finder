"use client";

import { useActionState } from "react";

import Image from "next/image";
import upvoteAction from "@/actions";

// Use the same type name defined on the server side for consistency
type prevState = {
  voting: number;
  id: string;
};

export default function Upvote({
  initialVoting,
  id,
}: {
  initialVoting: number;
  id: string;
}) {
  const handleOnClick = () => {
    // console.log("Vote up!");
    // console.log("passed data : ", { initialState });
  };

  const initialState: prevState = {
    voting: initialVoting,
    id: id,
  };

  const [state, dispatch, isPending] = useActionState(
    upvoteAction,
    initialState
  );

  return (
    <form action={dispatch}>
      {/* <input name="id" hidden value={state.id} /> */}
      <div className="mb-6 flex">
        <Image
          src="/static/icons/star.svg"
          width="24"
          height="24"
          alt="star icon"
        />
        <p className="pl-2 my-auto font-bold text-[18px]">{state?.voting}</p>
        <button
          onClick={handleOnClick}
          disabled={isPending}
          className="bg-purple-951 min-w-[120px] ml-5"
        >
          {isPending ? (
            <Image
              src="/static/icons/loading-spinner.svg"
              width={30}
              height={30}
              alt="lading splinner"
              className="m-auto"
            />
          ) : (
            "Up vote"
          )}
        </button>
      </div>

      {/* <SubmitButton /> */}
    </form>
  );
}

// export function SubmitButton() {
//   const { pending } = useFormStatus();

//   return (
//     <button
//       type="submit"
//       className="bg-purple-951 min-w-[120px]"
//       disabled={pending}
//       aria-disabled={pending}
//     >
//       {pending ? (
//         <Image
//           src="/static/icons/loading-spinner.svg"
//           width="30"
//           height="30"
//           alt="Loading"
//           className="m-auto"
//         />
//       ) : (
//         "Up vote!"
//       )}
//     </button>
//   );
// }
