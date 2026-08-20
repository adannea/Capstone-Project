// src/SettingsForm.tsx
import { useState } from 'react';

function SettingsForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit">Save</button>
    </form>
  );
}

export default SettingsForm;