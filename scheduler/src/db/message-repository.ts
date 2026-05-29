import { postgres } from "./postgres.js";

export const MESSAGE_STATUS = {
  SCHEDULED: "SCHEDULED",
  QUEUED: "QUEUED",
  FAILED: "FAILED",
  SENT: "SENT"
} as const;

export type MessageStatus = (typeof MESSAGE_STATUS)[keyof typeof MESSAGE_STATUS];

export type DueMessageRecord = {
  uid: string;
  content: string;
  to: string;
  status: MessageStatus;
  scheduledDate: Date;
};

const mapDueMessage = (row: {
  uid: string;
  content: string;
  to: string;
  status: string;
  scheduled_date: Date;
}): DueMessageRecord => ({
  uid: row.uid,
  content: row.content,
  to: row.to,
  status: row.status as MessageStatus,
  scheduledDate: row.scheduled_date
});

export const findDueScheduledMessages = async (now: Date): Promise<DueMessageRecord[]> => {
  const result = await postgres.query<{
    uid: string;
    content: string;
    to: string;
    status: string;
    scheduled_date: Date;
  }>(
    `
      SELECT uid, content, "to", status, scheduled_date
      FROM messages
      WHERE status = $1
        AND scheduled_date <= $2
      ORDER BY scheduled_date ASC
    `,
    [MESSAGE_STATUS.SCHEDULED, now]
  );

  return result.rows.map(mapDueMessage);
};

export const updateMessageStatus = async (uid: string, status: MessageStatus, statusBefore: MessageStatus = MESSAGE_STATUS.SCHEDULED): Promise<boolean> => {
  const result = await postgres.query(
    `
      UPDATE messages
      SET status = $1,
          updated_at = NOW()
      WHERE uid = $2
        AND status = $3
    `,
    [status, uid, statusBefore]
  );

  return result.rowCount === 1;
};

