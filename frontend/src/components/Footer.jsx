import React from 'react'

function Footer() {
  return (
    <footer style={{
      backgroundColor: '#000', 
      color: '#fff', 
      padding: '20px', 
      height: '10%',
      textAlign: 'center', 
      position: 'fixed', // Ensures it stays at the bottom
      bottom: 0, 
      left: 0, 
      right: 0 // Makes the footer span the entire width
    }}>
      <div style={{ marginBottom: '10px' }}>
        <p style={{ fontSize: '18px', fontStyle: 'italic', margin: '0' }}>
          “The more that you read, the more things you will know. The more that you learn, the more places you’ll go.” – Dr. Seuss
        </p>
      </div>
      <div style={{ textAlign: 'center', marginTop: '10px', fontSize: '14px' }}>
        <p>&copy; 2024 Collaborative Study Platform. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer