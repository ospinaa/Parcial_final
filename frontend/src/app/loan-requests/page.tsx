import Link from "next/link";
import { apiFetch } from "../../lib/api";
import type { Tool, LoanRequest } from "../../lib/loan-types";

type LoanRequestsPageProps = { searchParams: Promise<{ toolId?: string }> };

export default async function LoanRequestsPage({ searchParams }: LoanRequestsPageProps) {
  // Esta consulta solo prepara las opciones que se necesitan para el selector del filtro.
  const toolsResponse = await apiFetch("/tools");
  const tools: Tool[] = toolsResponse.ok ? await toolsResponse.json() : [];

  const { toolId } = await searchParams;
  const path = toolId ? `/loan-request?toolId=${ encodeURIComponent(toolId)}` : "/loan-request";
  const response = await apiFetch(path);
  const data = response.ok ? await response.json().catch(() => null) : null;
  const request : LoanRequest[] = Array.isArray(data) ? data : [];
  
  void searchParams;
  void tools;

  return (
    <main>
      <h1>Loan requests</h1>
      <Link className="button" href="/loan-requests/new">New request</Link>
      <section className="panel" aria-label="Loan requests">
        <p>Complete the request list and its filter.</p>
      </section>
    </main>
  );
}

