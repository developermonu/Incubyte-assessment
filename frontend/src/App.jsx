import { useEffect, useState } from 'react';
import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import api from './api';

// Toast Notification Component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast toast-${type}`}>
      <span className="toast-icon">
        {type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}
      </span>
      <span className="toast-message">{message}</span>
      <button className="toast-close" onClick={onClose}>×</button>
    </div>
  );
};

// Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

// Confirmation Dialog Component
const ConfirmDialog = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content confirm-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-icon">⚠️</div>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="confirm-actions">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-danger" onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

const RequireAuth = ({ token, children }) => {
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const Login = ({ onAuth, showToast }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/api/auth/login', { email, password });
      onAuth(data.access_token, data.role);
      showToast('Welcome back! 🎉', 'success');
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Unable to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">🍬</div>
          <h2>Welcome Back!</h2>
          <p>Sign in to manage your sweet shop</p>
        </div>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>
              <span className="input-icon">📧</span>
              Email Address
            </label>
            <input 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              type="email" 
              placeholder="you@example.com" 
              required 
            />
          </div>
          <div className="form-group">
            <label>
              <span className="input-icon">🔒</span>
              Password
            </label>
            <input 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              type="password" 
              placeholder="Enter your password" 
              required 
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? (
              <><span className="spinner"></span> Signing in...</>
            ) : (
              'Sign In'
            )}
          </button>
        </form>
        <div className="auth-footer">
          Need an account? <Link to="/register">Create one here</Link>
        </div>
      </div>
    </div>
  );
};

const Register = ({ onAuth, showToast }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/api/auth/register', { email, password, role });
      onAuth(data.access_token, data.role);
      showToast('Account created successfully! 🎉', 'success');
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Unable to register');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-icon">✨</div>
          <h2>Create Account</h2>
          <p>Join our sweet shop community</p>
        </div>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>
              <span className="input-icon">📧</span>
              Email Address
            </label>
            <input 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              type="email" 
              placeholder="you@example.com" 
              required 
            />
          </div>
          <div className="form-group">
            <label>
              <span className="input-icon">🔒</span>
              Password
            </label>
            <input 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              type="password" 
              placeholder="Minimum 6 characters" 
              minLength={6} 
              required 
            />
          </div>
          <div className="form-group">
            <label>
              <span className="input-icon">👤</span>
              Account Type
            </label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="user">🛒 Customer</option>
              <option value="admin">👑 Admin</option>
            </select>
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? (
              <><span className="spinner"></span> Creating account...</>
            ) : (
              'Create Account'
            )}
          </button>
        </form>
        <div className="auth-footer">
          Already have an account? <Link to="/login">Sign in here</Link>
        </div>
      </div>
    </div>
  );
};

const Dashboard = ({ role, showToast }) => {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState({ name: '', category: '', minPrice: '', maxPrice: '' });
  const [form, setForm] = useState({ name: '', category: '', price: '', quantity: '', image_url: '' });
  const [imagePreview, setImagePreview] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({ isOpen: false, sweetId: null });
  const [purchaseDialog, setPurchaseDialog] = useState({ isOpen: false, sweet: null, quantity: 1 });
  const [restockDialog, setRestockDialog] = useState({ isOpen: false, sweet: null, quantity: 5 });

  const fetchSweets = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/api/sweets');
      setSweets(data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to load sweets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  const buildSearchParams = () => {
    const params = new URLSearchParams();
    if (search.name) params.append('name', search.name);
    if (search.category) params.append('category', search.category);
    if (search.minPrice) params.append('min_price', search.minPrice);
    if (search.maxPrice) params.append('max_price', search.maxPrice);
    return params.toString();
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const qs = buildSearchParams();
      const endpoint = qs ? `/api/sweets/search?${qs}` : '/api/sweets';
      const { data } = await api.get(endpoint);
      setSweets(data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({ name: '', category: '', price: '', quantity: '', image_url: '' });
    setImagePreview(null);
    setEditingId(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        showToast('Image size should be less than 5MB', 'error');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setForm({ ...form, image_url: base64String });
        setImagePreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const payload = {
      name: form.name,
      category: form.category,
      price: Number(form.price),
      quantity: Number(form.quantity),
      image_url: form.image_url || null
    };

    try {
      if (editingId) {
        await api.put(`/api/sweets/${editingId}`, payload);
        showToast('Sweet updated successfully! ✨', 'success');
      } else {
        await api.post('/api/sweets', payload);
        showToast('Sweet created successfully! 🎉', 'success');
      }
      await fetchSweets();
      resetForm();
      setIsModalOpen(false);
    } catch (err) {
      setError(err.response?.data?.detail || 'Save failed');
      showToast(err.response?.data?.detail || 'Save failed', 'error');
    }
  };

  const handleEdit = (sweet) => {
    setEditingId(sweet.id);
    setForm({
      name: sweet.name,
      category: sweet.category,
      price: sweet.price,
      quantity: sweet.quantity,
      image_url: sweet.image_url || ''
    });
    setImagePreview(sweet.image_url || null);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/api/sweets/${confirmDialog.sweetId}`);
      await fetchSweets();
      showToast('Sweet deleted successfully! 🗑️', 'success');
      setConfirmDialog({ isOpen: false, sweetId: null });
    } catch (err) {
      setError(err.response?.data?.detail || 'Delete failed');
      showToast(err.response?.data?.detail || 'Delete failed', 'error');
    }
  };

  const handlePurchase = async () => {
    try {
      await api.post(`/api/sweets/${purchaseDialog.sweet.id}/purchase`, { 
        quantity: Number(purchaseDialog.quantity) 
      });
      await fetchSweets();
      showToast(`Purchased ${purchaseDialog.quantity}x ${purchaseDialog.sweet.name}! 🛒`, 'success');
      setPurchaseDialog({ isOpen: false, sweet: null, quantity: 1 });
    } catch (err) {
      showToast(err.response?.data?.detail || 'Purchase failed', 'error');
    }
  };

  const handleRestock = async () => {
    try {
      await api.post(`/api/sweets/${restockDialog.sweet.id}/restock`, { 
        quantity: Number(restockDialog.quantity) 
      });
      await fetchSweets();
      showToast(`Restocked ${restockDialog.quantity}x ${restockDialog.sweet.name}! 📦`, 'success');
      setRestockDialog({ isOpen: false, sweet: null, quantity: 5 });
    } catch (err) {
      showToast(err.response?.data?.detail || 'Restock failed', 'error');
    }
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  return (
    <div className="dashboard">
      {/* Search Bar */}
      <div className="search-section">
        <h2 className="section-title">
          <span className="title-icon">🔍</span>
          Find Your Sweets
        </h2>
        <form className="search-form" onSubmit={handleSearch}>
          <div className="search-grid">
            <input 
              placeholder="Search by name..." 
              value={search.name} 
              onChange={(e) => setSearch({ ...search, name: e.target.value })} 
              className="search-input"
            />
            <input 
              placeholder="Category" 
              value={search.category} 
              onChange={(e) => setSearch({ ...search, category: e.target.value })} 
              className="search-input"
            />
            <input 
              placeholder="Min price" 
              type="number" 
              step="0.01" 
              value={search.minPrice} 
              onChange={(e) => setSearch({ ...search, minPrice: e.target.value })} 
              className="search-input"
            />
            <input 
              placeholder="Max price" 
              type="number" 
              step="0.01" 
              value={search.maxPrice} 
              onChange={(e) => setSearch({ ...search, maxPrice: e.target.value })} 
              className="search-input"
            />
          </div>
          <button type="submit" className="btn-search">
            <span>🔎</span> Search
          </button>
        </form>
      </div>

      {/* Admin Add Button */}
      {role === 'admin' && (
        <div className="admin-actions">
          <button className="btn-add" onClick={openAddModal}>
            <span>+</span> Add New Sweet
          </button>
        </div>
      )}

      {/* Loading State */}
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading delicious sweets...</p>
        </div>
      ) : sweets.length === 0 ? (
        /* Empty State */
        <div className="empty-state">
          <div className="empty-icon">🍭</div>
          <h3>No sweets found</h3>
          <p>Try adjusting your search filters or add some sweets!</p>
          {role === 'admin' && (
            <button className="btn-primary" onClick={openAddModal}>Add Your First Sweet</button>
          )}
        </div>
      ) : (
        /* Sweets Grid */
        <div className="sweets-grid">
          {sweets.map((sweet) => (
            <div key={sweet.id} className="sweet-card">
              {sweet.image_url && (
                <div className="sweet-image">
                  <img src={sweet.image_url} alt={sweet.name} />
                </div>
              )}
              <div className="sweet-header">
                <h3 className="sweet-name">{sweet.name}</h3>
                <span className="sweet-category">{sweet.category}</span>
              </div>
              
              <div className="sweet-price">
                <span className="price-label">Price</span>
                <span className="price-value">${sweet.price.toFixed(2)}</span>
              </div>
              
              <div className="sweet-stock">
                <span className="stock-icon">📦</span>
                <span className={`stock-value ${
                  sweet.quantity === 0 ? 'out-of-stock' : 
                  sweet.quantity < 5 ? 'low-stock' : 'in-stock'
                }`}>
                  {sweet.quantity === 0 ? 'Out of Stock' : 
                   sweet.quantity < 5 ? `Only ${sweet.quantity} left!` : 
                   `${sweet.quantity} in stock`}
                </span>
              </div>
              
              <div className="sweet-actions">
                {role === 'user' && (
                  <button 
                    className="btn-purchase" 
                    disabled={sweet.quantity === 0}
                    onClick={() => setPurchaseDialog({ isOpen: true, sweet, quantity: 1 })}
                    title={sweet.quantity === 0 ? 'Out of stock' : 'Purchase this sweet'}
                  >
                    <span>🛒</span> Purchase
                  </button>
                )}
                
                {role === 'admin' && (
                  <>
                    <button 
                      className="btn-icon btn-edit" 
                      onClick={() => handleEdit(sweet)}
                      title="Edit sweet"
                    >
                      ✏️
                    </button>
                    <button 
                      className="btn-icon btn-restock" 
                      onClick={() => setRestockDialog({ isOpen: true, sweet, quantity: 5 })}
                      title="Restock sweet"
                    >
                      📦
                    </button>
                    <button 
                      className="btn-icon btn-delete" 
                      onClick={() => setConfirmDialog({ isOpen: true, sweetId: sweet.id })}
                      title="Delete sweet"
                    >
                      🗑️
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Admin Form Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => { setIsModalOpen(false); resetForm(); }}
        title={editingId ? '✏️ Edit Sweet' : '✨ Add New Sweet'}
      >
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Sweet Image</label>
            <div className="image-upload-container">
              {imagePreview && (
                <div className="image-preview">
                  <img src={imagePreview} alt="Preview" />
                  <button 
                    type="button" 
                    className="remove-image-btn"
                    onClick={() => {
                      setImagePreview(null);
                      setForm({ ...form, image_url: '' });
                    }}
                  >
                    ✕
                  </button>
                </div>
              )}
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageChange}
                className="image-input"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="image-upload-label">
                {imagePreview ? '📷 Change Image' : '📷 Upload Image'}
              </label>
              <p className="upload-hint">Max size: 5MB. Supports JPG, PNG, GIF</p>
            </div>
          </div>
          <div className="form-group">
            <label>Sweet Name</label>
            <input 
              placeholder="e.g., Kaju Katli" 
              value={form.name} 
              onChange={(e) => setForm({ ...form, name: e.target.value })} 
              required 
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <input 
              placeholder="e.g., Traditional" 
              value={form.category} 
              onChange={(e) => setForm({ ...form, category: e.target.value })} 
              required 
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Price ($)</label>
              <input 
                placeholder="0.00" 
                type="number" 
                step="0.01" 
                min="0" 
                value={form.price} 
                onChange={(e) => setForm({ ...form, price: e.target.value })} 
                required 
              />
            </div>
            <div className="form-group">
              <label>Quantity</label>
              <input 
                placeholder="0" 
                type="number" 
                min="0" 
                value={form.quantity} 
                onChange={(e) => setForm({ ...form, quantity: e.target.value })} 
                required 
              />
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={() => { setIsModalOpen(false); resetForm(); }}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              {editingId ? 'Update Sweet' : 'Create Sweet'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Purchase Dialog */}
      <Modal
        isOpen={purchaseDialog.isOpen}
        onClose={() => setPurchaseDialog({ isOpen: false, sweet: null, quantity: 1 })}
        title="🛒 Purchase Sweet"
      >
        {purchaseDialog.sweet && (
          <div className="purchase-dialog">
            <p className="purchase-sweet-name">{purchaseDialog.sweet.name}</p>
            <p className="purchase-info">Price: ${purchaseDialog.sweet.price.toFixed(2)} each</p>
            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                min="1"
                max={purchaseDialog.sweet.quantity}
                value={purchaseDialog.quantity}
                onChange={(e) => setPurchaseDialog({ ...purchaseDialog, quantity: e.target.value })}
              />
            </div>
            <div className="purchase-total">
              Total: ${(purchaseDialog.sweet.price * purchaseDialog.quantity).toFixed(2)}
            </div>
            <div className="modal-actions">
              <button 
                className="btn-secondary" 
                onClick={() => setPurchaseDialog({ isOpen: false, sweet: null, quantity: 1 })}
              >
                Cancel
              </button>
              <button className="btn-primary" onClick={handlePurchase}>
                Confirm Purchase
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Restock Dialog */}
      <Modal
        isOpen={restockDialog.isOpen}
        onClose={() => setRestockDialog({ isOpen: false, sweet: null, quantity: 5 })}
        title="📦 Restock Sweet"
      >
        {restockDialog.sweet && (
          <div className="restock-dialog">
            <p className="restock-sweet-name">{restockDialog.sweet.name}</p>
            <p className="restock-info">Current stock: {restockDialog.sweet.quantity}</p>
            <div className="form-group">
              <label>Add Quantity</label>
              <input
                type="number"
                min="1"
                value={restockDialog.quantity}
                onChange={(e) => setRestockDialog({ ...restockDialog, quantity: e.target.value })}
              />
            </div>
            <div className="restock-preview">
              New stock will be: {Number(restockDialog.sweet.quantity) + Number(restockDialog.quantity)}
            </div>
            <div className="modal-actions">
              <button 
                className="btn-secondary" 
                onClick={() => setRestockDialog({ isOpen: false, sweet: null, quantity: 5 })}
              >
                Cancel
              </button>
              <button className="btn-primary" onClick={handleRestock}>
                Confirm Restock
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        onClose={() => setConfirmDialog({ isOpen: false, sweetId: null })}
        onConfirm={handleDelete}
        title="Delete Sweet?"
        message="Are you sure you want to delete this sweet? This action cannot be undone."
      />
    </div>
  );
};

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role'));
  const [toast, setToast] = useState(null);

  const handleAuth = (jwt, userRole) => {
    localStorage.setItem('token', jwt);
    localStorage.setItem('role', userRole);
    setToken(jwt);
    setRole(userRole);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken(null);
    setRole(null);
    showToast('Logged out successfully! 👋', 'info');
  };

  const showToast = (message, type = 'info') => {
    setToast({ message, type });
  };

  const closeToast = () => {
    setToast(null);
  };

  return (
    <div className="app-shell">
      {/* Navigation Header */}
      <header className="navbar">
        <div className="navbar-brand">
          <span className="brand-icon">🍬</span>
          <span className="brand-name">Sweet Shop</span>
        </div>
        <nav className="navbar-nav">
          {token ? (
            <>
              <Link to="/dashboard" className="nav-link">
                <span>📊</span> Dashboard
              </Link>
              <span className={`user-badge ${role === 'admin' ? 'badge-admin' : 'badge-user'}`}>
                {role === 'admin' ? '👑 Admin' : '👤 Customer'}
              </span>
              <button onClick={handleLogout} className="btn-logout">
                <span>🚪</span> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">🔑 Login</Link>
              <Link to="/register" className="nav-link">✨ Register</Link>
            </>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Navigate to={token ? '/dashboard' : '/login'} replace />} />
          <Route path="/login" element={<Login onAuth={handleAuth} showToast={showToast} />} />
          <Route path="/register" element={<Register onAuth={handleAuth} showToast={showToast} />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth token={token}>
                <Dashboard role={role || 'user'} showToast={showToast} />
              </RequireAuth>
            }
          />
        </Routes>
      </main>

      {/* Toast Notifications */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={closeToast} />
      )}
    </div>
  );
};

export default App;
