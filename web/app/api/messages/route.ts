import { NextResponse } from "next/server";

import { createMessage } from "@/services/message-scheduler-api";

export const POST = async (request: Request) => {
  try {
    const payload = (await request.json()) as {
      content: string;
      to: string;
      scheduledDate: string;
    };

    const message = await createMessage(payload);

    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to create message"
      },
      { status: 400 }
    );
  }
};
