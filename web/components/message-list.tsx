import { MessageCard } from "./message-card";
import { Alert } from 'react-bootstrap';
type MessageListProps = {
  messages: any[];
};

export const MessageList = ({ messages }: MessageListProps) => {
  if (messages.length === 0) {
    return (
      <Alert variant={"light"} className="text-center">
        No messages yet.
      </Alert>
    );
  }

  return (
    <>
      {messages.map((message) => (
        <MessageCard key={message.uid} to={message.to} content={message.content} status={message.status} scheduledTo={message.scheduledDate} />
      ))}
    </>
  );
};
