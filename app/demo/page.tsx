'use client';
import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Lock, User, Mail, Shield } from 'lucide-react';
import './styles.css';
// JSON Data Configuration
const platformData = {
  profile: {
    logo: "/42Law Logo.svg",
    currentDate: "July 28, 2025"
  },
  navigation: [
    { id: 'transaction', label: 'Transaction Overview', icon: '💰' },
    { id: 'closing', label: 'Closing Documents', icon: '📁' },
    { id: 'team', label: 'Our Team', icon: '👥' },
  ],
  closingDocuments: {
    title: "whatchado GmbH - Closing Document Set",
    subtitle: "Documents related to the closing of the whatchado GmbH financing round.",


    documents: [
      {
        title: 'Whatreorg-Bankbestätigung-vom-(7.1.2025).pdf',
        status: '✅ Completed',
        fileName: 'Whatreorg-Bankbestätigung-vom-(7.1.2025).pdf',
        description: 'This document is the bank confirmation from Whatreorg, dated January 7, 2025.',
        filePath: 'closing-set/Whatreorg-Bankbestätigung-vom-(7.1.2025).pdf',
        fileSize: '2.3 MB',
      },
      {
        title: 'Whatreorg-Eintragungsbeschluss.pdf',
        status: '✅ Completed',
        fileName: 'Whatreorg-Eintragungsbeschluss.pdf',
        description: 'This resolution outlines the decisions made by the shareholders, including approvals for actions such as funding rounds, changes to the company structure, and other significant corporate matters.',
        filePath: 'closing-set/Whatreorg-Eintragungsbeschluss.pdf',
        fileSize: '1.8 MB',
      },
      {
        title: 'Whatreorg-FB-Auszug-(2025-1-29).pdf',
        status: '✅ Completed',
        fileName: 'Whatreorg-FB-Auszug-(2025-1-29).pdf',
        description: 'This document records the unanimous consent of the board of directors for a specific action or decision, often used in lieu of a formal meeting.',
        filePath: 'closing-set/Whatreorg-FB-Auszug-(2025-1-29).pdf',
        fileSize: '1.2 MB',
      },
      {
        title: 'Whatreorg-Gesellschaftsvertrag-whatchado-GmbH.pdf',
        status: '✅ Completed',
        fileName: 'Whatreorg-Gesellschaftsvertrag-whatchado-GmbH.pdf',
        description: 'This document certifies the incorporation of Storebox Holding GmbH, including details such as the company name, registration number, and date of incorporation.',
        filePath: 'closing-set/Whatreorg-Gesellschaftsvertrag-whatchado-GmbH.pdf',
        fileSize: '1.5 MB',
      },
      {
        title: 'Whatreorg-GZ-5005-Beteiligungsvertrag.pdf',
        status: '✅ Completed',
        fileName: 'Whatreorg-GZ-5005-Beteiligungsvertrag.pdf',
        description: 'This agreement outlines the terms and conditions for the purchase of shares in Storebox Holding GmbH.',
        filePath: 'closing-set/Whatreorg-GZ-5005-Beteiligungsvertrag.pdf',
        fileSize: '2.0 MB',
      },
      {
        title: 'Whatreorg-GZ-5006-Protokoll.pdf',
        status: '✅ Completed',
        fileName: 'Whatreorg-GZ-5006-Protokoll.pdf',
        description: 'This document confirms that a person or entity has agreed to take over certain obligations, such as company shares or financial responsibilities.',

        filePath: 'closing-set/Whatreorg-GZ-5006-Protokoll.pdf',
        fileSize: '1.0 MB',
      },
      {
        title: 'Whatreorg-GZ-5007-Ubernahme-und-Beitrittserklärung.pdf',
        status: '✅ Completed',
        fileName: 'Whatreorg-GZ-5007-Ubernahme-und-Beitrittserklärung.pdf',
        description: 'A statement from the bank confirming account ownership, available funds, or financial reliability — often required for official procedures.',

        filePath: 'closing-set/Whatreorg-GZ-5007-Ubernahme-und-Beitrittserklärung.pdf',
        fileSize: '1.4 MB',
      },
      {
        title: 'Whatreorg-Lastschriftanzeige.pdf',
        status: '✅ Completed',
        fileName: 'Whatreorg-Lastschriftanzeige.pdf',
        description: 'This document outlines the rights of first refusal (ROFR) and co-sale rights for existing shareholders in the event of a new investment round or sale of the company.',

        filePath: 'closing-set/Whatreorg-Lastschriftanzeige.pdf',
        fileSize: '1.6 MB',
      },
      
      
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
      { number: "€10 million", label: "Pre-Money Valuation", icon: "💎", color: "#7CB342" },
      { number: "22", label: "Transaction Parties", icon: "👥", color: "#5A9E32" },
      { number: "42law", label: "Lead Legal Counsel", icon: "⚖️", color: "#6BB946" },
      { number: "August 4, 2025", label: "Official Closing Date", icon: "📅", color: "#4A8A2A" }
    ]

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
    { id: 3, email: 'user@42law.at', password: 'user123', name: 'Client', }
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


  useEffect(() => {
    const hide1PasswordNotification = () => {
      const host = document.querySelector('com-1password-notification');
      if (host && host.shadowRoot) {
        const notification = host.shadowRoot.querySelector('.dm');
        if (notification instanceof HTMLElement) {
          notification.style.display = 'none';
        }
      }
    };

    // Try once on mount
    hide1PasswordNotification();

    // Also observe DOM changes in case 1Password injects it later
    const observer = new MutationObserver(hide1PasswordNotification);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);


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
const DocumentItem = ({ title, status, fileName, filePath, fileSize, description }: any) => {
  const getStatusColor = (status: string) => {
    if (status && status.includes('Completed')) return '#7CB342'; // Green
    if (status && status.includes('Under Review')) return '#F59E0B'; // Keep orange
    if (status && status.includes('Pending')) return '#EF4444'; // Keep red
    return '#6B7280';
  };

  const getStatusIcon = (status: string) => {
    if (status && status.includes('Completed')) return '✅';
    if (status && status.includes('Under Review')) return '🔍';
    if (status && status.includes('Pending')) return '⏳';
    return '📄';
  };

  const cleanStatusText = (status: string) => {
    if (!status) return 'Unknown';
    return status.replace('✅ ', '').replace('🔍 ', '').replace('⏳ ', '').trim();
  };

  return (
    <div className="enhanced-doc-item">
      <div className="enhanced-doc-content">
        <div className="enhanced-doc-left">
          <div className="enhanced-doc-icon">
            <img
              src="/pdf-icon copy.svg"
              alt="PDF"
              width="24"
              height="24"
            />
          </div>
          <div className="enhanced-doc-info">
            <h3 className="enhanced-doc-title">{title}</h3>
            <div className="enhanced-doc-meta">

              {description && (
                <div className="enhanced-doc-description">
                  {description}
                </div>
              )}
              <span className="enhanced-doc-filename">{fileName}</span>
              {fileSize && <span className="enhanced-doc-size">• {fileSize}</span>}
            </div>
          </div>
        </div>

        <div className="enhanced-doc-status">
          <div
            className="enhanced-status-badge"
            style={{
              backgroundColor: `${getStatusColor(status)}20`,
              color: getStatusColor(status),
              border: `1px solid ${getStatusColor(status)}40`
            }}
          >
            <span>{getStatusIcon(status)}</span>
            <span>{cleanStatusText(status)}</span>
          </div>
        </div>

        <div className="enhanced-doc-actions">
          <a
            href={filePath}
            target="_blank"
            rel="noopener noreferrer"
            className="enhanced-action-btn enhanced-view-btn"
          >
            👁️ View
          </a>
          <a
            href={filePath}
            download={fileName}
            className="enhanced-action-btn enhanced-download-btn"
          >
            📥 Download
          </a>
        </div>
      </div>
    </div>
  );
};
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
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
        LinkedIn
      </a>
    </div>
  </div>
);

// Stat Card Component
const StatCard = ({ number, label, icon, color }: any) => (
  <div className="modern-stat-card" style={{ '--accent-color': color } as any}>
    <div className="stat-glow"></div>
    <div className="stat-icon">{icon}</div>
    <div className="stat-content">
      <div className="stat-number">{number}</div>
      <div className="stat-label">{label}</div>
    </div>
    <div className="stat-pulse"></div>
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
        <DocumentItem key={index} title={doc.title} status={doc.status} fileName={doc.fileName} filePath={doc.filePath} description={doc.description} />
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
            background: vga white; /* Light gray instead of purple gradient */
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
            color: vga white;
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
