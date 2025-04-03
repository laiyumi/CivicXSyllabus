import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface Props {
  username: string | null;
}

export const AccountDeletionEmailTemplate = ({ username }: Props) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>Your Civic X Syllabus Account Has Been Deleted</Preview>
      <Container style={container}>
        {/* Logo */}
        <Section style={logoSection}>
          <Link href="https://www.civicxsyllabus.org">
            <Img
              src="https://res.cloudinary.com/djtnydk0h/image/upload/c_thumb,w_200,g_face/v1740673056/new-logo_ztsijj.png"
              width="100"
              height="auto"
              alt="Civic X Syllabus Logo"
            />
          </Link>
        </Section>

        {/* Email Content */}
        <Section>
          {username ? (
            <Text style={text}>Dear {username}</Text>
          ) : (
            <Text style={text}>Dear friend,</Text>
          )}
          <Text style={text}>
            We wanted to let you know that your account with Civic X Syllabus
            has been successfully deleted.
          </Text>

          <Text style={text}>
            Thank you for your support and involvement in our community. We
            appreciate the time and energy you’ve contributed to the platform.
          </Text>

          <Text style={text}>
            If you have any questions or need further assistance, feel free to
            reach out to us at any time.
          </Text>

          <Text style={footerText}>Wishing you all the best,</Text>
          <Text style={footerText}>Civic X Syllabus Team</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  padding: "10px 0",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #f0f0f0",
  padding: "45px",
  textAlign: "center" as const,
};

const logoSection = {
  marginBottom: "20px",
  display: "flex",
  padding: "20px 0",
  alignItems: "center",
  justifyContent: "center",
};

const text = {
  fontSize: "16px",
  fontFamily: "'Open Sans', Arial, sans-serif",
  fontWeight: "300",
  color: "#404040",
  lineHeight: "26px",
};

const resetCode = {
  fontSize: "28px",
  fontWeight: "bold",
  color: "#007ee6",
  backgroundColor: "#e1f5fe",
  padding: "10px 20px",
  borderRadius: "5px",
  display: "inline-block",
  margin: "10px 0",
};

const validityText = {
  ...text,
  margin: "0px",
  textAlign: "center" as const,
};

const anchor = {
  textDecoration: "underline",
  color: "#007ee6",
};

const footerText = {
  fontSize: "14px",
  color: "#606060",
  marginTop: "10px",
};
