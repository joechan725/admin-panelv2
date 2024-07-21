import DOMPurify from 'dompurify';

interface BlockNoteViewerProps {
  html?: string;
  className?: string;
}

const BlockNoteViewer = ({ html, className }: BlockNoteViewerProps) => {
  if (!html) {
    return null;
  }

  const sanitizeHTML = DOMPurify.sanitize(html);

  return <div className={className} dangerouslySetInnerHTML={{ __html: sanitizeHTML }} />;
};

export default BlockNoteViewer;
