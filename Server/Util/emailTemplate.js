const ReqTemp = (Desc,TeacherName) =>
` <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: Arial, sans-serif; margin: 20px;">

  <h2>Subject: Certificate Request Notification</h2>

  <p>Dear USER ,</p>

  <p>
    I hope this email finds you well. We wanted to inform you that your teacher,<b> ${TeacherName} </b>, has requested a certificate on your behalf.
  </p>
 <p>
 ${Desc}
  </p> 

  
 
  <p>Best regards,</p>
  <p>VCET CMS</p>
 
  <p>
  If you have any specific requirements or if there's additional information needed, Please contat respected teacher.
</p>

  <p>
    THIS IS SYSTEM GENERATED MAIL SO PLEASE DO NOT REPLY.
  </p>

</body>
</html>`

const gmailContent = (verificationToken) => {
  return `
    <h1 style="color: #008080; font-family: 'Arial', sans-serif; text-align: center;">Email Verification</h1>
    
    <div style="background-color: #f0f0f0; padding: 20px; border-radius: 8px;">
      <p style="font-size: 16px; font-family: 'Arial', sans-serif; color: #444; text-align: center;">Click the button below to verify your email:</p>
      <div style="text-align: center; margin-top: 20px;">
        <a href="http://localhost:4000/api/v1/auth/emailverify/${verificationToken}" style="display: inline-block; background-color: #008080; color: #fff; font-size: 18px; font-family: 'Arial', sans-serif; text-decoration: none; padding: 10px 20px; border-radius: 5px; border: 2px solid #008080; transition: background-color 0.3s ease-in-out;">
          Verify Email
        </a>
      </div>
    </div>
    `;

}

const successFullVerification = (recipientEmail) => {
  return `
  <h1 style="color: #008080; font-family: 'Arial', sans-serif; text-align: center;">Congratulations! ${recipientEmail}</h1>
  <div style="background-color: #f0f0f0; padding: 20px; border-radius: 8px;">
    <p style="font-size: 16px; font-family: 'Arial', sans-serif; color: #444; text-align: center;">You have successfully verified your email.</p>
    <div style="text-align: center; margin-top: 20px;">
      <a href="https://www.noteshare.online/login" style="display: inline-block; background-color: #008080; color: #fff; font-size: 18px; font-family: 'Arial', sans-serif; text-decoration: none; padding: 10px 20px; border-radius: 5px; border: 2px solid #008080; transition: background-color 0.3s ease-in-out;">
        Go to Home Page
      </a>
    </div>
  </div>
`;
}



    module.exports = {ReqTemp,gmailContent,successFullVerification}