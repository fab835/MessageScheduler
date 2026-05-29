"use client";
import { Col, Row, Card } from "react-bootstrap";

type StatusOverviewProps = {
  statusCounts: any[];
};

export const StatusOverview = ({ statusCounts }: StatusOverviewProps) => (
  <Row className="g-3">
    {statusCounts.map((item) => (
      <Col key={item.status} sm={6} xl={3}>
        <Card className="app-card h-100">
          <Card.Body className="p-4 d-flex flex-column align-items-center justify-content-center">
            <p className="text-uppercase mb-2 text-secondary fs-6">{item.status}</p>
            <h1 className="mb-0 fs-2">{item.total}</h1>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>
);
