import React from 'react';
import { Box, Code, Heading, Text, Link, Image } from '@chakra-ui/react';

import ReactMarkdown from 'react-markdown';

export default function Markdown({ source }) {

  const generateHeading = (size) => ({ node, ...props }) => (
    <Heading size={size} mt="4" mb="4" {...props} />
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
        a: ({node, ...props}) => <Link 
                                    color="blue.500" 
                                    textDecoration="underline"
                                    isExternal
                                    {...props} 
                                  />,
        img: ({node, ...props}) => <Image {...props} />,
        code: ({node, ...props}) => <Code {...props} />,
        div: ({node, ...props}) => <Box {...props} />,
      }}
    />
  );
}
