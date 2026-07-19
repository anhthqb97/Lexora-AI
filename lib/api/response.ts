import { NextResponse } from "next/server";

export function notImplemented(module: string) {
  return NextResponse.json(
    {
      error: {
        code: "NOT_IMPLEMENTED",
        message: `${module} — not implemented yet`,
      },
    },
    { status: 501 },
  );
}

export function ok<T>(data: T, status = 200) {
  return NextResponse.json(data, { status });
}
