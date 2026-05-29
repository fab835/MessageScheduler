import { MessageStatus } from "@prisma/client";
import { AppError } from "../../helpers/errors.js";

export interface MessageEntityType{
  uid?: string;
  content: string;
  to: string;
  status: MessageStatus;
  scheduledDate?: Date | string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export class MessageEntity {
  allowedAttributes = [
    "uid",
    "content",
    "to",
    "status",
    "scheduledDate",
    "createdAt",
    "updatedAt"
  ];

  public constructor() {}

  new(data : Record<string, any>) : MessageEntityType {
    const filtered: Record<string, any> = {};

    this.validate(data);
    
    for (const [key, value] of Object.entries(data)) {
      if (!this.allowedAttributes.includes(key)) continue;

      if (["createdAt", "updatedAt", "scheduledDate"].includes(key)) {
				filtered[key] = typeof value === "string" ? new Date(value) : value;
      } else if (key === "status") {
        if (typeof value === "string" && !!MessageStatus[value as keyof typeof MessageStatus]) {
          filtered[key] = MessageStatus[value as keyof typeof MessageStatus];
        } else {
          filtered[key] = value;
        }
      } else {
        filtered[key] = value;
      }
    }

    return filtered as MessageEntityType;
  }

  wrap(datas: MessageEntityType[]) {
    return datas.map((data) => this.new(data));
  }

  private validate(data: Record<string, any>) {
    if (!data.hasOwnProperty("content")) throw new AppError("Message content is required");
    if (!data.hasOwnProperty("to")) throw new AppError("Message recipient is required");
    if (!data.hasOwnProperty("status")) throw new AppError("Message status is required");
  }
}
