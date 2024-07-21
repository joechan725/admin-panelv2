const emailTemplate = `
<div style="width: 100%; background-color: #f6f6f6; padding-top: 16px; padding-bottom: 16px">
  <div style="max-width: 600px; width: 100%; background-color: white; border-radius: 8px; margin: auto; padding: 40px; border: 1px solid rgba(15, 23, 42, 0.2);">
    {{mainContent}}
  </div>
</div>
`;

export const getHtmlTemplate = (template: 'email', replacements: { [key: string]: string }) => {
  let html = emailTemplate;
  for (const key in replacements) {
    const regex = new RegExp(`{{${key}}}`, 'g');
    html = html.replace(regex, replacements[key]);
  }
  return html;
};
