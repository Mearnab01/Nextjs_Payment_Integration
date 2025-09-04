import React, { CSSProperties } from "react";
import { Html, Head, Preview, Body, Container, Section, Heading, Text, Hr, Button, Img } from "@react-email/components";
import { CheckCircle, Play, BookOpen, Shield, Mail, Twitter, Linkedin, Github, MessageCircle } from "lucide-react";

interface PurchaseConfirmationEmailProps {
	customerName: string;
	courseTitle: string;
	courseImage: string;
	courseUrl: string;
	purchaseAmount: number;
}

const PurchaseConfirmationEmail = ({
	customerName = "there",
	courseTitle = "Course Title",
	courseImage = "https://via.placeholder.com/600x300",
	courseUrl = "#",
	purchaseAmount = 0,
}: PurchaseConfirmationEmailProps) => {
	return (
		<Html>
			<Head />
			<Preview>🎉 Welcome to {courseTitle} - Your Courseflow Journey Begins!</Preview>
			<Body style={main}>
				{/* Background pattern */}
				<div style={backgroundPattern}></div>
				
				<Container style={container}>
					{/* Header Section */}
					<Section style={header}>
						<div style={headerContent}>
							<CheckCircle style={successIcon} />
							<Heading style={heading}>Purchase Confirmed!</Heading>
							<Text style={subheading}>You're now part of the Courseflow community 🚀</Text>
						</div>
					</Section>

					{/* Main Content */}
					<Section style={content}>
						<Text style={text}>Hey <strong style={highlight}>{customerName}</strong>,</Text>
						<Text style={text}>
							Thank you for choosing Courseflow! You now have lifetime access to an incredible learning experience.
						</Text>

						{/* Course Card */}
						<Section style={courseCard}>
							<div style={courseImageContainer}>
								<Img src={courseImage} alt={courseTitle} style={imageStyle} />
								<div style={overlayGradient}></div>
							</div>
							
							<div style={courseDetails}>
								<Text style={courseTitleStyle}>{courseTitle}</Text>
								<div style={priceBadge}>
									<Text style={priceText}>${purchaseAmount.toFixed(2)}</Text>
								</div>
								
								<div style={featuresGrid}>
									<div style={featureItem}>
										<BookOpen style={featureIcon} />
										<Text style={featureText}>Lifetime Access</Text>
									</div>
									<div style={featureItem}>
										<Shield style={featureIcon} />
										<Text style={featureText}>Certificate</Text>
									</div>
									<div style={featureItem}>
										<Mail style={featureIcon} />
										<Text style={featureText}>24/7 Support</Text>
									</div>
								</div>
							</div>
						</Section>

						<Text style={text}>
							Ready to dive in? Your learning adventure starts now with just one click:
						</Text>

						<Button href={courseUrl} style={button}>
							<Play style={buttonIcon} />
							<span style={buttonText}>Start Learning Now</span>
						</Button>

						<Hr style={gradientHr} />

						{/* Next Steps */}
						<Text style={sectionTitle}>What's Next?</Text>
						<div style={stepsContainer}>
							<div style={step}>
								<div style={stepNumber}>1</div>
								<Text style={stepText}>Complete the welcome module</Text>
							</div>
							<div style={step}>
								<div style={stepNumber}>2</div>
								<Text style={stepText}>Join our community Discord</Text>
							</div>
							<div style={step}>
								<div style={stepNumber}>3</div>
								<Text style={stepText}>Build your first project</Text>
							</div>
						</div>

						<Text style={supportText}>
							Need help? Our support team is here for you 24/7 at support@courseflow.com
						</Text>
					</Section>

					{/* Footer */}
					<Section style={footer}>
						<div style={socialContainer}>
							<a href="#" style={socialLink}><Twitter style={socialIcon} /></a>
							<a href="#" style={socialLink}><Linkedin style={socialIcon} /></a>
							<a href="#" style={socialLink}><Github style={socialIcon} /></a>
							<a href="#" style={socialLink}><MessageCircle style={socialIcon} /></a>
						</div>
						
						<Text style={footerText}>
							© {new Date().getFullYear()} Courseflow, Inc. All Rights Reserved.
						</Text>
						<Text style={footerSubtext}>
							123 Learning Street, Education City | <a href="#" style={unsubscribeLink}>Unsubscribe</a>
						</Text>
					</Section>
				</Container>
			</Body>
		</Html>
	);
};

export default PurchaseConfirmationEmail;

// Styles
const main: CSSProperties = {
	backgroundColor: "#0f0f23",
	backgroundImage: "linear-gradient(135deg, #0f0f23 0%, #1a1a2e 50%, #16213e 100%)",
	fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
	padding: "20px 0",
};

const backgroundPattern: CSSProperties = {
	position: "absolute",
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	backgroundImage: "radial-gradient(circle at 25% 25%, rgba(92, 107, 192, 0.1) 0%, transparent 50%)",
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

const successIcon: CSSProperties = {
	width: "64px",
	height: "64px",
	color: "#10b981",
	margin: "0 auto 20px",
};

const heading: CSSProperties = {
	fontSize: "36px",
	lineHeight: 1.2,
	fontWeight: "800",
	margin: "0 0 12px",
	color: "#ffffff",
	textAlign: "center",
	letterSpacing: "-0.5px",
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
	color: "#667eea",
	fontWeight: "600",
};

const courseCard: CSSProperties = {
	margin: "30px 0",
	backgroundColor: "rgba(15, 15, 35, 0.6)",
	borderRadius: "12px",
	overflow: "hidden",
	border: "1px solid rgba(92, 107, 192, 0.2)",
};

const courseImageContainer: CSSProperties = {
	position: "relative",
	overflow: "hidden",
};

const imageStyle: CSSProperties = {
	width: "100%",
	height: "200px",
	objectFit: "cover",
};

const overlayGradient: CSSProperties = {
	position: "absolute",
	bottom: 0,
	left: 0,
	right: 0,
	height: "60%",
	background: "linear-gradient(transparent, rgba(15, 15, 35, 0.9))",
};

const courseDetails: CSSProperties = {
	padding: "24px",
};

const courseTitleStyle: CSSProperties = {
	fontSize: "22px",
	fontWeight: "700",
	color: "#ffffff",
	margin: "0 0 16px",
	textAlign: "center",
};

const priceBadge: CSSProperties = {
	backgroundColor: "rgba(16, 185, 129, 0.2)",
	border: "1px solid rgba(16, 185, 129, 0.4)",
	borderRadius: "20px",
	padding: "8px 16px",
	display: "inline-block",
	margin: "0 auto 20px",
	textAlign: "center",
};

const priceText: CSSProperties = {
	fontSize: "18px",
	color: "#10b981",
	fontWeight: "700",
	margin: "0",
};

const featuresGrid: CSSProperties = {
	display: "grid",
	gridTemplateColumns: "repeat(3, 1fr)",
	gap: "16px",
	margin: "20px 0",
};

const featureItem: CSSProperties = {
	textAlign: "center",
};

const featureIcon: CSSProperties = {
	width: "20px",
	height: "20px",
	color: "#667eea",
	margin: "0 auto 8px",
};

const featureText: CSSProperties = {
	fontSize: "12px",
	color: "#a8b1ff",
	margin: "0",
};

const button: CSSProperties = {
	backgroundColor: "transparent",
	backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
	borderRadius: "8px",
	color: "#fff",
	fontSize: "16px",
	fontWeight: "600",
	textDecoration: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	gap: "8px",
	width: "100%",
	padding: "16px 24px",
	margin: "30px 0",
	border: "none",
	cursor: "pointer",
	transition: "all 0.3s ease",
};

const buttonIcon: CSSProperties = {
	width: "18px",
	height: "18px",
};

const buttonText: CSSProperties = {
	display: "inline-block",
};

const gradientHr: CSSProperties = {
	border: "none",
	height: "2px",
	background: "linear-gradient(90deg, transparent, #667eea, #764ba2, transparent)",
	margin: "30px 0",
	borderRadius: "2px",
};

const sectionTitle: CSSProperties = {
	fontSize: "18px",
	fontWeight: "600",
	color: "#a8b1ff",
	margin: "0 0 20px",
	textAlign: "center",
};

const stepsContainer: CSSProperties = {
	display: "grid",
	gap: "16px",
	margin: "0 0 30px",
};

const step: CSSProperties = {
	display: "flex",
	alignItems: "center",
	gap: "16px",
	padding: "12px",
	backgroundColor: "rgba(15, 15, 35, 0.4)",
	borderRadius: "8px",
	border: "1px solid rgba(92, 107, 192, 0.1)",
};

const stepNumber: CSSProperties = {
	width: "28px",
	height: "28px",
	backgroundColor: "#667eea",
	color: "#ffffff",
	borderRadius: "50%",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
	fontSize: "14px",
	fontWeight: "600",
	flexShrink: 0,
};

const stepText: CSSProperties = {
	color: "#e6e6ff",
	fontSize: "14px",
	margin: "0",
};

const supportText: CSSProperties = {
	fontSize: "14px",
	color: "#a8b1ff",
	textAlign: "center",
	margin: "20px 0 0",
};

const footer: CSSProperties = {
	marginTop: "40px",
	textAlign: "center",
};

const socialContainer: CSSProperties = {
	margin: "0 0 20px",
	display: "flex",
	justifyContent: "center",
	gap: "20px",
};

const socialLink: CSSProperties = {
	color: "#a8b1ff",
	textDecoration: "none",
};

const socialIcon: CSSProperties = {
	width: "20px",
	height: "20px",
	color: "#a8b1ff",
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
	color: "#667eea",
	textDecoration: "none",
};