import type { MapBoxType } from "@/types";

const fetchCoffeeStores = async (longLat: string, limit: number) => {
  //  console.log("KEY 1", process.env.MAPBOX_API_KEY);
  //  console.log("KEY 2 :", process.env.NEXT_PUBLIC_MAPBOX_API_KEY);
  //  console.log("KEY 3 :", process.env["NEXT_PUBLIC_MAPBOX_API_KEY"]);

  const env = process.env;

  try {
    const response = await fetch(
      `https://api.mapbox.com/search/geocode/v6/forward?q=coffee+shop%2coffee&proximity=${longLat}&limit=${limit}&country=au&access_token=${env.MAPBOX_API_KEY}`
    );
    const data = await response.json();
    // console.log("Featrures : ", data.features);

    const listOfCoffeeShopsPhotos = await getListOfCoffeeShopPhotos();
    console.log("COFFEE PHOTOS FROM UNPLASH======> ", listOfCoffeeShopsPhotos);

    return data?.features?.map(
      (result: MapBoxType, index: number) =>
        transformCofeeData(result, index, listOfCoffeeShopsPhotos) || []
    );

    // return data.features.map((result: MapBoxType) => {
    //   // listOfCoffeeShopsPhotos.map((img: string) => {
    //   //   transformCofeeData(result, img);
    //   // })
    //   return transformCofeeData(result);
    // });
  } catch (error) {
    console.error(error);
    return [];
  }
};

const fetchCoffeeStore = async (id: string) => {
  const listOfCoffeeShopsPhotos = [
    "https://api.mapbox.com/search/geocode/v6/forward?q=${id}&proximity=144.9511684419639%2C-37.803084077799056&country=au&access_token=${process.env.MAPBOX_API_KEY",
  ];
  try {
    const response = await fetch(
      `https://api.mapbox.com/search/geocode/v6/forward?q=${id}&proximity=144.9511684419639%2C-37.803084077799056&country=au&access_token=${process.env.MAPBOX_API_KEY}`
    );
    const data = await response.json();
    console.log("DATA: ", data);

    const coffeeStore = data?.features?.map(
      (result: MapBoxType, index: number) =>
        // listOfCoffeeShopsPhotos.map((img: string) => {
        //   transformCofeeData(result);
        // })
        transformCofeeData(result, index, listOfCoffeeShopsPhotos) || []
    );

    return coffeeStore.length > 0 ? coffeeStore[0] : {};
    // return [];
  } catch (error) {
    console.error(error);
    return {};
  }
};

const transformCofeeData = async (
  result: MapBoxType,
  index: number,
  photos: string[]
) => {
  return {
    id: result.id,
    address: result.properties?.full_address || "",
    name: result.properties.name,
    // imageUrl: photos[index],
    imageUrl:
      "https://images.unsplash.com/photo-1562447457-579fc34967fb?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjh8fGNvZmZlZXxlbnwwfHwwfHx8MA%3D%3D",
  };
};

const getListOfCoffeeShopPhotos = async () => {
  const response = await fetch(
    `https://api.unsplash.com/photos/?client_id=${process.env.UNPLASH_ACCESS_KEY}&query="coffee shop"&page=1&perPage=10`
  );
  const res = await response.json();
  console.log("Cofee Images final results :", res);
  // const results = res?.urls || [];
  // console.log("RESULTS :", results);
  console.log("res :", res);
  return res?.map((result: { urls: any }) => result.urls["small"]);
};

export { fetchCoffeeStores, fetchCoffeeStore };
