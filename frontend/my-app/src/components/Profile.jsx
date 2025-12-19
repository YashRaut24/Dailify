import './profile.css';
import { User, Mail, Calendar, MapPin, Edit2, Camera, Save, X } from 'lucide-react';
import { useEffect, useState } from "react";
import axios from "axios";

function Profile(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(null);
  const [editedProfile, setEditedProfile] = useState(null);
  const stats = [
    { label: "Days Active", value: "127" },
    { label: "Tasks Completed", value: "342" },
    { label: "Current Streak", value: "12" }
  ];

  useEffect(() => {
    if (!props.isVisible) return;

    const userId = localStorage.getItem("userId");
    if (!userId) return;

    axios
      .get(`http://localhost:9000/profile/${userId}`)
      .then(res => {
        setProfile(res.data);
        setEditedProfile(res.data);
      })
      .catch(err => console.error(err));
  }, [props.isVisible]);

  if (!props.isVisible) return null;
  if (!profile) return 
  
  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile(profile);
  };

  const handleSave = () => {
    setProfile(editedProfile);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedProfile(profile);
    setIsEditing(false);
  };

  const handleChange = (field, value) => {
    setEditedProfile(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className={`profile-container ${!props.isVisible ? 'hide' : ''} ${props.mode === 'dark' ? 'dark-mode' : 'light-mode'}`}>
      <button className="profile-close-btn" onClick={props.onClose}>
        <X size={24} />
      </button>

      <div className="profile-wrapper">
        <div className="profile-left">
          <div className="profile-card">
            <div className="profile-header">
              <div className="avatar-section">
                <div className="avatar">
                  {profile.avatar ? (
                    <img src={profile.avatar} alt="Profile" />
                  ) : (
                    <User size={64} />
                  )}
                </div>
                {isEditing && (
                  <button className="avatar-edit-btn">
                    <Camera size={18} />
                  </button>
                )}
              </div>

              {!isEditing ? (
                <button className="edit-btn" onClick={handleEdit}>
                  <Edit2 size={18} />
                  Edit Profile
                </button>
              ) : (
                <div className="edit-actions">
                  <button className="save-btn" onClick={handleSave}>
                    <Save size={18} />
                    Save
                  </button>
                  <button className="cancel-btn" onClick={handleCancel}>
                    <X size={18} />
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="profile-info">
              {!isEditing ? (
                <>
                  <h1 className="profile-name">{profile.name}</h1>
                  <p className="profile-bio">{profile.bio}</p>
                </>
              ) : (
                <>
                  <input
                    type="text"
                    className="edit-input name-input"
                    value={editedProfile.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Your name"
                  />
                  <textarea
                    className="edit-textarea"
                    value={editedProfile.bio}
                    onChange={(e) => handleChange('bio', e.target.value)}
                    placeholder="Tell us about yourself"
                    rows="3"
                  />
                </>
              )}

              <div className="profile-details">
                <div className="detail-item">
                  <Mail size={18} />
                  {!isEditing ? (
                    <span>{profile.email}</span>
                  ) : (
                    <input
                      type="email"
                      className="edit-input detail-input"
                      value={editedProfile.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                    />
                  )}
                </div>
                <div className="detail-item">
                  <MapPin size={18} />
                  {!isEditing ? (
                    <span>{profile.location}</span>
                  ) : (
                    <input
                      type="text"
                      className="edit-input detail-input"
                      value={editedProfile.location}
                      onChange={(e) => handleChange('location', e.target.value)}
                    />
                  )}
                </div>
                <div className="detail-item">
                  <Calendar size={18} />
                  <span>Joined {profile.joinDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-right">
          <div className="profile-stats">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="profile-section">
            <h2 className="section-title">Achievements</h2>
            <div className="achievements-grid">
              <div className="achievement-badge">
                <div className="badge-icon">🏆</div>
                <div className="badge-name">First Week</div>
              </div>
              <div className="achievement-badge">
                <div className="badge-icon">🔥</div>
                <div className="badge-name">10 Day Streak</div>
              </div>
              <div className="achievement-badge">
                <div className="badge-icon">⭐</div>
                <div className="badge-name">100 Tasks</div>
              </div>
              <div className="achievement-badge locked">
                <div className="badge-icon">💎</div>
                <div className="badge-name">30 Day Streak</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;