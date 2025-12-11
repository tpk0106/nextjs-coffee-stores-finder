// import { useParams } from "next/navigation";
// import { Route } from "next";
import Link from "next/link";
import Image from "next/image";

import { fetchCoffeeStore, fetchCoffeeStores } from "@/app/lib/coffee-stores";
import type { CoffeeStoreType, serverParamsType } from "@/types";
import { createCoffeeStore } from "@/app/lib/airtable";
import Upvote from "@/app/components/upvote.client";
import { getDomain } from "@/utils";

async function getData(id: string) {
  const coffeeStoreFromMapbox = await fetchCoffeeStore(id);
  const coffeeStoreInAirtable = await createCoffeeStore(
    coffeeStoreFromMapbox,
    id
  );

  // console.log("coffe airtable rec: ", coffeeStoreInAirtable);
  const voting = coffeeStoreInAirtable ? coffeeStoreInAirtable[0].voting : 0;
  // id = "dXJuOm1ieGFkci1zdHI6M2E5MmMwOTctNjE1NS00MmIxLWJjYTctODExZDQwMmZiYzUx";
  // const coffeStoreFromAirtable = findRecordByFilter(id);
  // const coffeeStoreFromMapbox = {};
  return coffeeStoreFromMapbox ? { ...coffeeStoreFromMapbox, voting } : {};
}

export const generateStaticParams = async () => {
  const MELBOURNE_LONG_LAT = "144.9511684419639%2C-37.803084077799056";
  const coffeeStores = await fetchCoffeeStores(MELBOURNE_LONG_LAT, 6);
  const resolvedCoffeeStores = await Promise.all(coffeeStores);

  // console.log(
  //   "IDS",
  //   resolvedCoffeeStores.map((s: CoffeeStoreType) => s?.id?.toString())
  // );

  return resolvedCoffeeStores.map((store: CoffeeStoreType) => ({
    id: store?.id?.toString(),
  }));
};

// type serverParamsType = {
//   params: Promise<{ id: string }>;
//   searchParams: Promise<{ id: string }>;
// };

export async function generateMetadata({
  params,
  searchParams,
}: serverParamsType) {
  const { id } = await params;

  const coffeeStore = await fetchCoffeeStore(id);

  const { name } = coffeeStore;

  return {
    title: name,
    description: `${name} Coffee store`,
    metadataBase: getDomain(),
    alternates: {
      canonical: `/coffee-store/${id}`,
    },
  };
}

// export default async function Page(props: { params: { id: string } }) {
export default async function Page(props: {
  params: Promise<{ id: string }>;
  // searchParams: Promise<{ id: string }>;
}) {
  // const {
  //   params: { id },
  // } = props;
  // const images = await loadPhotos();
  // console.log("PHOTOS : ", images);

  // const { id } = await props.params;
  const { id } = await props.params;
  // const searchParams = await props.searchParams;
  // const { id: queryId } = searchParams;
  // console.log("id", id);

  const coffeeStore = await getData(id);

  // console.log("coffee Store : ", coffeeStore);

  const { name = "", imageUrl = "", address = "", voting } = coffeeStore;

  // console.log("URL : ", imageUrl);

  return (
    <div className="h-full pb-80">
      <div className="m-auto grid max-w-full px-12 py-12 lg:max-w-6xl lg:grid-cols-2 lg:gap-4">
        <div className="">
          <div className="mb-2 mt-24 text-lg font-bold">
            <Link href="/">← Back to home</Link>
          </div>
          <div className="my-4">
            <h1 className="text-4xl">{name}</h1>
          </div>
          <Image
            src={
              imageUrl ||
              "https://images.unsplash.com/photo-1562447457-579fc34967fb?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGNvZmZlZXxlbnwwfHwwfHx8MA%3D%3D"
            }
            width={740}
            height={360}
            className="max-h-[420px] min-w-full max-w-full rounded-lg border-2 sepia lg:max-w-[470px] "
            alt={"Coffee Store Image"}
          />
        </div>
        <div className={`glass mt-12 flex-col rounded-lg p-4 lg:mt-48`}>
          {address && (
            <div className="mb-4 flex">
              <Image
                src="/static/icons/places.svg"
                width="24"
                height="24"
                alt="places icon"
              />
              <p className="pl-2">{address}</p>
            </div>
          )}
          {/* <Upvote voting={voting} id={id} /> */}
          <Upvote initialVoting={voting} id={id} />
        </div>
      </div>
    </div>
  );
}
