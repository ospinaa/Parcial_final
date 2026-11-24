import Link from "next/link";
import { redirect } from "next/navigation"
import { apiFetch } from "../../../lib/api";
import type { Tool } from "../../../lib/loan-types";

async function createLoanRequest(formData: FormData) {
  "use server";

  const purpose = String(formData.get("purpose") ??""). trim ();
  const days = Number (formData.get("days"));
  const toolId = Number ( formData.get("toolId"));
  void formData;
}

export default async function NewLoanRequestPage() {
  const response = await apiFetch("/loan-request", {
    method: "POST", 
    headers: {"Content-Type": "applicaltion/json"},
  });
  
  if( response.status !== 201) return ;
  const created = await response.json().catch(() => null);
  const id = created?.id;
  if (typeof id !== "number" || !Number.isSafeInteger(id) || id < 1)return;

  redirect(`/loan-request/${id}`);
  
  return (
    <main>
      <h1>New loan request</h1>
      <Link href="/loan-requests">Back to requests</Link>
      <form className="panel fields" action={createLoanRequest}>
        <label>Purpose<input name="purpose" maxLength={120} required /></label>
        <label>Days<input name="days" type="number" min={1} step={1} required /></label>
        <label>
          Tool
          <select name="toolId" defaultValue="" required>
            <option value="" disabled>Select a tool</option>
            {tools.map((tool) => (
              <option key={tool.id} value={tool.id}>{tool.name} — maximum {tool.maxLoanDays} days</option>
            ))}
          </select>
        </label>
        <button type="submit">Send request</button>
      </form>
    </main>
  );
}

