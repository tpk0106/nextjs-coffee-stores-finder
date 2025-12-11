import { Metadata } from "next";
import Card from "./components/card.server";
import NearByCoffeeStores from "./components/nearby-coffee-stores.client";
import { fetchCoffeeStores } from "./lib/coffee-stores";
import type { CoffeeStoreType } from "@/types";
import { getDomain } from "@/utils";

async function getData() {
  //mapbox api
  const MELBOURNE_LONG_LAT = "144.9511684419639%2C-37.803084077799056";
  return await fetchCoffeeStores(MELBOURNE_LONG_LAT, 6);
}

export const metadata: Metadata = {
  title: "Coffee Connoisseur",
  description: "Allows you to discover coffee stores near you",
  metadataBase: getDomain(),
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  // const { features } = await getData();

  if (
    !process.env.MAPBOX_API_KEY ||
    !process.env.UNPLASH_ACCESS_KEY ||
    !process.env.AIRTABLE_API_TOKEN
  ) {
    throw new Error("one of the API keys is not configured");
  }

  const promisedCoffeeStores = await getData();
  const coffeeStores = await Promise.all(promisedCoffeeStores);

  // console.log("Coffee stores at melbourne :", coffeeStores);

  return (
    <div className="mb-56">
      <main className="x-auto mt-10 max-w-6xl px-4">
        <NearByCoffeeStores />
        <div className="mt-20">
          <h2 className="mt-8 pb-8 text-4xl font-bold text-white">
            Melbourne Stores
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6">
            {coffeeStores?.map((store: CoffeeStoreType) => {
              return (
                <Card
                  name={store.name}
                  imageUrl={store.imageUrl}
                  href={`/coffee-store/${store.id}`}
                  key={`${store.name}-${store.id}`}
                />
              );
            })}
          </div>
        </div>

        {/* <Link href={`/coffee-store/${coffeeStoreId}`}>Dark Horse Coffee</Link> */}
      </main>
    </div>
  );
}
