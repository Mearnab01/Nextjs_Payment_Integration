import React from "react";
import { Html, Head, Preview, Body, Container, Section, Heading, Text, Hr, Button } from "@react-email/components";
import { Rocket, Flame, Zap, Target, Sparkles, ArrowRight, Twitter, Linkedin, Github, MessageCircle } from "lucide-react";

const WelcomeEmail = ({ name, url }: { name: string; url: string }) => {
  return (
    <Html>
      <Head />
      <Preview>Welcome to Courseflow - Your learning journey begins!</Preview>
      <Body style={main}>
        {/* Background pattern */}
        <div style={backgroundPattern}></div>
        
        <Container style={container}>
          {/* Header with gradient */}
          <Section style={header}>
            <Heading style={heading}>
              <span style={gradientText}>Welcome to Courseflow!</span>
            </Heading>
            <div style={iconContainer}>
              <Rocket style={iconStyle} />
            </div>
          </Section>

          <Section style={content}>
            <Text style={text}>Hello <strong style={highlight}>{name}</strong>,</Text>
            <Text style={text}>
              We're absolutely thrilled to welcome you to our community of passionate learners! 
              You've just taken the first exciting step toward mastering cutting-edge development 
              skills through our engaging, project-based learning experience.
            </Text>
            
            <Hr style={gradientHr} />
            
            <Text style={subheading}>Here's what awaits you:</Text>
            
            <ul style={list}>
              <li style={listItem}>
                <Flame style={iconBulletStyle} />
                Build real-world projects like Netflix and Twitter clones
              </li>
              <li style={listItem}>
                <Zap style={iconBulletStyle} />
                Master full-stack development with the MERN stack
              </li>
              <li style={listItem}>
                <Target style={iconBulletStyle} />
                Learn at your own pace with our flexible, online platform
              </li>
              <li style={listItem}>
                <Sparkles style={iconBulletStyle} />
                Join a vibrant community of like-minded developers
              </li>
            </ul>
            
            <Hr style={gradientHr} />
            
            <Text style={text}>
              Ready to embark on this exciting journey and forge your path in modern development? 
              Explore our extensive course catalog and kickstart your learning adventure today!
            </Text>
            
            <Button href={url} style={button}>
              <span style={buttonText}>Explore Courses</span>
              <ArrowRight style={buttonIconStyle} />
            </Button>
          </Section>

          <Hr style={gradientHr} />
          
          <Section style={footer}>
            <div style={socialContainer}>
              <a href="#" style={socialLink}><Twitter style={socialIconStyle} /></a>
              <a href="#" style={socialLink}><Linkedin style={socialIconStyle} /></a>
              <a href="#" style={socialLink}><Github style={socialIconStyle} /></a>
              <a href="#" style={socialLink}><MessageCircle style={socialIconStyle} /></a>
            </div>
            
            <Text style={footerText}>
              © {new Date().getFullYear()} Courseflow, Inc. All Rights Reserved.
            </Text>
            
            <Text style={footerSubtext}>
              123 Learning Street, Education City | Unsubscribe
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default WelcomeEmail;

// Styles
const main = {
  backgroundColor: "#0f0f23",
  backgroundImage: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
  padding: "20px 0",
};

const backgroundPattern = {
  position: "absolute" as const,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundImage: "radial-gradient(circle at 25% 25%, rgba(92, 107, 192, 0.1) 0%, transparent 50%)",
  zIndex: 0,
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "600px",
  position: "relative" as const,
  zIndex: 1,
};

const header = {
  backgroundColor: "rgba(26, 26, 46, 0.8)",
  padding: "40px 40px 20px",
  borderRadius: "10px 10px 0 0",
  textAlign: "center" as const,
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(92, 107, 192, 0.2)",
  borderBottom: "none",
};

const heading = {
  fontSize: "36px",
  lineHeight: "1.2",
  fontWeight: "800",
  margin: "0 0 20px",
  textAlign: "center" as const,
  letterSpacing: "-0.5px",
};

const gradientText = {
  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

const iconContainer = {
  margin: "20px 0",
  display: "flex",
  justifyContent: "center",
};

const iconStyle = {
  width: "48px",
  height: "48px",
  color: "#667eea",
};

const content = {
  backgroundColor: "rgba(26, 26, 46, 0.6)",
  padding: "40px",
  borderRadius: "0 0 10px 10px",
  backdropFilter: "blur(10px)",
  border: "1px solid rgba(92, 107, 192, 0.2)",
  borderTop: "none",
};

const text = {
  margin: "0 0 20px",
  color: "#e6e6ff",
  fontSize: "16px",
  lineHeight: "24px",
};

const highlight = {
  color: "#667eea",
  fontWeight: "600",
};

const subheading = {
  ...text,
  fontSize: "18px",
  fontWeight: "600",
  color: "#a8b1ff",
  margin: "30px 0 20px",
};

const list = {
  paddingLeft: "0",
  margin: "0 0 30px",
};

const listItem = {
  color: "#e6e6ff",
  fontSize: "16px",
  lineHeight: "28px",
  margin: "0 0 12px",
  display: "flex",
  alignItems: "center",
};

const iconBulletStyle = {
  width: "18px",
  height: "18px",
  color: "#667eea",
  marginRight: "12px",
  flexShrink: 0,
};

const gradientHr = {
  border: "none",
  height: "2px",
  background: "linear-gradient(90deg, transparent, #667eea, #764ba2, transparent)",
  margin: "30px 0",
  borderRadius: "2px",
};

const button = {
  backgroundColor: "transparent",
  backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "18px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  padding: "16px 24px",
  margin: "30px 0",
  border: "none",
  cursor: "pointer",
  transition: "all 0.3s ease",
  gap: "8px",
};

const buttonText = {
  display: "inline-block",
};

const buttonIconStyle = {
  width: "18px",
  height: "18px",
  transition: "transform 0.3s ease",
};

const footer = {
  marginTop: "40px",
  textAlign: "center" as const,
};

const socialContainer = {
  margin: "0 0 20px",
  display: "flex",
  justifyContent: "center",
  gap: "20px",
};

const socialLink = {
  color: "#a8b1ff",
  textDecoration: "none",
};

const socialIconStyle = {
  width: "20px",
  height: "20px",
  color: "#a8b1ff",
};

const footerText = {
  color: "#9ca3af",
  fontSize: "14px",
  margin: "0 0 8px",
};

const footerSubtext = {
  color: "#6b7280",
  fontSize: "12px",
  margin: "0",
};