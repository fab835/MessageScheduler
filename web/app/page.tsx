import { Container } from "react-bootstrap";

import { CreateMessageCard } from "@/components/create-message-card";
import { MessageList } from "@/components/message-list";
import { SectionCard } from "@/components/section-card";
import { StatusOverview } from "@/components/status-overview";
import { getDashboardOverview, getMessages } from "@/services/message-scheduler-api";

const HomePage = async () => {
  const [messages, overview] = await Promise.all([getMessages(), getDashboardOverview()]);

  return (
    <main className="app-shell py-5">
      <Container className="d-flex flex-column gap-4 py-3">
        <SectionCard
          eyebrow="Overview"
          title="Status snapshot"
          description="A quick look at how messages are moving through the system right now."
        >
          <StatusOverview statusCounts={overview.statusCounts} />
        </SectionCard>

        <CreateMessageCard />

        <MessageList messages={messages} />
      </Container>
    </main>
  );
};

export default HomePage;
