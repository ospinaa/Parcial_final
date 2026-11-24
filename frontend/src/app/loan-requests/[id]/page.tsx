import Link from "next/link";
import { notFound } from "next/navigation"
import { apiFetch } from "../../../lib/loan-types"
import type { LoanRequest } from "../../../lib/loan-types";

type ReceiptPageProps = { params: Promise<{ id: string }> };

export default async function ReceiptPage({ params }: ReceiptPageProps) {
  const { id }= await params;
  conts requestId =Number(id);
  if (!Number.isSafeInteger(requestId) || requestId < 1 || String)
  void params;

  return (
    <main>
      <h1>Loan receipt</h1>
      <Link href="/loan-requests">Back to requests</Link>
      <section className="panel">
        <p>Complete the request details.</p>
      </section>
    </main>
  );
}

