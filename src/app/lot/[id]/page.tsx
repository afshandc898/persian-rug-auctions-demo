import { lots } from "@/data/lots";
import LotDetailClient from "./LotDetailClient";

/* ------------------------------------------------------------------ */
/*  Static Generation                                                  */
/* ------------------------------------------------------------------ */

export function generateStaticParams() {
  return lots.map((lot) => ({
    id: lot.id.toString(),
  }));
}

/* ------------------------------------------------------------------ */
/*  Lot Detail Page (Server Component)                                 */
/* ------------------------------------------------------------------ */

interface Props {
  params: Promise<{ id: string }>;
}

export default async function LotDetailPage({ params }: Props) {
  const { id } = await params;
  const lotId = Number(id);
  const lot = lots.find((l) => l.id === lotId);

  return <LotDetailClient lot={lot} />;
}
