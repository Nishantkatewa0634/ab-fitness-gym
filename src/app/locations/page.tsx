import React from "react";
import { db } from "@/lib/db";
import LocationsClient from "@/components/LocationsClient";

export const dynamic = "force-dynamic";

export default async function LocationsPage() {
  let locations: any[] = [];
  try {
    locations = await db.gymLocation.findMany({
      where: { active: true },
      orderBy: [{ state: "asc" }, { city: "asc" }],
    });
  } catch (error) {
    console.error("Locations fallback on Vercel:", error);
  }

  if (!locations || locations.length === 0) {
    locations = [
      {
        id: "loc-1",
        name: "Fit-Track Flagship - Bandra West",
        city: "Mumbai",
        state: "Maharashtra",
        address: "Horizon Tower, Linking Road, Bandra West, Mumbai 400050",
        phone: "+91 98201 11222",
        email: "bandra@fit-track.in",
        amenities: JSON.stringify(["Olympic Weightlifting", "Biometric Turnstiles", "Steam Room", "Valet Parking"]),
        rating: 4.9,
      },
      {
        id: "loc-2",
        name: "Fit-Track Arena - Connaught Place",
        city: "Delhi",
        state: "Delhi",
        address: "Outer Circle, Near Rajiv Chowk Metro, Connaught Place, New Delhi 110001",
        phone: "+91 98110 22333",
        email: "cp@fit-track.in",
        amenities: JSON.stringify(["CrossFit Zone", "HIIT Turf Floor", "Steam Sauna", "Smoothie Bar"]),
        rating: 4.8,
      },
      {
        id: "loc-3",
        name: "Fit-Track Central - Indiranagar",
        city: "Bengaluru",
        state: "Karnataka",
        address: "100 Feet Road, Indiranagar, Bengaluru 560038",
        phone: "+91 98450 33444",
        email: "indiranagar@fit-track.in",
        amenities: JSON.stringify(["Cardio Theatre", "Olympic Weights", "Cryotherapy", "Cafe"]),
        rating: 4.9,
      },
    ];
  }

  return <LocationsClient locations={locations as any} />;
}
