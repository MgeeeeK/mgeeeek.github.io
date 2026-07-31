# Contact form setup

The contact form submits directly from the static GitHub Pages site to a Google
Apps Script web app. The script stores each valid submission in Google Sheets
and sends a notification to `abhiv1999@gmail.com`.

## 1. Create and prepare the Google Sheet

1. Create a new Google Sheet.
2. Open **Extensions → Apps Script**.
3. Replace the editor contents with
   [`integrations/google-apps-script/Code.gs`](../integrations/google-apps-script/Code.gs).
4. Save the project.
5. Select `setup` in the function menu and click **Run**.
6. Approve the requested spreadsheet permissions.

Running `setup()` stores the destination spreadsheet ID and creates a
`Contact submissions` tab with the expected columns.

## 2. Deploy the Apps Script web app

1. In Apps Script, choose **Deploy → New deployment**.
2. Select **Web app**.
3. Set **Execute as** to **Me**.
4. Set **Who has access** to **Anyone**.
5. Deploy and approve the mail permission when prompted.
6. Copy the `/exec` web-app URL. Do not use the `/dev` test URL.

After editing the Apps Script later, create a new deployment version so the
live web app receives the changes.

## 3. Configure local development

Copy `.env.example` to `.env.local` and replace the placeholder with the `/exec`
URL:

```dotenv
NEXT_PUBLIC_CONTACT_FORM_ENDPOINT=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

The endpoint is public by design and is included in the browser bundle. Never
put Google credentials or other secrets in a `NEXT_PUBLIC_` variable.

## 4. Configure GitHub Pages

In the GitHub repository, open **Settings → Secrets and variables → Actions →
Variables**, then create this repository variable:

- Name: `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT`
- Value: the Apps Script `/exec` URL

Run the **Deploy to GitHub Pages** workflow again, or push a commit to `main`.
Next.js embeds public environment variables at build time, so changing the
variable requires a new build.

## 5. Verify end to end

Submit the deployed portfolio form and check that:

1. A row appears in the `Contact submissions` sheet.
2. Its final status is `Email sent`.
3. The notification arrives at `abhiv1999@gmail.com`.
4. Replying to the notification addresses the visitor's email.

If email delivery fails after the row is saved, the Status column records the
failure. Apps Script execution details are available under **Executions** in the
Apps Script editor.
