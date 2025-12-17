const baseEmailWrapper = (content: string) : string => {
    return `
        <!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <style>
      body {
        font-family: Arial, Helvetica, sans-serif;
        background-color: #f5f6f8;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 40px auto;
        background-color: #ffffff;
        padding: 24px;
        border-radius: 6px;
        color: #333333;
      }
      .header {
        font-size: 16px;
        font-weight: 600;
        margin-bottom: 16px;
      }
      .content {
        font-size: 14px;
        line-height: 1.6;
      }
      .footer {
        margin-top: 24px;
        font-size: 12px;
        color: #777777;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="content">
        ${content}
      </div>
      <div class="footer">
        This is an automated message. Please do not reply.
      </div>
    </div>
  </body>
</html>
    ` 
}

export default function generatedAutomatedEmailContent(
    job: string,
    candidateName: string,
    status: 'applied' | 'screening' | 'interview' | 'offer' | 'hired' | 'rejected'
): {subject: string, body: string} {
    
    let subject: string = '';
    let body: string = ''
    let content = ''

    switch (status) {
      case 'applied':
        subject = `Thank you for applying the job - ${job}`;
        content = `
                <p>Hello ${candidateName},</p>

                <p>
                This is an automated notification to inform you that the status of your
                application for the <strong>${job}</strong> position has been updated to
                <strong>Applied</strong>.
                </p>

                <p>
                You can view the updated status by logging into your account.
                </p>

                <p>
                Regards,<br />
                Aspiro Team
                </p>
            `;
        body = baseEmailWrapper(content)
        break
    
      case 'screening':
        subject = `Application Status Update - ${status}`
        content = `
            <p>Hello ${candidateName},</p>

            <p>
            This is an automated notification to inform you that the status of your
            application for the <strong>${job}</strong> position has been updated to
            <strong>Screening</strong>.
            </p>

            <p>
            You can view the updated status by logging into your account.
            </p>

            <p>
            Regards,<br />
            Aspiro Team
            </p>
        `
        body = baseEmailWrapper(content)
        break

      case 'interview':
        subject = `Application Status Update - ${status}`
        content = `
            <p>Hello ${candidateName},</p>

            <p>
            The status of your application for the <strong>${job}</strong> role has
            been updated to <strong>Interview</strong>.
            </p>

            <p>
            Any further communication regarding interview details will be shared separately.
            </p>

            <p>
            Regards,<br />
            Aspiro Team
            </p>
        `
        body = baseEmailWrapper(content)
    
      case 'offer':
        subject = `Application Status Update - ${status}`
        content = `
            <p>Hello ${candidateName},</p>

            <p>
            Your application status for the <strong>${job}</strong> position has been
            updated to <strong>Offer</strong>.
            </p>

            <p>
            Please check your account or await further communication for additional details.
            </p>

            <p>
            Regards,<br />
            Aspiro Team
            </p>
        `
        body = baseEmailWrapper(content)

      case 'hired':
        subject = `Application Status Update - ${status}`
        content = `
            <p>Hello ${candidateName},</p>

            <p>
            We are pleased to inform you that your application status for the
            <strong>${job}</strong> role has been updated to <strong>Hired</strong>.
            </p>

            <p>
            Further onboarding information, if applicable, will be shared separately.
            </p>

            <p>
            Regards,<br />
            Aspiro Team
            </p>
        `
        body = baseEmailWrapper(content)

      case 'rejected':
        subject = `Appplication Status Update - ${status}`
        content = `
            <p>Hello ${candidateName},</p>

            <p>
            The status of your application for the <strong>${job}</strong> position has
            been updated to <strong>Rejected</strong>.
            </p>

            <p>
            Thank you for your interest in the opportunity.
            </p>

            <p>
            Regards,<br />
            Aspiro Team
            </p>
        `
    }

    return {
        subject, body
    }
    
}
