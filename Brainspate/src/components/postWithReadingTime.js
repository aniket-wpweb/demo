import React from 'react';

const postWithReadingTime = ({ content }) => {
  // Calculate reading time
  const wordsPerMinute = 200; // Adjust this value based on your preferences
  const wordCount = content?.split(/\s+/).length;
  let readingTime = Math.ceil(wordCount / wordsPerMinute);
  if(isNaN(readingTime)) {
    readingTime = 0;
  }

  return (    
      <>{readingTime} min read</>          
  );
};

export default postWithReadingTime;
