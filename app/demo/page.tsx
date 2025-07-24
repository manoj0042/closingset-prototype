'use client';
import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Lock, User, Mail, Shield } from 'lucide-react';

// JSON Data Configuration
const platformData = {
  company: {
    name: "42law Austria",
    logo: "42",
    currentDate: "December 15, 2024"
  },
  navigation: [
    { id: 'closing', label: 'Closing Documents', icon: '📁' },
    { id: 'team', label: 'Our Team', icon: '👥' },
    { id: 'company', label: 'Company Info', icon: '🏢' },
    { id: 'transaction', label: 'Transaction Details', icon: '💰' }
  ],
  closingDocuments: {
    title: "Legal Document Closing Portal",
    subtitle: "Comprehensive Legal Review for Investment Decision - Easelink GmbH",
    companyInfo: {
      overview: "Easelink GmbH - Single-founder startup established in 2016, specializing in electric vehicle charging solutions",
      investment: "Forward Equity Agreement with EUR 1,500,000 investment representing 43% of current capital raise",
      shareholding: "Verbund's estimated shareholding upon conversion: 1.83% - 3.70% depending on future valuation",
      legalStatus: "Comprehensive review completed with identified issues in conversion formula requiring negotiated solution"
    },
    riskWarning: {
      title: "Key Risk Identified:",
      description: "The Forward Equity Agreement contains a circular reference in the conversion formula that may require negotiated resolution at conversion time."
    },
    documents: [
      {
        title: 'Investment Agreement',
        status: '✅ Completed',
        fileName: '01-Investment-Agreement.pdf',
        filePath: 'closing-set/01-Investment-Agreement.pdf',
        fileSize: '2.3 MB',
      }
      ,
      {
        title: 'Shareholder Agreement',
        status: '✅ Completed',
        fileName: '02-Shareholder-Agreement.pdf',
        filePath: 'closing-set/02-Shareholder-Agreement.pdf',
        fileSize: '1.8 MB',
      },
      {
        title: 'trustee-agreement',
        status: '✅ Completed',
        fileName: '03-Trustee-Agreement.pdf',
        filePath: 'closing-set/03-Trustee-Agreement.pdf',
        fileSize: '1.2 MB',
      }
      ,
      {
        title: 'gesellschaftsvertrag',
        status: '🔍 Under Review',
        fileName: '04-Gesellschaftsvertrag.pdf',
        filePath: 'closing-set/04-Gesellschaftsvertrag.pdf',
        fileSize: '1.5 MB',
      }
      ,
      {
        title: 'aoGV-protokoll',
        status: '✅ Completed',
        fileName: '05-aoGV-protokoll.pdf',
        filePath: 'closing-set/05-aoGV-protokoll.pdf',
        fileSize: '2.0 MB',
      }
    ]
  },
  team: {
    title: "Meet Our Expert Legal Team",
    subtitle: "World-class legal professionals delivering exceptional results",
    members: [
      {
        name: "Dr. Maria Hofbausery",
        role: "Managing Partner",
        avatar: "MH",
        description: "Leading corporate lawyer with 15+ years in M&A and venture capital transactions. Specialized in cross-border investments and startup law."
      },
      {
        name: "Dr. Alexander Schmidt",
        role: "Senior Associate",
        avatar: "AS",
        description: "Expert in technology law and intellectual property with extensive experience in electric vehicle and clean tech sectors."
      },
      {
        name: "Lisa Müller",
        role: "Legal Analyst",
        avatar: "LM",
        description: "Specialized in financial regulations and compliance, with deep expertise in Austrian and EU investment frameworks."
      },
      {
        name: "Thomas Kirchner",
        role: "Transaction Coordinator",
        avatar: "TK",
        description: "Master of complex deal structuring with proven track record in managing high-stakes investment transactions."
      }
    ]
  },
  company: {
    title: "42law Austria - Excellence in Legal Services",
    subtitle: "Austria's premier boutique law firm specializing in innovation and technology",
    stats: [
      { number: "150+", label: "Successful Transactions" },
      { number: "€4.5B", label: "Total Deal Value" },
      { number: "25+", label: "Countries Served" },
      { number: "98%", label: "Client Satisfaction" }
    ],
    values: [
      {
        icon: "⚡",
        title: "Innovation First",
        description: "We embrace cutting-edge legal technology and innovative approaches to deliver superior results for our clients in the digital age."
      },
      {
        icon: "🎯",
        title: "Precision & Excellence",
        description: "Every detail matters. Our meticulous attention to precision ensures flawless execution of complex legal transactions."
      },
      {
        icon: "🌍",
        title: "Global Perspective",
        description: "Local expertise with international reach, connecting Austrian businesses to global opportunities and markets."
      },
      {
        icon: "🚀",
        title: "Future-Ready",
        description: "Pioneering legal solutions for tomorrow's challenges, especially in cleantech, AI, and sustainable innovation sectors."
      }
    ]
  },
  transaction: {
    title: "Transaction Commercials",
    subtitle: "Financial highlights and commercial terms of the Easelink investment",
    mainAmount: "€1,500,000",
    mainDescription: "Total Investment Amount Successfully Raised",
    details: [
      {
        title: "💰 Investment Type",
        description: "Forward Equity Agreement (FEA) - Innovative financing structure designed for early-stage growth companies"
      },
      {
        title: "📈 Capital Raise Participation",
        description: "45% of the current funding round, demonstrating significant investor confidence in Easelink's potential"
      },
      {
        title: "🎯 Valuation Framework",
        description: "Conversion pricing mechanism tied to future qualified financing rounds, protecting both investor and company interests"
      },
      {
        title: "📊 Shareholding Projection",
        description: "Estimated 1.83% - 3.70% equity stake upon conversion, depending on company valuation at conversion event"
      }
    ],
    stats: [
      { number: "€1.5M", label: "Investment Amount" },
      { number: "45%", label: "Round Participation" },
      { number: "2016", label: "Company Founded" },
      { number: "EV", label: "Charging Focus" }
    ],
    riskAssessment: {
      title: "Commercial Risk Assessment:",
      description: "The conversion formula contains technical complexities that may require negotiation at conversion time. Our legal team has identified and documented all potential scenarios to ensure optimal outcomes for all parties."
    }
  }
};

// Authentication Component
const AuthenticationScreen = ({ onAuthenticate }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [users, setUsers] = useState([
    { id: 1, email: 'admin@42law.at', password: 'admin123', name: 'Dr. Maria Hofbausery', role: 'Managing Partner' },
    { id: 2, email: 'lawyer@42law.at', password: 'lawyer123', name: 'Dr. Alexander Schmidt', role: 'Senior Associate' },
    { id: 3, email: 'user@42law.at', password: 'user123', name: 'Client User', role: 'Client' }
  ]);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const handleLogin = async (e) => {
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

  const handleRegister = async (e) => {
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
const Header = ({ companyData, onLogout, currentUser }) => (
  <header className="header">
    <div className="logo">
      <div className="logo-icon">{companyData.logo}</div>
      <span>42law Austria</span>
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
const Navigation = ({ navItems, activeTab, onTabChange }) => (
  <nav className="nav-tabs">
    {navItems.map(item => (
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
const InfoCard = ({ title, description }) => (
  <div className="info-card">
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

// Risk Warning Component
const RiskWarning = ({ title, description }) => (
  <div className="risk-warning">
    <h4>{title}</h4>
    <p>{description}</p>
  </div>
);

// Document Item Component
const DocumentItem = ({ title, status, fileName, filePath }) => (
  <div className="document-item">
    <div className="document-title">{title}</div>
    <div className="document-status">{status}</div>
    {/* <div className="document-link">View {fileName} Document</div> */}
    <a className="document-link" target="_blank" href={filePath}> View {fileName} Document </a>
  </div>
);

// Confidential Banner Component
const ConfidentialBanner = ({ text }) => (
  <div className="confidential-banner">
    🔒 {text}
  </div>
);

// Team Member Component
const TeamMember = ({ member }) => (
  <div className="team-member">
    <div className="member-avatar">{member.avatar}</div>
    <div className="member-name">{member.name}</div>
    <div className="member-role">{member.role}</div>
    <div className="member-description">{member.description}</div>
  </div>
);

// Stat Card Component
const StatCard = ({ number, label }) => (
  <div className="stat-card">
    <div className="stat-number">{number}</div>
    <div className="stat-label">{label}</div>
  </div>
);

// Value Card Component
const ValueCard = ({ icon, title, description }) => (
  <div className="value-card">
    <div className="value-icon">{icon}</div>
    <div className="value-title">{title}</div>
    <div className="value-description">{description}</div>
  </div>
);

// Transaction Highlight Component
const TransactionHighlight = ({ amount, description }) => (
  <div className="transaction-highlight">
    <div className="transaction-amount">{amount}</div>
    <div className="transaction-description">{description}</div>
  </div>
);

// Closing Documents Page Component
const ClosingDocumentsPage = ({ data }) => (
  <div className="main-card">
    <h1 className="page-title">{data.title}</h1>
    <p className="page-subtitle">{data.subtitle}</p>

    <div className="info-grid">
      <InfoCard title="Company Overview" description={data.companyInfo.overview} />
      <InfoCard title="Investment Structure" description={data.companyInfo.investment} />
      <InfoCard title="Estimated Shareholding" description={data.companyInfo.shareholding} />
      <InfoCard title="Legal Review Status" description={data.companyInfo.legalStatus} />
    </div>

    <RiskWarning title={data.riskWarning.title} description={data.riskWarning.description} />

    <div className="document-list">
      {data.documents.map((doc, index) => (
        <DocumentItem key={index} title={doc.title} status={doc.status} fileName={doc.fileName} filePath={doc.filePath} />
      ))}
    </div>

    <ConfidentialBanner text="STRICTLY CONFIDENTIAL - 42law Austria Exclusive" />
  </div>
);

// Team Page Component
const TeamPage = ({ data }) => (
  <div className="main-card">
    <h1 className="page-title">{data.title}</h1>
    <p className="page-subtitle">{data.subtitle}</p>

    <div className="team-grid">
      {data.members.map((member, index) => (
        <TeamMember key={index} member={member} />
      ))}
    </div>
  </div>
);

// Company Page Component
const CompanyPage = ({ data }) => (
  <div className="main-card">
    <h1 className="page-title">{data.title}</h1>
    <p className="page-subtitle">{data.subtitle}</p>

    <div className="stats-grid">
      {data.stats.map((stat, index) => (
        <StatCard key={index} number={stat.number} label={stat.label} />
      ))}
    </div>

    <div className="company-values">
      {data.values.map((value, index) => (
        <ValueCard key={index} icon={value.icon} title={value.title} description={value.description} />
      ))}
    </div>
  </div>
);

// Transaction Page Component
const TransactionPage = ({ data }) => (
  <div className="main-card">
    <h1 className="page-title">{data.title}</h1>
    <p className="page-subtitle">{data.subtitle}</p>

    <TransactionHighlight amount={data.mainAmount} description={data.mainDescription} />

    <div className="info-grid">
      {data.details.map((detail, index) => (
        <InfoCard key={index} title={detail.title} description={detail.description} />
      ))}
    </div>

    <div className="stats-grid">
      {data.stats.map((stat, index) => (
        <StatCard key={index} number={stat.number} label={stat.label} />
      ))}
    </div>

    <RiskWarning title={data.riskAssessment.title} description={data.riskAssessment.description} />

    <ConfidentialBanner text="Transaction completed with 42law Austria legal excellence" />
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

  const handleAuthenticate = (user) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
    sessionStorage.setItem('42law_authenticated', 'true');
    sessionStorage.setItem('42law_user', JSON.stringify(user));
  };

  const handleTabChange = (tabId) => {
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

      cards.forEach((card, index) => {
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
      case 'company':
        return <CompanyPage data={platformData.company} />;
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
        }
      `}</style>

      <div className="container">
        <Header
          companyData={platformData.company}
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