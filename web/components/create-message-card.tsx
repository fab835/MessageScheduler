"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Alert, Button, Card, Col, Form, Row } from "react-bootstrap";

const initialState = {
  content: "",
  to: "",
  scheduledDate: ""
};

export const CreateMessageCard = () => {
  const router = useRouter();
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          content: form.content,
          to: form.to,
          scheduledDate: new Date(form.scheduledDate).toISOString()
        })
      });

      if (!response.ok) {
        const payload = (await response.json()) as { error?: string };
        throw new Error(payload.error ?? "Unable to schedule message");
      }

      setForm(initialState);
      router.refresh();
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to schedule message");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="app-card border-0 shadow-sm">
      <Card.Body className="p-4">
        <Form onSubmit={handleSubmit}>
          <Row className="g-3">
            <Col xs={12}>
              <Form.Group controlId="messageRecipient">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  required
                  value={form.to}
                  onChange={(event) => setForm((current) => ({ ...current, to: event.target.value }))}
                  placeholder="+1 555 123 4567"
                />
              </Form.Group>
            </Col>

            <Col xs={12}>
              <Form.Group controlId="messageContent">
                <Form.Label>Message content</Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  rows={5}
                  value={form.content}
                  onChange={(event) => setForm((current) => ({ ...current, content: event.target.value }))}
                  placeholder="Write the message you want to send"
                />
              </Form.Group>
            </Col>

            <Col md={12}>
              <Form.Group controlId="scheduledDate">
                <Form.Label>Scheduled date</Form.Label>
                <Form.Control
                  required
                  type="datetime-local"
                  value={form.scheduledDate}
                  onChange={(event) => setForm((current) => ({ ...current, scheduledDate: event.target.value }))}
                />
              </Form.Group>
            </Col>

            <Col xs={12}>
              {error ? <Alert variant="danger">{error}</Alert> : null}
            </Col>

            <Col xs={12}>
              <div className="d-grid gap-2">
                <Button type="submit" disabled={isSubmitting} variant="primary" size="lg" className="shadow-sm">
                  <i className="fa fa-paper-plane-o" aria-hidden="true"></i> {isSubmitting ? "Scheduling..." : "Schedule Message"}
                </Button>
              </div>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );
};
