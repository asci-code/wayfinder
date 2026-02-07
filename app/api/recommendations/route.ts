import { NextResponse } from "next/server";
import { z } from "zod";
import { getRecommendations } from "../../../server/orchestrator/recommendationEngine.js";

const requestSchema = z.object({
  origin: z.string().min(2),
  budget: z.number().positive(),
  dateRange: z.object({
    start: z.string().min(4),
    end: z.string().min(4)
  }),
  preferences: z
    .object({
      warm: z.boolean().optional(),
      safe: z.boolean().optional(),
      cheap: z.boolean().optional(),
      shortFlight: z.boolean().optional()
    })
    .optional(),
  weights: z
    .object({
      priceWeight: z.number().optional(),
      weatherWeight: z.number().optional(),
      safetyWeight: z.number().optional(),
      visaWeight: z.number().optional(),
      seasonalityWeight: z.number().optional()
    })
    .optional()
});

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = requestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid request", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const recommendations = await getRecommendations(parsed.data);
  return NextResponse.json(recommendations);
}
