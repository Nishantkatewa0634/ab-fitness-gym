import React from "react";
import { db } from "@/lib/db";
import LocationsClient from "@/components/LocationsClient";

export const dynamic = "force-dynamic";

export default async function LocationsPage() {
  const locations = await db.gymLocation.findMany({
    where: { active: true },
    orderBy: [{ state: "asc" }, { city: "asc" }],
  });

  return <LocationsClient locations={locations as any} />;
}
