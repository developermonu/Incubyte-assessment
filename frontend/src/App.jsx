import { useEffect, useState } from 'react';
import { Link, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import api from './api';

const RequireAuth = ({ token, children }) => {
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const Login = ({ onAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await api.post('/api/auth/login', { email, password });
      onAuth(data.access_token, data.role);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Unable to login');
    }
  };

  return (
    <div className="card" style={{ maxWidth: '450px', margin: '0 auto' }}>
      <h2>🍬 Welcome Back!</h2>
      <p style={{ color: '#718096', marginBottom: '1.5rem' }}>Sign in to manage your sweet shop</p>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>📧 Email Address</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@example.com" required />
        </div>
        <div>
          <label>🔒 Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Enter your password" required />
        </div>
        <button type="submit" style={{ width: '100%', marginTop: '0.5rem' }}>🚀 Sign In</button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#718096' }}>
        Need an account? <Link to="/register" style={{ color: '#667eea', fontWeight: 600 }}>Create one here</Link>
      </p>
    </div>
  );
};

const Register = ({ onAuth }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await api.post('/api/auth/register', { email, password, role });
      onAuth(data.access_token, data.role);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.detail || 'Unable to register');
    }
  };

  return (
    <div className="card" style={{ maxWidth: '450px', margin: '0 auto' }}>
      <h2>✨ Create Account</h2>
      <p style={{ color: '#718096', marginBottom: '1.5rem' }}>Join our sweet shop community</p>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>📧 Email Address</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@example.com" required />
        </div>
        <div>
          <label>🔒 Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Minimum 6 characters" minLength={6} required />
        </div>
        <div>
          <label>👤 Account Type</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">🛒 Customer</option>
            <option value="admin">👑 Admin</option>
          </select>
        </div>
        <button type="submit" style={{ width: '100%', marginTop: '0.5rem' }}>🎉 Create Account</button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#718096' }}>
        Already have an account? <Link to="/login" style={{ color: '#667eea', fontWeight: 600 }}>Sign in here</Link>
      </p>
    </div>
  );
};

const Dashboard = ({ role }) => {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState({ name: '', category: '', minPrice: '', maxPrice: '' });
  const [form, setForm] = useState({ name: '', category: '', price: '', quantity: '' });
  const [editingId, setEditingId] = useState(null);

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
    setForm({ name: '', category: '', price: '', quantity: '' });
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const payload = {
      name: form.name,
      category: form.category,
      price: Number(form.price),
      quantity: Number(form.quantity)
    };

    try {
      if (editingId) {
        await api.put(`/api/sweets/${editingId}`, payload);
      } else {
        await api.post('/api/sweets', payload);
      }
      await fetchSweets();
      resetForm();
    } catch (err) {
      setError(err.response?.data?.detail || 'Save failed');
    }
  };

  const handleEdit = (sweet) => {
    setEditingId(sweet.id);
    setForm({
      name: sweet.name,
      category: sweet.category,
      price: sweet.price,
      quantity: sweet.quantity
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete sweet?')) return;
    try {
      await api.delete(`/api/sweets/${id}`);
      await fetchSweets();
    } catch (err) {
      setError(err.response?.data?.detail || 'Delete failed');
    }
  };

  const handlePurchase = async (sweet) => {
    const quantity = Number(prompt('Purchase quantity', '1'));
    if (!quantity) return;
    try {
      await api.post(`/api/sweets/${sweet.id}/purchase`, { quantity });
      await fetchSweets();
    } catch (err) {
      setError(err.response?.data?.detail || 'Purchase failed');
    }
  };

  const handleRestock = async (sweet) => {
    const quantity = Number(prompt('Restock quantity', '5'));
    if (!quantity) return;
    try {
      await api.post(`/api/sweets/${sweet.id}/restock`, { quantity });
      await fetchSweets();
    } catch (err) {
      setError(err.response?.data?.detail || 'Restock failed');
    }
  };

  return (
    <div className="dashboard">
      <h2>🍬 Sweet Shop Dashboard</h2>
      {error && <div className="error">⚠️ {error}</div>}

      <form className="search" onSubmit={handleSearch}>
        <input placeholder="🔍 Search by name..." value={search.name} onChange={(e) => setSearch({ ...search, name: e.target.value })} />
        <input placeholder="📁 Category" value={search.category} onChange={(e) => setSearch({ ...search, category: e.target.value })} />
        <input placeholder="💰 Min price" type="number" step="0.01" value={search.minPrice} onChange={(e) => setSearch({ ...search, minPrice: e.target.value })} />
        <input placeholder="💵 Max price" type="number" step="0.01" value={search.maxPrice} onChange={(e) => setSearch({ ...search, maxPrice: e.target.value })} />
        <button type="submit">🔎 Search</button>
      </form>

      {role === 'admin' && (
        <div className="card">
          <h3>{editingId ? '✏️ Edit Sweet' : '➕ Add New Sweet'}</h3>
          <form onSubmit={handleSubmit} className="form-grid">
            <div>
              <label>Sweet Name</label>
              <input placeholder="e.g., Kaju Katli" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div>
              <label>Category</label>
              <input placeholder="e.g., Traditional" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
            </div>
            <div>
              <label>Price ($)</label>
              <input placeholder="0.00" type="number" step="0.01" min="0" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
            </div>
            <div>
              <label>Quantity</label>
              <input placeholder="0" type="number" min="0" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} required />
            </div>
            <button type="submit">{editingId ? '💾 Update Sweet' : '✨ Create Sweet'}</button>
            {editingId && (
              <button type="button" onClick={resetForm} className="secondary">
                ❌ Cancel
              </button>
            )}
          </form>
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: 'center', padding: '3rem', fontSize: '1.2rem', color: '#667eea' }}>
          ⏳ Loading delicious sweets...
        </div>
      ) : (
        <div className="sweets-grid">
          {sweets.map((sweet) => (
            <div key={sweet.id} className="sweet-card">
              <h3>{sweet.name}</h3>
              <span className="category">{sweet.category}</span>
              <div className="price">${sweet.price.toFixed(2)}</div>
              <div className={`quantity ${sweet.quantity < 5 ? 'low-stock' : ''}`}>
                📦 Stock: {sweet.quantity} {sweet.quantity < 5 && sweet.quantity > 0 && '(Low!)'}
                {sweet.quantity === 0 && '(Out of Stock)'}
              </div>
              <div className="actions">
                <button disabled={sweet.quantity === 0} onClick={() => handlePurchase(sweet)}>
                  🛒 Purchase
                </button>
                {role === 'admin' && (
                  <>
                    <button onClick={() => handleEdit(sweet)}>✏️ Edit</button>
                    <button onClick={() => handleRestock(sweet)}>📦 Restock</button>
                    <button className="danger" onClick={() => handleDelete(sweet.id)}>
                      🗑️ Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && sweets.length === 0 && (
        <div style={{ textAlign: 'center', padding: '3rem', color: '#718096' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🍭</div>
          <h3>No sweets found</h3>
          <p>Try adjusting your search filters or add some sweets!</p>
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [role, setRole] = useState(localStorage.getItem('role'));

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
  };

  return (
    <div className="app-shell">
      <header>
        <h1>🍬 Sweet Shop</h1>
        <nav>
          {token ? (
            <>
              <Link to="/dashboard">📊 Dashboard</Link>
              <span style={{ color: '#cbd5e0', fontSize: '0.9rem', padding: '0 0.5rem' }}>
                {role === 'admin' ? '👑 Admin' : '👤 Customer'}
              </span>
              <button onClick={handleLogout}>🚪 Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">🔑 Login</Link>
              <Link to="/register">✨ Register</Link>
            </>
          )}
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Navigate to={token ? '/dashboard' : '/login'} replace />} />
          <Route path="/login" element={<Login onAuth={handleAuth} />} />
          <Route path="/register" element={<Register onAuth={handleAuth} />} />
          <Route
            path="/dashboard"
            element={
              <RequireAuth token={token}>
                <Dashboard role={role || 'user'} />
              </RequireAuth>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
