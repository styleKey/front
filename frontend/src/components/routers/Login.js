// Login.js
import React from 'react';
import '../../App.css';
import Auth from "../Auth";
import { AuthProvider } from "../AuthContext"; // AuthProvider 추가

export default function Login() {
  return (
    <div className='login'>
      <AuthProvider> {/* AuthProvider로 AuthContext를 감싸줌 */}
        <Auth />
      </AuthProvider>
    </div>
  );
}
