import React from "react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import Link from "next/link";
import ProfileClient from "@/components/ProfileClient";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return (
      <div className="glass-card" style={{ padding: "3rem", textAlign: "center" }}>
        <h2>Session Expired</h2>
        <Link href="/login" className="btn btn-primary" style={{ marginTop: "1rem" }}>
          Sign In
        </Link>
      </div>
    );
  }

  const userId = (session.user as any).id;
  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      city: true,
      gender: true,
      height: true,
      dob: true,
      role: true,
      createdAt: true,
      memberships: {
        where: { status: "ACTIVE" },
        include: { plan: true },
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
  });

  if (!user) {
    return (
      <div className="glass-card" style={{ padding: "3rem", textAlign: "center" }}>
        <h2>User Account Not Found</h2>
      </div>
    );
  }

  const formattedData = {
    ...user,
    createdAt: user.createdAt.toISOString(),
  };

  return <ProfileClient initialData={formattedData as any} />;
}
