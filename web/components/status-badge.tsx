import { Badge } from "react-bootstrap";

type StatusBadgeProps = {
  status: string;
};

const statusVariants: Record<string, string> = {
  DRAFT: "secondary",
  SCHEDULED: "warning",
  QUEUED: "info",
  ACCEPTED: "primary",
  SENT: "success",
  DELIVERED: "success",
  RECEIVED: "dark",
  FAILED: "danger"
};

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const variant = statusVariants[status] ?? "secondary";

  return (
    <Badge bg={variant} pill>
      {status}
    </Badge>
  );
};
