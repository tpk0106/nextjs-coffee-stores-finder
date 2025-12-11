// const Airtable = require('airtable');
import { AirtableRecordType, CoffeeStoreType } from "@/types";
import Airtable, { FieldSet, Records } from "airtable";
import { error } from "console";

const base = new Airtable({ apiKey: process.env.AIRTABLE_API_TOKEN }).base(
  "app6WfpaduXCIssgQ"
);

const coffeetable = base("coffee-stores");

// find record
// interface AirtableRecordWithFields extends FieldSet {
//   id: string; // The record ID (not the ID within your fields data)
//   createdTime: string;
//   fields: CoffeeStoreFields;
// }

// type CoffeeStoreRecord = Record<CoffeeStoreFields>;

// interface AirtableRecord extends FieldSet {
//   id: string; // The system record ID (e.g., 'recXYZ...')
//   createdTime: string;

//   fields: CoffeeStoreFields; // The strictly typed fields
// }

type AirtableRecordWithFields = FieldSet & {
  id: string; // The system record ID (e.g., 'recXYZ...')
  //   createdTime: string;
  fields: CoffeeStoreType; // Now compatible via intersection type/assertion
};

const getMinifiedRecords = (records: AirtableRecordWithFields[]) => {
  return records.map((rec: AirtableRecordWithFields) => {
    console.log("inside minified.....", rec);
    return { recordId: rec.id, ...rec.fields };
  });
};

const findRecordByFilter = async (id: string) => {
  //   console.log("inside airtable search......: ", id);
  const findRecords = (await coffeetable
    .select({
      filterByFormula: `id="${id}"`,
    })
    .firstPage()) as unknown as AirtableRecordWithFields[];
  //  as Records<CoffeeStoreRecord>;

  return getMinifiedRecords(findRecords);

  //   return findRecords.map((rec: AirtableRecordWithFields) => {
  //     return { recordId: rec.id, ...rec.fields };
  //   });

  //   console.log("AIR TABLE RECS :", { allRecords });
};

const createCoffeeStore = async (coffeeStore: CoffeeStoreType, id: string) => {
  const { name, address, imageUrl, voting = 0 } = coffeeStore;
  try {
    if (id) {
      const records = await findRecordByFilter(id);

      if (records.length === 0) {
        const createRecords: AirtableRecordWithFields[] =
          (await coffeetable.create([
            {
              fields: {
                id: id,
                name: name,
                address: address,
                imageUrl: imageUrl,
                voting: voting,
              },
            },
          ])) as unknown as AirtableRecordWithFields[];

        if (createRecords.length > 0) {
          console.log("created a store cerord with id = ", id);
          return getMinifiedRecords(createRecords);
        }
      } else {
        console.log("coffee store does exist");
        return records;
      }
    } else {
      console.error("store id missing ");
    }
  } catch (error) {
    console.error("Error creating airtable record :", error);
  }
};

const updateCoffeeStore = async (id: string) => {
  try {
    if (id) {
      const records = await findRecordByFilter(id);

      if (records.length !== 0) {
        const record = records[0];
        const updatedVoting = record.voting + 1;

        const updatedRecords: AirtableRecordWithFields[] =
          (await coffeetable.update([
            {
              id: record.recordId,
              fields: {
                voting: updatedVoting,
              },
            },
          ])) as unknown as AirtableRecordWithFields[];

        if (updatedRecords.length > 0) {
          console.log("updated a store rerord with id = ", id);
          return getMinifiedRecords(updatedRecords);
        }
      } else {
        console.log("coffee store does not exist");
      }
    } else {
      console.error("store id missing ");
    }
  } catch (error) {
    console.error("Error updating airtable record :", error);
  }
};

export { createCoffeeStore, updateCoffeeStore };
