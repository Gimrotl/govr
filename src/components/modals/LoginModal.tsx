import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useModals } from '../../hooks/useModals';

export const LoginModal: React.FC = () => {
  const { login, register, googleLogin, isLoggedIn } = useAuth();
  const { closeModal, openModal } = useModals();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState({
    email: '',
    password: ''
  });
  const [registerCredentials, setRegisterCredentials] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  // Close modal when user successfully logs in
  React.useEffect(() => {
    if (isLoggedIn) {
      closeModal('login');
    }
  }, [isLoggedIn, closeModal]);

  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode);
    setEmailSent(false);
    setAcceptTerms(false);
    setRegisterCredentials({ email: '', password: '', confirmPassword: '' });
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginCredentials({ ...loginCredentials, [name]: value });
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterCredentials({ ...registerCredentials, [name]: value });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(loginCredentials.email, loginCredentials.password);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate password confirmation
    if (registerCredentials.password !== registerCredentials.confirmPassword) {
      alert('Die Passwörter stimmen nicht überein. Bitte überprüfen Sie Ihre Eingabe.');
      return;
    }
    
    // Validate password strength
    if (registerCredentials.password.length < 6) {
      alert('Das Passwort muss mindestens 6 Zeichen lang sein.');
      return;
    }
    
    // Check if terms are accepted
    if (!acceptTerms) {
      alert('Sie müssen die Nutzungsbedingungen akzeptieren, um sich zu registrieren.');
      return;
    }
    
    // Simulate email verification
    setEmailSent(true);
    alert(`Eine Bestätigungs-E-Mail wurde an ${registerCredentials.email} gesendet. Bitte überprüfen Sie Ihr Postfach und klicken Sie auf den Bestätigungslink.`);
    
    // In a real app, you would not register immediately but wait for email confirmation
    // For demo purposes, we'll register after showing the email message
    setTimeout(() => {
      register(registerCredentials.email, registerCredentials.password);
      setEmailSent(false);
    }, 2000);
    register(registerCredentials.email, registerCredentials.password);
  };

  const openTermsModal = () => {
    openModal('terms');
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-scaleIn">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            {isRegisterMode ? 'Create Account' : 'Çuvala / Sign In'}
          </h2>
          <button
            onClick={() => closeModal('login')}
            className="text-gray-500 hover:text-gray-700 transition duration-200"
          >
            <X size={24} />
          </button>
        </div>

        {emailSent && (
          <div className="mb-6 p-4 bg-sky-50 border border-sky-200 rounded-lg">
            <h3 className="font-semibold text-sky-700 mb-2">E-Mail-Bestätigung erforderlich</h3>
            <p className="text-sky-600 text-sm">
              Wir haben eine Bestätigungs-E-Mail an <strong>{registerCredentials.email}</strong> gesendet. 
              Bitte überprüfen Sie Ihr Postfach und klicken Sie auf den Bestätigungslink, um Ihr Konto zu aktivieren.
            </p>
          </div>
        )}
        {isRegisterMode ? (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label htmlFor="register-email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="register-email"
                name="email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                placeholder="Your email"
                value={registerCredentials.email}
                onChange={handleRegisterChange}
                required
                disabled={emailSent}
              />
            </div>
            <div>
              <label htmlFor="register-password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="register-password"
                name="password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                placeholder="Create a password"
                value={registerCredentials.password}
                onChange={handleRegisterChange}
                required
                minLength={6}
                disabled={emailSent}
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                Passwort bestätigen
              </label>
              <input
                type="password"
                id="confirm-password"
                name="confirmPassword"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                placeholder="Passwort wiederholen"
                value={registerCredentials.confirmPassword}
                onChange={handleRegisterChange}
                required
                disabled={emailSent}
              />
            </div>
            
            <div className="flex items-start space-x-2">
              <input
                type="checkbox"
                id="accept-terms"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="mt-1 h-4 w-4 text-emerald-500 focus:ring-emerald-400 border-gray-300 rounded"
                required
                disabled={emailSent}
              />
              <label htmlFor="accept-terms" className="text-sm text-gray-700">
                Ich akzeptiere die{' '}
                <button
                  type="button"
                  onClick={openTermsModal}
                  className="text-rose-400 hover:text-rose-500 underline"
                >
                  Nutzungsbedingungen
                </button>
              </label>
            </div>
            
            <button
              type="submit"
              className="w-full bg-emerald-500 text-white py-3 rounded-lg hover:bg-emerald-600 transition duration-200"
              disabled={emailSent}
            >
              {emailSent ? 'E-Mail-Bestätigung ausstehend...' : 'Konto erstellen'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1">

              </label>
              <input
                type="email"
                id="login-email"
                name="email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                placeholder="E-Mail Adresse"
                value={loginCredentials.email}
                onChange={handleLoginChange}
                required
              />
            </div>
            <div>
              <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-1">
              
              </label>
              <input
                type="password"
                id="login-password"
                name="password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                placeholder="Ihr Passwort"
                value={loginCredentials.password}
                onChange={handleLoginChange}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-emerald-500 text-white py-3 rounded-lg hover:bg-emerald-600 transition duration-200"
            >
              Anmelden
            </button>
            <button
              type="button"
              onClick={googleLogin}
              className="w-full bg-sky-400 text-white py-3 rounded-lg hover:bg-sky-500 transition duration-200 flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.545,10.917v3.249h5.72c-0.23,1.282-1.741,3.824-5.72,3.824c-3.453,0-6.27-2.866-6.27-6.395c0-3.529,2.817-6.395,6.27-6.395c1.953,0,3.29,0.83,4.048,1.556l2.729-2.636c-1.762-1.634-4.054-2.62-6.777-2.62c-5.565,0-10.062,4.501-10.062,10.062c0,5.561,4.497,10.062,10.062,10.062c5.814,0,9.689-3.956,9.689-9.551c0-0.647-0.071-1.139-0.155-1.638H12.545z"/>
              </svg>
               Google 
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={toggleMode}
            className="text-black hover:text-gray-700 transition duration-200"
          >
            {isRegisterMode ? 'Bereits ein Konto? Hier anmelden' : 'Noch kein Konto? Jetzt registrieren'}
          </button>
        </div>
      </div>
    </div>
  );
};