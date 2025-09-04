import React, { CSSProperties } from "react";
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Hr,
  Button,
} from "@react-email/components";
import {
  Crown,
  Zap,
  Download,
  Star,
  Shield,
  Rocket,
  ArrowRight,
  Calendar,
  CreditCard,
  Users,
  BookOpen,
  Mail,
} from "lucide-react";

interface ProPlanActivatedEmailProps {
  name: string;
  planType: string;
  currentPeriodStart: number;
  currentPeriodEnd: number;
  url: string;
}

const ProPlanActivatedEmail = ({
  name,
  planType,
  currentPeriodStart,
  currentPeriodEnd,
  url,
}: ProPlanActivatedEmailProps) => {
  const startDate = new Date(currentPeriodStart * 1000).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );
  const endDate = new Date(currentPeriodEnd * 1000).toLocaleDateString(
    "en-US",
    {
      month: "long",
      day: "numeric",
      year: "numeric",
    }
  );

  return (
    <Html>
      <Head />
      <Preview>
        🚀 Welcome to Courseflow Pro - Your premium learning experience begins!
      </Preview>
      <Body style={main}>
        {/* Background pattern */}
        <div style={backgroundPattern}></div>

        <Container style={container}>
          {/* Header Section */}
          <Section style={header}>
            <div style={headerContent}>
              <Crown style={crownIcon} />
              <Heading style={heading}>
                <span style={gradientText}>Welcome to Pro!</span>
              </Heading>
              <Text style={subheading}>
                You've unlocked premium learning with Courseflow 🎉
              </Text>
            </div>
          </Section>

          {/* Main Content */}
          <Section style={content}>
            <Text style={text}>
              Hey <strong style={highlight}>{name}</strong>,
            </Text>
            <Text style={text}>
              Congratulations on upgrading to Courseflow Pro! Your {planType}ly
              subscription is now active and you're ready to experience learning
              at its finest.
            </Text>

            {/* Subscription Details Card */}
            <Section style={detailsCard}>
              <div style={detailsHeader}>
                <Zap style={detailsIcon} />
                <Text style={detailsTitle}>Subscription Details</Text>
              </div>

              <div style={detailsGrid}>
                <div style={detailItem}>
                  <CreditCard style={detailIcon} />
                  <div>
                    <Text style={detailLabel}>Plan</Text>
                    <Text style={detailValue}>Pro {planType}ly</Text>
                  </div>
                </div>

                <div style={detailItem}>
                  <Calendar style={detailIcon} />
                  <div>
                    <Text style={detailLabel}>Start Date</Text>
                    <Text style={detailValue}>{startDate}</Text>
                  </div>
                </div>

                <div style={detailItem}>
                  <Calendar style={detailIcon} />
                  <div>
                    <Text style={detailLabel}>Renewal Date</Text>
                    <Text style={detailValue}>{endDate}</Text>
                  </div>
                </div>
              </div>
            </Section>

            {/* Benefits Section */}
            <Section style={benefitsSection}>
              <Text style={sectionTitle}>Your Pro Benefits</Text>

              <div style={benefitsGrid}>
                <div style={benefitItem}>
                  <BookOpen style={benefitIcon} />
                  <Text style={benefitTitle}>All Courses</Text>
                  <Text style={benefitText}>
                    Full access to every course in our library
                  </Text>
                </div>

                <div style={benefitItem}>
                  <Download style={benefitIcon} />
                  <Text style={benefitTitle}>Resources</Text>
                  <Text style={benefitText}>
                    Downloadable code and project files
                  </Text>
                </div>

                <div style={benefitItem}>
                  <Star style={benefitIcon} />
                  <Text style={benefitTitle}>Priority Support</Text>
                  <Text style={benefitText}>24/7 dedicated support team</Text>
                </div>

                <div style={benefitItem}>
                  <Shield style={benefitIcon} />
                  <Text style={benefitTitle}>Certificates</Text>
                  <Text style={benefitText}>
                    Verified completion certificates
                  </Text>
                </div>

                <div style={benefitItem}>
                  <Users style={benefitIcon} />
                  <Text style={benefitTitle}>Community</Text>
                  <Text style={benefitText}>
                    Exclusive Pro member community
                  </Text>
                </div>

                <div style={benefitItem}>
                  <Rocket style={benefitIcon} />
                  <Text style={benefitTitle}>Early Access</Text>
                  <Text style={benefitText}>
                    First access to new courses & features
                  </Text>
                </div>
              </div>
            </Section>

            <Text style={text}>
              Ready to explore everything Pro has to offer? Your premium
              learning journey starts now:
            </Text>

            <Button href={url} style={button}>
              <Rocket style={buttonIcon} />
              <span style={buttonText}>Explore Pro Features</span>
              <ArrowRight style={buttonArrow} />
            </Button>

            <Hr style={gradientHr} />

            {/* Support Section */}
            <Section style={supportSection}>
              <div style={supportContent}>
                <Mail style={supportIcon} />
                <div>
                  <Text style={supportTitle}>Need Help?</Text>
                  <Text style={supportText}>
                    Our dedicated support team is here for you 24/7 at
                    support@courseflow.com
                  </Text>
                </div>
              </div>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              © {new Date().getFullYear()} Courseflow, Inc. All Rights
              Reserved.
            </Text>
            <Text style={footerSubtext}>
              123 Learning Street, Education City |{" "}
              <a href="#" style={unsubscribeLink}>
                Manage Subscription
              </a>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ProPlanActivatedEmail;

// Styles
const main: CSSProperties = {
  backgroundColor: "#0f0f23",
  backgroundImage:
    "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
  padding: "20px 0",
};

const backgroundPattern: CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage:
    "radial-gradient(circle at 25% 25%, rgba(92, 107, 192, 0.1) 0%, transparent 50%)",
  zIndex: 0,
};

const container: CSSProperties = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "600px",
  position: "relative",
  zIndex: 1,
};

const header: CSSProperties = {
  backgroundColor: "rgba(26, 26, 46, 0.8)",
  padding: "40px",
  borderRadius: "10px 10px 0 0",
  textAlign: "center",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(92, 107, 192, 0.2)",
  borderBottom: "none",
};

const headerContent: CSSProperties = {
  textAlign: "center",
};

const crownIcon: CSSProperties = {
  width: "64px",
  height: "64px",
  color: "#fbbf24",
  margin: "0 auto 20px",
};

const heading: CSSProperties = {
  fontSize: "36px",
  lineHeight: 1.2,
  fontWeight: "800",
  margin: "0 0 12px",
  textAlign: "center",
  letterSpacing: "-0.5px",
};

const gradientText: CSSProperties = {
  background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const subheading: CSSProperties = {
  fontSize: "18px",
  color: "#a8b1ff",
  textAlign: "center",
  margin: "0",
};

const content: CSSProperties = {
  backgroundColor: "rgba(26, 26, 46, 0.6)",
  padding: "40px",
  borderRadius: "0 0 10px 10px",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(92, 107, 192, 0.2)",
  borderTop: "none",
};

const text: CSSProperties = {
  margin: "0 0 20px",
  color: "#e6e6ff",
  fontSize: "16px",
  lineHeight: "24px",
};

const highlight: CSSProperties = {
  color: "#fbbf24",
  fontWeight: "600",
};

const detailsCard: CSSProperties = {
  backgroundColor: "rgba(15, 15, 35, 0.6)",
  borderRadius: "12px",
  padding: "24px",
  margin: "30px 0",
  border: "1px solid rgba(251, 191, 36, 0.2)",
};

const detailsHeader: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginBottom: "24px",
};

const detailsIcon: CSSProperties = {
  width: "24px",
  height: "24px",
  color: "#fbbf24",
};

const detailsTitle: CSSProperties = {
  fontSize: "20px",
  fontWeight: "600",
  color: "#ffffff",
  margin: "0",
};

const detailsGrid: CSSProperties = {
  display: "grid",
  gap: "20px",
};

const detailItem: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
  padding: "16px",
  backgroundColor: "rgba(15, 15, 35, 0.4)",
  borderRadius: "8px",
  border: "1px solid rgba(92, 107, 192, 0.1)",
};

const detailIcon: CSSProperties = {
  width: "20px",
  height: "20px",
  color: "#fbbf24",
  flexShrink: 0,
};

const detailLabel: CSSProperties = {
  fontSize: "12px",
  color: "#a8b1ff",
  margin: "0 0 4px",
};

const detailValue: CSSProperties = {
  fontSize: "16px",
  color: "#ffffff",
  fontWeight: "600",
  margin: "0",
};

const benefitsSection: CSSProperties = {
  margin: "40px 0",
};

const sectionTitle: CSSProperties = {
  fontSize: "20px",
  fontWeight: "600",
  color: "#fbbf24",
  margin: "0 0 24px",
  textAlign: "center",
};

const benefitsGrid: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "20px",
};

const benefitItem: CSSProperties = {
  backgroundColor: "rgba(15, 15, 35, 0.4)",
  padding: "20px",
  borderRadius: "8px",
  border: "1px solid rgba(251, 191, 36, 0.1)",
  textAlign: "center",
};

const benefitIcon: CSSProperties = {
  width: "32px",
  height: "32px",
  color: "#fbbf24",
  margin: "0 auto 12px",
};

const benefitTitle: CSSProperties = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#ffffff",
  margin: "0 0 8px",
};

const benefitText: CSSProperties = {
  fontSize: "14px",
  color: "#a8b1ff",
  margin: "0",
  lineHeight: "20px",
};

const button: CSSProperties = {
  backgroundColor: "transparent",
  backgroundImage: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "12px",
  width: "100%",
  padding: "18px 24px",
  margin: "30px 0",
  border: "none",
  cursor: "pointer",
  transition: "all 0.3s ease",
};

const buttonIcon: CSSProperties = {
  width: "20px",
  height: "20px",
};

const buttonText: CSSProperties = {
  display: "inline-block",
};

const buttonArrow: CSSProperties = {
  width: "18px",
  height: "18px",
  transition: "transform 0.3s ease",
};

const gradientHr: CSSProperties = {
  border: "none",
  height: "2px",
  background:
    "linear-gradient(90deg, transparent, #fbbf24, #f59e0b, transparent)",
  margin: "30px 0",
  borderRadius: "2px",
};

const supportSection: CSSProperties = {
  backgroundColor: "rgba(15, 15, 35, 0.4)",
  padding: "24px",
  borderRadius: "8px",
  border: "1px solid rgba(92, 107, 192, 0.1)",
};

const supportContent: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const supportIcon: CSSProperties = {
  width: "24px",
  height: "24px",
  color: "#667eea",
  flexShrink: 0,
};

const supportTitle: CSSProperties = {
  fontSize: "16px",
  fontWeight: "600",
  color: "#ffffff",
  margin: "0 0 4px",
};

const supportText: CSSProperties = {
  fontSize: "14px",
  color: "#a8b1ff",
  margin: "0",
  lineHeight: "20px",
};

const footer: CSSProperties = {
  marginTop: "40px",
  textAlign: "center",
};

const footerText: CSSProperties = {
  color: "#9ca3af",
  fontSize: "14px",
  margin: "0 0 8px",
};

const footerSubtext: CSSProperties = {
  color: "#6b7280",
  fontSize: "12px",
  margin: "0",
};

const unsubscribeLink: CSSProperties = {
  color: "#fbbf24",
  textDecoration: "none",
};
