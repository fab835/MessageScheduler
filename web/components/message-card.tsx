"use client";
import { Card, Stack } from "react-bootstrap";
import { StatusBadge } from "./status-badge";

type MessageCardProps = {
  to: string;
  content: string;
  status: string;
  scheduledTo: string | Date;
};

export const MessageCard = ({ to, content, status, scheduledTo }: MessageCardProps) => (
  <Card className="app-card border-0 shadow-sm h-100">
    <Card.Body className="p-4 p-lg-4">
      <div className="position-relative">
        <div className="position-absolute top-0 end-0">
          <StatusBadge status={status} />
        </div>
      </div>

      <Stack direction="horizontal" gap={2}>
        <h3 className="p-2 text-primary align-self-start"><i className="fa fa-phone-square" aria-hidden="true"></i></h3>
        <div className="p-2 me-auto" style={{width: "100%"}}>
          <div className="mb-3">
            <Card.Title className="mb-0">{to}</Card.Title>
            {content ? <Card.Text className="section-description mb-0">{content}</Card.Text> : null}
          </div>
          
          <p className="text-secondary mb-0">
            <i className="fa fa-clock-o" aria-hidden="true"></i> {new Date(scheduledTo).toLocaleString("en-US", {
              dateStyle: "medium",
              timeStyle: "short"
            })}
          </p>
        </div>
      </Stack>
    </Card.Body>
  </Card>
);
