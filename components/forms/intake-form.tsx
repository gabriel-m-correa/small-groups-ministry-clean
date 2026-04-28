"use client";

import { useState } from "react";

type IntakeFormProps = {
  type: "join_group" | "leader_interest";
};

export function IntakeForm({ type }: IntakeFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);

    const response = await fetch("/api/interest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        type,
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        campus: formData.get("campus"),
        lifeStage: formData.get("lifeStage"),
        notes: formData.get("notes")
      })
    });

    setLoading(false);

    if (!response.ok) {
      setError("We couldn't save your response. Please try again.");
      return;
    }

    setSubmitted(true);
  }

  return submitted ? (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>Thank you</h2>
      <p style={{ marginBottom: 0, color: "var(--muted)" }}>
        Your interest has been received. Someone from the ministry team will
        follow up with you personally.
      </p>
    </div>
  ) : (
    <form className="grid cols-2" action={handleSubmit}>
      <input name="firstName" placeholder="First name" required />
      <input name="lastName" placeholder="Last name" required />
      <input name="email" placeholder="Email" required type="email" />
      <input name="phone" placeholder="Phone" />
      <input name="campus" placeholder="Campus or area" />
      <input name="lifeStage" placeholder="Life stage" />
      <textarea
        name="notes"
        placeholder={
          type === "join_group"
            ? "Availability, group preferences, childcare needs, or anything helpful for us to know"
            : "Leadership background, why you feel interested, and what kind of guidance you hope for"
        }
        rows={5}
        style={{ gridColumn: "1 / -1" }}
      />
      {error ? (
        <p style={{ gridColumn: "1 / -1", margin: 0, color: "#9f3a2b" }}>
          {error}
        </p>
      ) : null}
      <button className="button" disabled={loading} type="submit">
        {loading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
