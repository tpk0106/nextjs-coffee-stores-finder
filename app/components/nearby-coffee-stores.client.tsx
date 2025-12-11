"use client";

import { CoffeeStoreType } from "@/types";
import Banner from "./banner.client";

import { UseTrackLocation } from "@/hooks/use-track-location";
// import { fetchCoffeeStores } from "../lib/coffee-stores";
import Card from "./card.server";
import { useEffect, useState } from "react";

export default function NearByCoffeeStores() {
  const { handleTrackLocation, isFindingLocation, longLat, errorLocation } =
    UseTrackLocation();
  const handleOnClick = () => {
    handleTrackLocation();
    console.log("passed Lat/Long", longLat);
    //   fetchCoffeeStores()
  };

  const [coffeeStores, setCoffeeStores] = useState([]);

  useEffect(() => {
    async function coffeeStoresByLocation() {
      console.log("inside effect : ");
      if (longLat) {
        try {
          const limit = 10;
          const response = fetch(
            `/api/getCoffeeStoresByLocation?longLat=${longLat}&limit=${limit}`
          );
          //   const stores = await (await response).json();
          //   const stores = (await response).json;
          const stores = await (await response).json();
          setCoffeeStores(stores);
          console.log("STORES :", coffeeStores);
        } catch (error) {
          console.error(error);
        }
      }
    }
    coffeeStoresByLocation();
  }, [longLat]);

  return (
    <div>
      <Banner
        handleOnClick={handleOnClick}
        buttonText={isFindingLocation ? "Locating..." : "View stores Nearby"}
      />
      {/* Location : {longLat} */}

      <div className="mt-20">
        <h2 className="mt-8 pb-8 text-4xl font-bold text-white">
          Stores near me
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-2 lg:grid-cols-3 lg:gap-6">
          {coffeeStores?.length > 0 &&
            coffeeStores?.map((store: CoffeeStoreType) => {
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
      {errorLocation && <p>Error : {errorLocation} </p>}
    </div>
  );
}
