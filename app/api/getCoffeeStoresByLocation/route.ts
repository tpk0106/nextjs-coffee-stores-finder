import { NextRequest, NextResponse } from "next/server";

// import { fetchCoffeeStores } from "@/app/lib/coffee-stores";
import { fetchCoffeeStores } from "@/app/lib/coffee-stores";

export const dynamic = "force-dynamic";

// export async function GET(request: NextRequest) {
//   try {
//     const searchParams = request.nextUrl.searchParams;
//     const longLat = searchParams.get("longLat") || "";
//     const limit = searchParams.get("limit") || "";

//     if (longLat) {
//       const coffeeStores = await fetchCoffeeStores(longLat, parseInt(limit));
//       return NextResponse.json(coffeeStores);
//     }
//   } catch (error) {
//     console.error("There is an error", error);
//     return NextResponse.json(`Something went wrong ${error}`, {
//       status: 500,
//     });
//   }
// }

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const LongLt = searchParams.get("longLat") || "";
    const limit = searchParams.get("limit") || "";

    if (LongLt) {
      // const response = await fetchCoffeeStores(LongLt, Number(limit));
      const coffeeStoresPromises = await fetchCoffeeStores(
        LongLt,
        Number(limit)
      );

      const coffeeStoresData = await Promise.all(coffeeStoresPromises);

      // console.log("RES fetchcoffees  ------->", coffeeStoresData);
      // console.log(NextResponse.json(response));
      return NextResponse.json(coffeeStoresData);
      // return NextResponse.json(response);
    }
    // return NextResponse.json("params is not getting passed");
  } catch (error) {
    console.error(error);
    return NextResponse.json(`internal server error..: ${error}`, {
      status: 500,
    });
  }
}
