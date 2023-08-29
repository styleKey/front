import React from 'react';

function Test() {
  const imageUrl = "https://style-key-bucket.s3.ap-northeast-2.amazonaws.com/%E1%84%8F%E1%85%A9%E1%84%83%E1%85%B5%E1%84%85%E1%85%AE%E1%86%A81.jpg";

  return (
    <div>
      <h1>Test Image Display</h1>
      <img src={imageUrl} alt="Test" />
    </div>
  );
}

export default Test;
