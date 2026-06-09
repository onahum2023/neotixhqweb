import * as React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { TemplateEntry } from "./registry";

interface Props {
  name?: string;
  message?: string;
}

const Email = ({ name, message }: Props) => (
  <Html lang="en" dir="ltr">
    <Head />
    <Preview>We received your message at Neotix</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={brand}>Neotix</Heading>
        <Heading as="h2" style={h2}>
          Thanks{name ? `, ${name}` : ""} — we got your message.
        </Heading>
        <Text style={text}>
          A real person on our team reads every message. We&rsquo;ll be in touch
          shortly.
        </Text>
        {message ? (
          <Section style={quote}>
            <Text style={quoteLabel}>Your message</Text>
            <Text style={quoteBody}>{message}</Text>
          </Section>
        ) : null}
        <Hr style={hr} />
        <Text style={footer}>
          Neotix · Fragmented signals, structured context, better decisions.
        </Text>
      </Container>
    </Body>
  </Html>
);

export const template = {
  component: Email,
  subject: "We received your message",
  displayName: "Contact confirmation",
  previewData: {
    name: "Jane",
    message: "Curious about how Orin fits into research workflows.",
  },
} satisfies TemplateEntry;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  color: "#0b0b14",
};
const container = { padding: "32px 28px", maxWidth: "560px" };
const brand = {
  fontSize: "14px",
  letterSpacing: "0.14em",
  textTransform: "uppercase" as const,
  color: "#8b5cf6",
  marginBottom: "24px",
  fontWeight: 600,
};
const h2 = { fontSize: "22px", lineHeight: "1.3", margin: "0 0 16px" };
const text = { fontSize: "15px", lineHeight: "1.6", color: "#33334a" };
const quote = {
  borderLeft: "3px solid #8b5cf6",
  padding: "8px 14px",
  margin: "20px 0",
  backgroundColor: "#faf9ff",
};
const quoteLabel = {
  fontSize: "11px",
  letterSpacing: "0.1em",
  textTransform: "uppercase" as const,
  color: "#8b5cf6",
  margin: "0 0 4px",
  fontWeight: 600,
};
const quoteBody = {
  fontSize: "14px",
  lineHeight: "1.55",
  color: "#1f1f2e",
  margin: 0,
  whiteSpace: "pre-wrap" as const,
};
const hr = { borderColor: "#eeeef5", margin: "28px 0 16px" };
const footer = { fontSize: "12px", color: "#8a8aa3" };
