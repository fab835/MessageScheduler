"use client";
import type { ReactNode } from "react";
import { Card } from "react-bootstrap";

type SectionCardProps = {
  title: string;
  eyebrow?: string;
  description?: string;
  children: ReactNode;
};

export const SectionCard = ({ title, eyebrow, description, children }: SectionCardProps) => (
  <Card className="app-card border-0 shadow-sm h-100">
    <Card.Body className="p-4 p-lg-4">
      <div className="mb-4">
        {eyebrow ? <p className="text-primary mb-1">{eyebrow}</p> : null}
        <Card.Title as="h2" className="section-title mb-1">
          {title}
        </Card.Title>
        {description ? <Card.Text className="text-secondary mb-0">{description}</Card.Text> : null}
      </div>
      {children}
    </Card.Body>
  </Card>
);
