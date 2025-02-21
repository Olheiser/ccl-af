import { CourtAppearance } from "@/types";
import { formatDate, formatTimeTo12Hour } from "./util";
import provinceName, { ProvinceNames } from "./provinceNames";

export const appearanceEmailTemplate = (appearance: CourtAppearance) => {
  const provinceEmail = provinceName[appearance.province as keyof ProvinceNames];

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Request for Appearance</title>
  <style>
    /* Reset styles for email clients */
    body, p, h1, h2, ul, li {
      margin: 0;
      padding: 0;
      font-family: Roboto, sans-serif;
    }

    /* Body background */
    body {
      background-color: #F1F4F6;
      padding: 20px 0;
    }

    /* Container for the email content */
    .email-container {
      max-width: 800px;
      margin: 0 auto;
      background-color: #FDFDFD;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.3);
    }

    /* Red bar at the top */
    .red-bar {
      height: 40px;
      background-color: #bb0000;
    }

    /* Logo styling */
    .logo {
      display: block;
      margin: 20px auto;
      max-height: 110px;
      width: auto;
    }

    /* Heading styling */
    h1 {
      text-align: center;
      font-size: 26px;
      color: #333;
      margin: 20px 0;
      padding-top: 10px;
    }
    
    h2 {
      padding-top: 30px;
      font-fize: 20px;
    }

    p {
      font-size: 16px;
    }

    li {
      font-size: 16px;
    }

    a {
      font-size: 16px;
    }

    /* Content styling */
    .content {
      padding: 0 40px 20px 40px;
      font-family: Roboto, sans-serif;
      color: #333;
      line-height: 22px;
    }

    .content strong {
      color: #000;
    }

    .content ul {
      list-style: none;
      padding-left: 20px;
      margin-top: 10px;
      margin-bottom: 20px;
    }

    .content ul li {
      line-height: 22px;
    }

    /* Footer styling */
    .footer {
      background-color: #8E0000;
      padding: 20px;
      text-align: center;
      border-top: 1px solid #E0E0E0;
    }

    .footer p, .footer a {
      color: #ffffff;
    }

    .footer a:hover {
      text-decoration: underline;
    }

    .support {
      background-color: #f5f5f5;
    }
    
    .support p, .support a {
      text-align: center;
      font-size: 14px;
      padding: 15px 0;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <!-- Red bar -->
    <div class="red-bar"></div>

    <!-- Logo -->
    <a href="https://agentfinder.canadacriminallawyer.ca"><img src="https://imagedelivery.net/8au6u53Ph6mHP5o5AhlVXQ/f2494350-a48d-4817-3ac0-48679636d100/public" alt="Logo" class="logo"></a>

    <!-- Heading -->
    <h1>New Request for Appearance</h1>

    <!-- Content -->
    <div class="content">
      <p>
        <strong>${appearance.lawyerName}</strong> has submitted a new request for appearance at 
        <strong>${appearance.courthouseName}</strong> on 
        <strong>${formatDate(appearance.date)}</strong> at 
        <strong>${formatTimeTo12Hour(appearance.time)}</strong>.
      </p>

      <h2>Appearance Information:</h2>

      <ul>
        <li><strong>Requesting Lawyer's Name:</strong> ${appearance.lawyerName}</li>
        <li><strong>Requesting Lawyer's Email Address:</strong> ${appearance.email}</li>
        ${appearance.phone && `<li><strong>Requesting Lawyer's Phone Number:</strong> ${appearance.phone}</li>`}
        <li><strong>Preferred Contact Method:</strong> ${appearance.contactMethod}</li>
        <li><strong>Province:</strong> ${appearance.province}</li>
        <li><strong>Courthouse:</strong> ${appearance.courthouseName}</li>
        <li><strong>Date of Appearance:</strong> ${formatDate(appearance.date)}</li>
        <li><strong>Time:</strong> ${formatTimeTo12Hour(appearance.time)}</li>
        ${appearance.courtroomNumber && `<li><strong>Courtroom:</strong> ${appearance.courtroomNumber}</li>`}
        ${appearance.typeOfAppearance && `<li><strong>Type of Appearance:</strong> ${appearance.typeOfAppearance}</li>`}
        ${appearance.accusedStatus && `<li><strong>Will the Accused be Present?</strong> ${appearance.accusedStatus}</li>`}
        ${appearance.designationStatus && `<li><strong>Has a Designation Been Filed With the Court?</strong> ${appearance.designationStatus}</li>`}
        ${appearance.instructions && `<li><strong>Instructions:</strong> ${appearance.instructions}</li>`}
      </ul>

      <p class="helpLawyer"><strong>To help ${appearance.lawyerName} with their appearance please email them at <a href="mailto:${appearance.email}">${appearance.email}</a>${appearance.phone && ` or call them at ${appearance.phone}`}.</strong></p>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p>
        <strong>To find an agent in ${provinceEmail}, go to 
        <a href="https://agentfinder.canadacriminallawyer.ca">https://agentfinder.canadacriminallawyer.ca</a>.
        </strong>
      </p>
    </div>
    <div class="support">
          <p><em>To contact us with respect to any concerns email us at <a href="mailto:admin@canadacriminallawyer.ca">admin@canadacriminallawyer.ca</a>.</em></p>
    </div>
  </div>
</body>
</html>`;
};