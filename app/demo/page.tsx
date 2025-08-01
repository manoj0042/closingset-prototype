'use client';
import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Lock, User, Mail, Shield } from 'lucide-react';

// JSON Data Configuration
const platformData = {
  profile: {
    logo:  "/42Law Logo.svg",
    currentDate: "July 28, 2025"
  },
  navigation: [
    { id: 'transaction', label: 'Transaction Overview', icon: '💰' },
    { id: 'closing', label: 'Closing Documents', icon: '📁' },
    { id: 'team', label: 'Our Team', icon: '👥' },
  ],
  closingDocuments: {
    title: "Series B-14 Equity Financing",
    subtitle: "€9.7 mio Equity Financing of Storebox Holding GmbH",
   
      
    documents: [
      { 
    title: 'Investment Agreement', 
    status: '✅ Completed', 
    fileName: '01-Investment-Agreement.pdf', 
    filePath: 'closing-set/01-Investment-Agreement.pdf', 
    fileSize: '2.3 MB', 
  },
  { 
    title: 'Shareholder Agreement', 
    status: '✅ Completed', 
    fileName: '02-Shareholder-Agreement.pdf', 
    filePath: 'closing-set/02-Shareholder-Agreement.pdf', 
    fileSize: '1.8 MB', 
  },
  { 
    title: 'Trustee Agreement', 
    status: '✅ Completed', 
    fileName: '03-Trustee-Agreement.pdf', 
    filePath: 'closing-set/03-Trustee-Agreement.pdf', 
    fileSize: '1.2 MB', 
  },
  { 
    title: 'gesellschaftsvertrag', 
    status: '🔍 Under Review', 
    fileName: '04-gesellschaftsvertrag.pdf', 
    filePath: 'closing-set/04-gesellschaftsvertrag.pdf', 
    fileSize: '1.5 MB', 
  },
  { 
    title: 'aoGV-Protokoll', 
    status: '✅ Completed', 
    fileName: '05-aoGV-Protokoll.pdf', 
    filePath: 'closing-set/05-aoGV-Protokoll.pdf', 
    fileSize: '2.0 MB', 
  },
  { 
    title: 'ubernahmeeerklarung', 
    status: '✅ Completed', 
    fileName: '06-ubernahmeerklarung.pdf', 
    filePath: 'closing-set/06-ubernahmeerklarung.pdf', 
    fileSize: '1.0 MB', 
  },
  { 
    title: 'Bankbestätigung', 
    status: '✅ Completed', 
    fileName: '07-Bankbestatigung.pdf', 
    filePath: 'closing-set/07-Bankbestatigung.pdf', 
    fileSize: '1.4 MB', 
  },
  { 
    title: 'firmenbuchanmeldung', 
    status: '✅ Completed', 
    fileName: '08-firmenbuchanmeldung.pdf', 
    filePath: 'closing-set/08-firmenbuchanmeldung.pdf', 
    fileSize: '1.6 MB', 
  },
  { 
    title: 'Firmenbuchanmeldung', 
    status: '✅ Completed', 
    fileName: '09-Firmenbuchanmeldung.pdf', 
    filePath: 'closing-set/09-Firmenbuchanmeldung.pdf', 
    fileSize: '1.3 MB', 
  },
  { 
    title: 'Eintragungsbeschluss', 
    status: '✅ Completed', 
    fileName: '10-Eintragungsbeschluss.pdf', 
    filePath: 'closing-set/10-Eintragungsbeschluss.pdf', 
    fileSize: '1.1 MB', 
  }

    ]
  },
  team: {
    title: "Meet Our Team",
    subtitle: "Got any questions? Get in touch!",
    members: [
      {
        name: "Dr. Christof Strasser",
        role: "Managing Partner",
        avatar: "CS",
        description: "Leading corporate lawyer with 15+ years in M&A and venture capital transactions. Specialized in cross-border investments and startup law.",
        email: "c.strasser@42law.com",
        linkedin: "https://www.linkedin.com/in/christof-strasser-4b304314"
      },

      {
        name: " Michael Ademilua",
        role: "Senior Associate",
        avatar: "MA",
        description: "Expert in technology law and intellectual property with extensive experience in electric vehicle and clean tech sectors.",
        email: "m.ademilua@42law.com",
        linkedin: "https://www.linkedin.com/in/michael-ademilua"
      },
      {
        name: "Sathya Priya",
        role: "Senior Associate",
        avatar: "SP",
        description: "Specialized in financial regulations and compliance, with deep expertise in Austrian and EU investment frameworks.",
        email: "s.priya@42law.com",
        linkedin: "https://linkedin.com/in/sathya-priya"
      },
      

    ]
  },
  
  transaction: {
    title: "Transaction Overview",
    subtitle: "Financial highlights and commercial terms of the Easelink investment",
    mainAmount: "€9,738,700",
    mainDescription: "Total Investment Amount Raised",
    
    stats: [
      { number: "€10 mio Pre-Money valuation", label: "Investment Amount" },
      { number: "22", label: "Parties" },
      { number: "42law", label: "Lead Counsel" },
      { number: "August 4 2025", label: "Closing Date" }
    ],
    
    }
  }


// Authentication Component
const AuthenticationScreen = ({ onAuthenticate }: any) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [users, setUsers] = useState([
    { id: 1, email: 'admin@42law.at', password: 'admin123', name: 'Dr. Christof Strasser', role: 'Managing Partner' },
    { id: 2, email: 'lawyer@42law.at', password: 'lawyer123', name: 'Dr. Michael Ademilua', role: 'Senior Associate' },
    { id: 3, email: 'user@42law.at', password: 'user123', name: 'Client',  }
  ]);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });

  const handleInputChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    if (!validatePassword(formData.password)) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    // Simulate API call delay
    setTimeout(() => {
      const user = users.find(u => u.email === formData.email && u.password === formData.password);

      if (user) {
        onAuthenticate(user);
        setFormData({ email: '', password: '', name: '', confirmPassword: '' });
      } else {
        setError('Invalid email or password. Try: admin@42law.at / admin123');
      }
      setLoading(false);
    }, 1000);
  };

  const handleRegister = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (!formData.name.trim()) {
      setError('Name is required');
      setLoading(false);
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    if (!validatePassword(formData.password)) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (users.find(u => u.email === formData.email)) {
      setError('User with this email already exists');
      setLoading(false);
      return;
    }

    setTimeout(() => {
      const newUser = {
        id: users.length + 1,
        email: formData.email,
        password: formData.password,
        name: formData.name,
        role: 'Client'
      };

      setUsers([...users, newUser]);
      onAuthenticate(newUser);
      setFormData({ email: '', password: '', name: '', confirmPassword: '' });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="auth-container">
      <div className="auth-background">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo">
              <div className="auth-logo-icon">42</div>
              <h1>42law Austria</h1>
            </div>
            <p className="auth-subtitle">Secure Legal Document Portal</p>
          </div>

          <div className="auth-tabs">
            <button
              className={`auth-tab ${isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(true)}
            >
              <Lock size={18} />
              Login
            </button>
            <button
              className={`auth-tab ${!isLogin ? 'active' : ''}`}
              onClick={() => setIsLogin(false)}
            >
              <User size={18} />
              Register
            </button>
          </div>

          <form onSubmit={isLogin ? handleLogin : handleRegister} className="auth-form">
            {error && (
              <div className="auth-error">
                <Shield size={16} />
                {error}
              </div>
            )}

            {!isLogin && (
              <div className="auth-field">
                <User className="auth-icon" size={20} />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="auth-input"
                  required={!isLogin}
                />
              </div>
            )}

            <div className="auth-field">
              <Mail className="auth-icon" size={20} />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="auth-input"
                required
              />
            </div>

            <div className="auth-field">
              <Lock className="auth-icon" size={20} />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="auth-input"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="auth-toggle-password"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {!isLogin && (
              <div className="auth-field">
                <Lock className="auth-icon" size={20} />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="auth-input"
                  required={!isLogin}
                />
              </div>
            )}

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              {loading ? (
                <div className="auth-spinner"></div>
              ) : (
                <>
                  <Shield size={18} />
                  {isLogin ? 'Secure Login' : 'Create Account'}
                </>
              )}
            </button>
          </form>

          {isLogin && (
            <div className="auth-demo-accounts">
              <p>Demo Accounts:</p>
              <div className="demo-account">
                <strong>Admin:</strong> admin@42law.at / admin123
              </div>
              <div className="demo-account">
                <strong>Lawyer:</strong> lawyer@42law.at / lawyer123
              </div>
              <div className="demo-account">
                <strong>Client:</strong> user@42law.at / user123
              </div>
            </div>
          )}

          <div className="auth-footer">
            <Shield size={16} />
            <span>Protected by enterprise-grade security</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Header Component
const Header = ({ companyData, onLogout, currentUser }: any) => (
  <header className="header">
    <div className="logo">
      {/* Replace the logo-icon div with an img tag */}
      <img 
        src={companyData.logo} 
        alt="42law Austria Logo" 
        className="logo-image"
      />
      <span></span>
    </div>
    <div className="user-info">
      <div className="user-badge">
        <User size={16} />
        {currentUser.name} ({currentUser.role})
      </div>
      <div className="date-badge">📅 {companyData.currentDate}</div>
      <button className="logout-btn" onClick={onLogout}>🔐 Logout</button>
    </div>
  </header>
);


// Navigation Component
const Navigation = ({ navItems, activeTab, onTabChange }: any) => (
  <nav className="nav-tabs">
    {navItems.map((item: any) => (
      <button
        key={item.id}
        className={`nav-tab ${activeTab === item.id ? 'active' : ''}`}
        onClick={() => onTabChange(item.id)}
      >
        {item.icon} {item.label}
      </button>
    ))}
  </nav>
);

// Info Card Component
const InfoCard = ({ title, description }: any) => (
  <div className="info-card">
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

// Risk Warning Component
const RiskWarning = ({ title, description }: any) => (
  <div className="risk-warning">
    <h4>{title}</h4>
    <p>{description}</p>
  </div>
);

// Document Item Component
const DocumentItem = ({ title, status, fileName, filePath }: any) => (
  <div className="flex justify-between items-center p-4 mb-4">
    <div>
      <div className="font-semibold text-lg flex items-center gap-2">
        {/* Add PDF icon here */}
        <img 
          src="/pdf-icon copy.svg" 
          alt="PDF" 
          width="20" 
          height="20" 
          className="flex-shrink-0"
        />
        {title}
      </div>
      <div className="text-sm text-gray-600">{status}</div>
    </div>
    <div className="flex gap-3"> 
      {/* View Button: Blue Box */} 
      <a 
        href={filePath} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2" 
        style={{ backgroundColor: "#2563EB" }} // Tailwind bg-blue-600 equivalent 
      > 
        👁️ View 
      </a> 
      {/* Download Button: Green Box */} 
      <a 
        href={filePath} 
        download={fileName} 
        className="text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2" 
        style={{ backgroundColor: "#22C55E" }} // Tailwind bg-green-500 equivalent 
      > 
        📥 Download 
      </a> 
    </div> 
  </div> 
);
// Confidential Banner Component
const ConfidentialBanner = ({ text }: any) => (
  <div className="confidential-banner">
    🔒 {text}
  </div>
);

// Team Member Component
// Team Member Component
const TeamMember = ({ member }: any) => (
  <div className="team-member">
    <div className="member-avatar">{member.avatar}</div>
    <div className="member-name">{member.name}</div>
    <div className="member-role">{member.role}</div>
    <div className="member-description">{member.description}</div>
    <div className="member-contact">
      <a href={`mailto:${member.email}`} className="member-email">
        <Mail size={16} />
        {member.email}
      </a>
      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="member-linkedin">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
        LinkedIn
      </a>
    </div>
  </div>
);

// Stat Card Component
const StatCard = ({ number, label }: any) => (
  <div className="stat-card">
    <div className="stat-number">{number}</div>
    <div className="stat-label">{label}</div>
  </div>
);

// Value Card Component
const ValueCard = ({ icon, title, description }: any) => (
  <div className="value-card">
    <div className="value-icon">{icon}</div>
    <div className="value-title">{title}</div>
    <div className="value-description">{description}</div>
  </div>
);

// Transaction Highlight Component
const TransactionHighlight = ({ amount, description }: any) => (
  <div className="transaction-highlight">
    <div className="transaction-amount">{amount}</div>
    <div className="transaction-description">{description}</div>
  </div>
);

// Closing Documents Page Component
const ClosingDocumentsPage = ({ data }: any) => (
  <div className="main-card">
    <h1 className="page-title">{data.title}</h1>
    <p className="page-subtitle">{data.subtitle}</p>

  


    <div className="document-list">
      {data.documents.map((doc: any, index: number) => (
        <DocumentItem key={index} title={doc.title} status={doc.status} fileName={doc.fileName} filePath={doc.filePath} />
      ))}
    </div>

    <ConfidentialBanner text="STRICTLY CONFIDENTIAL - Never share documents with unauthorised parties" />
  </div>
);

// Team Page Component
const TeamPage = ({ data }: any) => (
  <div className="main-card">
    <h1 className="page-title">{data.title}</h1>
    <p className="page-subtitle">{data.subtitle}</p>

    <div className="team-grid">
      {data.members.map((member: any, index: number) => (
        <TeamMember key={index} member={member} />
      ))}
    </div>
  </div>
);


// Transaction Page Component
const TransactionPage = ({ data }: any) => (
  <div className="main-card">
    <h1 className="page-title">{data?.title || 'Untitled'}</h1>
    <p className="page-subtitle">{data?.subtitle || ''}</p>

    <TransactionHighlight
      amount={data?.mainAmount || 'N/A'}
      description={data?.mainDescription || ''}
    />

    <div className="info-grid">
      {Array.isArray(data?.details) &&
        data.details.map((detail: any, index: number) => (
          <InfoCard
            key={index}
            title={detail?.title || 'No Title'}
            description={detail?.description || ''}
          />
        ))}
    </div>

    <div className="stats-grid">
      {Array.isArray(data?.stats) &&
        data.stats.map((stat: any, index: number) => (
          <StatCard
            key={index}
            number={stat?.number || 0}
            label={stat?.label || ''}
          />
        ))}
    </div>

    {data?.riskAssessment && (
      <RiskWarning
        title={data.riskAssessment?.title || 'Risk Warning'}
        description={data.riskAssessment?.description || ''}
      />
    )}

    
  </div>
);


// Main App Component
const LawPlatformApp = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('closing');

  // Check authentication on component mount
  useEffect(() => {
    const savedAuth = sessionStorage.getItem('42law_authenticated');
    const savedUser = sessionStorage.getItem('42law_user');

    if (savedAuth === 'true' && savedUser) {
      setIsAuthenticated(true);
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  const handleAuthenticate = (user: any) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
    sessionStorage.setItem('42law_authenticated', 'true');
    sessionStorage.setItem('42law_user', JSON.stringify(user));
  };

  const handleTabChange = (tabId: any) => {
    setActiveTab(tabId);
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      setIsAuthenticated(false);
      setCurrentUser(null);
      sessionStorage.removeItem('42law_authenticated');
      sessionStorage.removeItem('42law_user');
      setActiveTab('closing');
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      // Animation effect for cards
      const cards = document.querySelectorAll('.info-card, .team-member, .value-card');

      cards.forEach((card: any, index: number) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';

        setTimeout(() => {
          card.style.transition = 'all 0.6s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, index * 100);
      });
    }
  }, [activeTab, isAuthenticated]);

  const renderCurrentPage = () => {
    switch (activeTab) {
      case 'closing':
        return <ClosingDocumentsPage data={platformData.closingDocuments} />;
      case 'team':
        return <TeamPage data={platformData.team} />;
      

      case 'transaction':
        return <TransactionPage data={platformData.transaction} />;
      default:
        return <ClosingDocumentsPage data={platformData.closingDocuments} />;
    }
  };

  // If not authenticated, show login screen
  if (!isAuthenticated) {
    return (
      <>
        <style>{`
          .auth-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
          }

          .auth-background {
            position: relative;
            width: 100%;
            max-width: 450px;
          }

          .auth-card {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border-radius: 25px;
            padding: 40px;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.3);
          }

          .auth-header {
            text-align: center;
            margin-bottom: 30px;
          }

          .auth-logo {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 15px;
            margin-bottom: 20px;
          }

          .auth-logo-icon {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
            font-size: 32px;
            box-shadow: 0 15px 35px rgba(99, 102, 241, 0.3);
          }

          .auth-logo h1 {
            font-size: 28px;
            font-weight: 800;
            color: #1f2937;
            margin: 0;
          }

          .auth-subtitle {
            color: #6b7280;
            font-size: 16px;
            margin: 0;
          }

          .auth-tabs {
            display: flex;
            background: rgba(243, 244, 246, 0.5);
            border-radius: 15px;
            padding: 4px;
            margin-bottom: 30px;
          }

          .auth-tab {
            flex: 1;
            padding: 12px 20px;
            background: transparent;
            border: none;
            border-radius: 12px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            color: #6b7280;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
          }

          .auth-tab.active {
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            color: white;
            box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
          }

          .auth-form {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          .auth-field {
            position: relative;
            display: flex;
            align-items: center;
          }

          .auth-icon {
            position: absolute;
            left: 15px;
            color: #6b7280;
            z-index: 1;
          }

          .auth-input {
            width: 100%;
            padding: 15px 50px;
            border: 2px solid rgba(243, 244, 246, 0.8);
            border-radius: 12px;
            font-size: 16px;
            transition: all 0.3s ease;
            background: rgba(255, 255, 255, 0.8);
          }

          .auth-input:focus {
            outline: none;
            border-color: #6366f1;
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
          }

          .auth-toggle-password {
            position: absolute;
            right: 15px;
            background: none;
            border: none;
            color: #6b7280;
            cursor: pointer;
            padding: 5px;
          }

          .auth-submit {
            background: linear-gradient(135deg, #6366f1, #8b5cf6);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 12px;
            font-weight: 600;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            margin-top: 10px;
          }

          .auth-submit:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 15px 35px rgba(99, 102, 241, 0.4);
          }

          .auth-submit:disabled {
            opacity: 0.7;
            cursor: not-allowed;
          }

          .auth-spinner {
            width: 18px;
            height: 18px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-top: 2px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          .auth-error {
            background: linear-gradient(135deg, #fef2f2, #fee2e2);
            color: #dc2626;
            padding: 15px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            gap: 10px;
            border-left: 4px solid #dc2626;
            font-weight: 500;
          }

          .auth-demo-accounts {
            margin-top: 25px;
            padding: 20px;
            background: rgba(243, 244, 246, 0.5);
            border-radius: 12px;
            font-size: 14px;
          }

          .auth-demo-accounts p {
            font-weight: 600;
            color: #374151;
            margin-bottom: 10px;
          }

          .demo-account {
            color: #6b7280;
            margin-bottom: 5px;
          }

          .demo-account strong {
            color: #374151;
          }

          .auth-footer {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            margin-top: 25px;
            color: #6b7280;
            font-size: 14px;
          }

          @media (max-width: 480px) {
            .auth-card {
              padding: 25px;
            }
            
            .auth-logo-icon {
              width: 60px;
              height: 60px;
              font-size: 24px;
            }
            
            .auth-logo h1 {
              font-size: 24px;
            }
          }
        `}</style>
        <AuthenticationScreen onAuthenticate={handleAuthenticate} />
      </>
    );
  }

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          color: #333;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 20px;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 20px 30px;
          margin-bottom: 30px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 15px;
          font-size: 28px;
          font-weight: 800;
          color: #6366f1;
        }
          .logo-image {
  height: 50px;
  width: auto;
  max-width: 200px;
  object-fit: contain;
}

        .logo-icon {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 18px;
        }
           .logo span {
          font-size: 28px;
          font-weight: 800;
          color: #1f2937;
          white-space: nowrap;
        }

        .user-info {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .user-badge {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          padding: 10px 20px;
          border-radius: 25px;
          font-weight: 600;
          box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
        }

        .date-badge {
          background: linear-gradient(135deg, #f59e0b, #f97316);
          color: white;
          padding: 10px 20px;
          border-radius: 25px;
          font-weight: 600;
          box-shadow: 0 8px 25px rgba(245, 158, 11, 0.3);
        }

        .logout-btn {
          background: linear-gradient(135deg, #ef4444, #dc2626);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 25px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 8px 25px rgba(239, 68, 68, 0.3);
        }

        .logout-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 35px rgba(239, 68, 68, 0.4);
        }

        .nav-tabs {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 20px;
          padding: 8px;
          margin-bottom: 30px;
          display: flex;
          gap: 8px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .nav-tab {
          flex: 1;
          padding: 15px 20px;
          background: transparent;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #6b7280;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .nav-tab.active {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
          transform: translateY(-2px);
        }

        .nav-tab:hover:not(.active) {
          background: rgba(99, 102, 241, 0.1);
          color: #6366f1;
        }

        .main-card {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 25px;
          padding: 40px;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          margin-bottom: 30px;
        }

        .page-title {
          font-size: 36px;
          font-weight: 800;
          color: #1f2937;
          margin-bottom: 15px;
          background: linear-gradient(135deg, #1f2937, #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-align: center;
        }

        .page-subtitle {
          font-size: 18px;
          color: #6b7280;
          text-align: center;
          margin-bottom: 40px;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 25px;
          margin-bottom: 30px;
        }

        .info-card {
          background: linear-gradient(135deg, #f8fafc, #e2e8f0);
          border-radius: 20px;
          padding: 25px;
          border-left: 6px solid #6366f1;
          transition: all 0.3s ease;
        }

        .info-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
        }

        .info-card h3 {
          color: #1f2937;
          font-weight: 700;
          margin-bottom: 10px;
          font-size: 16px;
        }

        .info-card p {
          color: #4b5563;
          line-height: 1.6;
        }

        .risk-warning {
          background: linear-gradient(135deg, #fef3c7, #fed7aa);
          border-radius: 20px;
          padding: 25px;
          margin: 30px 0;
          border-left: 6px solid #f59e0b;
          position: relative;
          overflow: hidden;
        }

        .risk-warning::before {
          content: "⚠️";
          position: absolute;
          top: 25px;
          left: 25px;
          font-size: 24px;
        }

        .risk-warning h4 {
          color: #92400e;
          font-weight: 700;
          margin-left: 40px;
          margin-bottom: 10px;
        }

        .risk-warning p {
          color: #78350f;
          margin-left: 40px;
          line-height: 1.6;
        }

        .confidential-banner {
          background: linear-gradient(135deg, #ef4444, #dc2626);
          color: white;
          text-align: center;
          padding: 20px;
          border-radius: 20px;
          font-weight: 700;
          font-size: 18px;
          margin: 30px 0;
          box-shadow: 0 15px 35px rgba(239, 68, 68, 0.3);
          position: relative;
          overflow: hidden;
        }

        .confidential-banner::before {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255,255,255,0.1), transparent);
          transform: rotate(45deg);
          animation: shine 3s infinite;
        }

        @keyframes shine {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 30px;
        }

        .team-member {
          background: linear-gradient(135deg, #ffffff, #f8fafc);
          border-radius: 25px;
          padding: 30px;
          text-align: center;
          transition: all 0.3s ease;
          border: 1px solid rgba(99, 102, 241, 0.1);
          position: relative;
          overflow: hidden;
        }

        .team-member::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
        }

        .team-member:hover {
          transform: translateY(-10px);
          box-shadow: 0 25px 50px rgba(99, 102, 241, 0.2);
        }

        .member-avatar {
          width: 100px;
          height: 100px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-radius: 50%;
          margin: 0 auto 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 36px;
          font-weight: bold;
        }

        .member-name {
          font-size: 24px;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 8px;
        }

        .member-role {
          color: #6366f1;
          font-weight: 600;
          margin-bottom: 15px;
        }

        .member-description {
  color: #6b7280;
  line-height: 1.6;
}

.member-contact {
  margin-top: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.member-email, .member-linkedin {
  color: #6366f1;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 8px;
  background: rgba(99, 102, 241, 0.1);
}

.member-email:hover, .member-linkedin:hover {
  color: #4f46e5;
  background: rgba(99, 102, 241, 0.2);
  transform: translateX(5px);
}

.member-linkedin svg {
  transition: all 0.3s ease;
}

.member-linkedin:hover svg {
  fill: #0077b5;
}
}

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 25px;
          margin: 30px 0;
        }

        .stat-card {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          border-radius: 25px;
          padding: 30px;
          color: white;
          text-align: center;
          position: relative;
          overflow: hidden;
        }

        .stat-card::before {
          content: "";
          position: absolute;
          top: -50%;
          right: -50%;
          width: 100px;
          height: 100px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 50%;
        }

        .stat-number {
          font-size: 42px;
          font-weight: 800;
          margin-bottom: 10px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }

        .stat-label {
          font-size: 16px;
          opacity: 0.9;
          font-weight: 600;
        }

        .company-values {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 25px;
          margin: 30px 0;
        }

        .value-card {
          background: linear-gradient(135deg, #fef3c7, #fed7aa);
          border-radius: 20px;
          padding: 30px;
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(245, 158, 11, 0.2);
        }

        .value-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #f59e0b, #f97316);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 24px;
          margin-bottom: 20px;
        }

        .value-title {
          font-size: 20px;
          font-weight: 700;
          color: #92400e;
          margin-bottom: 10px;
        }

        .value-description {
          color: #78350f;
          line-height: 1.6;
        }

        .transaction-highlight {
          background: linear-gradient(135deg, #10b981, #059669);
          border-radius: 25px;
          padding: 40px;
          color: white;
          text-align: center;
          margin: 30px 0;
          position: relative;
          overflow: hidden;
        }

        .transaction-highlight::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
        }

        .transaction-amount {
          font-size: 48px;
          font-weight: 800;
          margin-bottom: 15px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .transaction-description {
          font-size: 18px;
          opacity: 0.9;
          font-weight: 500;
        }

        .document-list {
          display: grid;
          gap: 20px;
          margin: 30px 0;
        }

        .document-item {
          background: linear-gradient(135deg, #ffffff, #f8fafc);
          border-radius: 15px;
          padding: 25px;
          border-left: 4px solid #6366f1;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .document-item:hover {
          transform: translateX(10px);
          box-shadow: 0 10px 30px rgba(99, 102, 241, 0.2);
        }

        .document-title {
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 5px;
        }

        .document-status {
          color: #10b981;
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 10px;
        }

        .document-link {
          color: #6366f1;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
        }

        .document-link:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .container {
            padding: 15px;
          }
          
          .header {
            flex-direction: column;
            gap: 15px;
            text-align: center;
          }

          .user-info {
            flex-wrap: wrap;
            justify-content: center;
          }
          
          .nav-tabs {
            flex-direction: column;
          }
          
          .main-card {
            padding: 25px;
          }
          
          .page-title {
            font-size: 28px;
          }
        }.enhanced-doc-item {
          background: linear-gradient(135deg, #ffffff, #f8fafc);
          border-radius: 20px;
          padding: 25px;
          margin-bottom: 20px;
          border: 1px solid rgba(99, 102, 241, 0.1);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        }

        .enhanced-doc-item::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
        }

        .enhanced-doc-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 35px rgba(99, 102, 241, 0.15);
          border-color: rgba(99, 102, 241, 0.2);
        }

        .enhanced-doc-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
        }

        .enhanced-doc-left {
          display: flex;
          align-items: center;
          gap: 15px;
          flex: 1;
          min-width: 200px;
        }

        .enhanced-doc-icon {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #fef3c7, #fed7aa);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid rgba(245, 158, 11, 0.2);
          flex-shrink: 0;
        }

        .enhanced-doc-icon img {
          filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
        }

        .enhanced-doc-info {
          flex: 1;
          min-width: 150px;
        }

        .enhanced-doc-title {
          font-size: 18px;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 8px;
          line-height: 1.3;
        }

        .enhanced-doc-meta {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }

        .enhanced-doc-filename {
          color: #6b7280;
          font-size: 14px;
          font-weight: 500;
        }

        .enhanced-doc-size {
          color: #9ca3af;
          font-size: 14px;
        }

        .enhanced-doc-status {
          display: flex;
          align-items: center;
          margin: 0 10px;
        }

        .enhanced-status-badge {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .enhanced-doc-actions {
          display: flex;
          gap: 10px;
          flex-shrink: 0;
        }

        .enhanced-action-btn {
          padding: 10px 18px;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          border: none;
          white-space: nowrap;
        }

        .enhanced-view-btn {
          background: linear-gradient(135deg, #6366f1, #8b5cf6);
          color: white;
          box-shadow: 0 4px 15px rgba(99, 102, 241, 0.3);
        }

        .enhanced-view-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(99, 102, 241, 0.4);
        }

        .enhanced-download-btn {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
        }

        .enhanced-download-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
        }

        @media (max-width: 768px) {
          .enhanced-doc-content {
            flex-direction: column;
            align-items: stretch;
            gap: 15px;
          }

          .enhanced-doc-left {
            min-width: auto;
          }

          .enhanced-doc-status {
            margin: 0;
            justify-content: center;
          }

          .enhanced-doc-actions {
            justify-content: center;
            flex-wrap: wrap;
          }

          .enhanced-action-btn {
            flex: 1;
            min-width: 120px;
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .enhanced-doc-item {
            padding: 20px;
          }

          .enhanced-doc-title {
            font-size: 16px;
          }

          .enhanced-doc-left {
            gap: 12px;
          }

          .enhanced-doc-icon {
            width: 45px;
            height: 45px;
          }

          .enhanced-action-btn {
            padding: 8px 15px;
            font-size: 13px;
          }
        }
      `}</style>

      <div className="container">
        <Header
          companyData={platformData.profile}
          onLogout={handleLogout}
          currentUser={currentUser}
        />

        <Navigation
          navItems={platformData.navigation}
          activeTab={activeTab}
          onTabChange={handleTabChange}
        />

        {renderCurrentPage()}
      </div>
    </>
  );
};

export default LawPlatformApp;
