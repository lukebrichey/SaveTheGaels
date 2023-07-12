import React from 'react';
import { Box, Heading, Text, Link, Image } from '@chakra-ui/react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function Markdown({ source }) {
  
  const generateHeading = (size) => ({ node, ...props }) => (
    <Heading size={size} mt="2" mb="4" {...props} />
  );

  return (
    <ReactMarkdown
      children={source}
      components={{
        h1: generateHeading("2xl"),
        h2: generateHeading("xl"),
        h3: generateHeading("lg"),
        h4: generateHeading("md"),
        h5: generateHeading("sm"),
        h6: generateHeading("xs"),
        p: ({node, ...props}) => <Text {...props} />,
        a: ({node, ...props}) => <Link color="blue.500" {...props} />,
        img: ({node, ...props}) => <Image {...props} />,
        code: ({node, inline, className, children, ...props}) => {
          const match = /language-(\w+)/.exec(className || '')
          return !inline && match 
            ? <SyntaxHighlighter 
                style={vscDarkPlus} 
                language={match[1]} 
                PreTag="div" {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter> 
            : <code className={className} {...props}>
                {children}
              </code>
        },
        div: ({node, ...props}) => <Box {...props} />,
      }}
    />
  );
}
