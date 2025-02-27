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

interface EmailTemplateProps {
  resetToken: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  resetToken,
}) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>Password Reset Code for Civic X Syllabus</Preview>
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
          <Text style={text}>Hello,</Text>
          <Text style={text}>
            A request was made to reset your password for Civic X Syllabus. Use
            the code below to reset your password:
          </Text>

          {/* Reset Code */}
          <Text style={resetCode}>{resetToken}</Text>
          <Text style={validityText}>(This code is valid for 5 minutes)</Text>

          <Text style={text}>
            If you didn't request this, please ignore this email. Your account
            is still secure.
          </Text>

          <Text style={footerText}>Thank you,</Text>
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
