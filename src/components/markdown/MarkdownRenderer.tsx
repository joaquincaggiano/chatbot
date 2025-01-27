import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkBreaks from "remark-breaks";
import "highlight.js/styles/github-dark.css"; // Cambia por el estilo que prefieras

interface MarkdownRendererProps {
  content: string; // Contenido en formato Markdown
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  return (
    <div className="markdown-container">
      <ReactMarkdown
        rehypePlugins={[rehypeHighlight]}
        remarkPlugins={[remarkBreaks]}
        components={{
          p: ({ children }) => (
            <p className="mb-4 whitespace-pre-wrap">{children}</p>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
