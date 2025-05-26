const nodemailer = require('nodemailer');

exports.sendResetEmail = async (to, resetLink) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: '"FMS Support" <no-reply@fms.com>',
    to,
    subject: 'Reset Your Password',
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password. This link is valid for 15 minutes.</p>`
  });
};
