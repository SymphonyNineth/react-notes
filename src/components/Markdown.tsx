import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
interface MarkdownProps {
  children: string;
}

const Markdown = ({ children }: MarkdownProps) => {
  const remarkPlugins = [remarkGfm];
  return (
    <ReactMarkdown remarkPlugins={remarkPlugins}>{children}</ReactMarkdown>
  );
};

export default Markdown;
