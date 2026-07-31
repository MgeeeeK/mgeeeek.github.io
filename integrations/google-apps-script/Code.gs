const CONFIG = Object.freeze({
  SHEET_NAME: 'Contact submissions',
  NOTIFICATION_EMAIL: 'abhiv1999@gmail.com',
  HEADERS: ['Timestamp', 'Name', 'Company', 'Email', 'Message', 'Source', 'Status'],
  MAX_LENGTHS: {
    name: 100,
    company: 150,
    email: 254,
    message: 5000,
    source: 1000,
  },
});

/**
 * Run this once from the Apps Script editor while the script is bound to the
 * destination spreadsheet. It stores the spreadsheet ID and creates the tab.
 */
function setup() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();

  if (!spreadsheet) {
    throw new Error('Bind this script to a Google Sheet before running setup().');
  }

  PropertiesService.getScriptProperties().setProperty(
    'SPREADSHEET_ID',
    spreadsheet.getId()
  );

  const sheet = getOrCreateSheet_(spreadsheet);
  ensureHeaders_(sheet);
}

/** Receives the portfolio form submission from the static GitHub Pages site. */
function doPost(event) {
  try {
    const parameters = event && event.parameter ? event.parameter : {};

    // Bots commonly populate every field. Silently accept the request without
    // storing or emailing it when the hidden website field has a value.
    if (clean_(parameters.website, 200)) {
      return json_({ ok: true });
    }

    const submission = {
      name: clean_(parameters.name, CONFIG.MAX_LENGTHS.name),
      company: clean_(parameters.company, CONFIG.MAX_LENGTHS.company),
      email: clean_(parameters.email, CONFIG.MAX_LENGTHS.email),
      message: clean_(parameters.message, CONFIG.MAX_LENGTHS.message),
      source: clean_(parameters.source, CONFIG.MAX_LENGTHS.source),
    };

    validate_(submission);

    const spreadsheetId = PropertiesService.getScriptProperties().getProperty(
      'SPREADSHEET_ID'
    );

    if (!spreadsheetId) {
      throw new Error('Run setup() once before accepting submissions.');
    }

    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    const sheet = getOrCreateSheet_(spreadsheet);
    const lock = LockService.getScriptLock();

    lock.waitLock(10000);
    let row;
    try {
      ensureHeaders_(sheet);
      sheet.appendRow([
        new Date(),
        safeForSheet_(submission.name),
        safeForSheet_(submission.company),
        safeForSheet_(submission.email),
        safeForSheet_(submission.message),
        safeForSheet_(submission.source),
        'Saved; sending email',
      ]);
      row = sheet.getLastRow();
    } finally {
      lock.releaseLock();
    }

    try {
      sendNotification_(submission);
      sheet.getRange(row, CONFIG.HEADERS.length).setValue('Email sent');
    } catch (emailError) {
      sheet.getRange(row, CONFIG.HEADERS.length).setValue(
        'Saved; email failed: ' + errorMessage_(emailError)
      );
      throw emailError;
    }

    return json_({ ok: true });
  } catch (error) {
    console.error(error);
    return json_({ ok: false, error: errorMessage_(error) });
  }
}

function sendNotification_(submission) {
  const subjectName = submission.name.replace(/[\r\n]+/g, ' ');
  const subject = 'Portfolio enquiry from ' + subjectName;
  const textBody = [
    'Name: ' + submission.name,
    'Company: ' + (submission.company || 'Not provided'),
    'Email: ' + submission.email,
    'Source: ' + (submission.source || 'Not provided'),
    '',
    submission.message,
  ].join('\n');

  const htmlBody = [
    '<p><strong>Name:</strong> ' + escapeHtml_(submission.name) + '</p>',
    '<p><strong>Company:</strong> ' + escapeHtml_(submission.company || 'Not provided') + '</p>',
    '<p><strong>Email:</strong> ' + escapeHtml_(submission.email) + '</p>',
    '<p><strong>Source:</strong> ' + escapeHtml_(submission.source || 'Not provided') + '</p>',
    '<hr>',
    '<p>' + escapeHtml_(submission.message).replace(/\n/g, '<br>') + '</p>',
  ].join('');

  MailApp.sendEmail({
    to: CONFIG.NOTIFICATION_EMAIL,
    subject: subject,
    body: textBody,
    htmlBody: htmlBody,
    replyTo: submission.email,
    name: 'Portfolio contact form',
  });
}

function validate_(submission) {
  if (!submission.name || !submission.email || !submission.message) {
    throw new Error('Name, email, and message are required.');
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(submission.email)) {
    throw new Error('Enter a valid email address.');
  }
}

function getOrCreateSheet_(spreadsheet) {
  return (
    spreadsheet.getSheetByName(CONFIG.SHEET_NAME) ||
    spreadsheet.insertSheet(CONFIG.SHEET_NAME)
  );
}

function ensureHeaders_(sheet) {
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(CONFIG.HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, CONFIG.HEADERS.length).setFontWeight('bold');
  }
}

function clean_(value, maxLength) {
  return String(value || '').trim().slice(0, maxLength);
}

// Prevent a submitted value from being interpreted as a spreadsheet formula.
function safeForSheet_(value) {
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}

function escapeHtml_(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function errorMessage_(error) {
  return error && error.message ? error.message : String(error);
}

function json_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON
  );
}
