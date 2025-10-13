// src/hooks/useAuth.ts
import { useState, useEffect } from 'react';

export type UserRole = 'listener' | 'volunteer' | 'dj';

interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  bluesky?: string;
  linkedin?: string;
}

interface DonationHistory {
  id: string;
  date: string;
  amount: number;
  type: string;
  status: string;
}

interface PurchaseHistory {
  id: string;
  date: string;
  item: string;
  amount: number;
  status: string;
}

interface CollectionTrack {
  id: string;
  trackName: string;
  artistName: string;
  albumName: string;
  albumArt: string;
  labelName: string;
  isLocal?: boolean;
  dateAdded: string;
}

interface User {
  email: string;
  name: string;
  firstName?: string;
  lastName?: string;
  location?: string;
  role: UserRole;
  avatar?: string;
  memberSince?: string;
  socialLinks?: SocialLinks;
  djName?: string;
  showName?: string;
  donationHistory?: DonationHistory[];
  purchaseHistory?: PurchaseHistory[];
  collection?: CollectionTrack[];
  password?: string; // For demo purposes only
  pendingEmail?: string;
  pendingEmailToken?: string;
  pendingEmailExpiry?: string;
}

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const saved = localStorage.getItem('chirp-logged-in');
    return saved === 'true';
  });

  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('chirp-user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  // Sync login state to localStorage
  useEffect(() => {
    localStorage.setItem('chirp-logged-in', String(isLoggedIn));
  }, [isLoggedIn]);

  // Sync user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('chirp-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('chirp-user');
    }
  }, [user]);

  const login = (email: string, name?: string, role?: UserRole, avatar?: string) => {
    // In real implementation, this would call an API
    // For now, we'll simulate a login
    const mockUser: User = {
      email,
      name: name || email.split('@')[0],
      role: role || 'listener',
      avatar
    };
    setUser(mockUser);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('chirp-user');
    localStorage.removeItem('chirp-logged-in');
  };

  const signup = (email: string, name?: string, role?: UserRole) => {
    // In real implementation, this would call an API
    // For now, we'll simulate a signup
    const mockUser: User = {
      email,
      name: name || email.split('@')[0],
      role: role || 'listener'
    };
    setUser(mockUser);
    setIsLoggedIn(true);
  };

  const switchProfile = (role: UserRole) => {
    const profiles: Record<UserRole, User> = {
      listener: {
        email: 'listener@chirpradio.org',
        name: 'Jane Listener',
        firstName: 'Jane',
        lastName: 'Listener',
        location: 'Chicago, Illinois',
        role: 'listener',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
        memberSince: '2020-03-15',
        password: 'demo123', // For demo purposes only
        socialLinks: {
          instagram: 'www.instagram.com/janelistener',
          twitter: 'www.twitter.com/janelistener',
          bluesky: 'bsky.app/profile/janelistener.bsky.social'
        },
        donationHistory: [
          { id: '1', date: '01/15/2024', amount: 50, type: 'One-time', status: 'Completed' },
          { id: '2', date: '12/01/2023', amount: 25, type: 'One-time', status: 'Completed' },
          { id: '3', date: '10/15/2023', amount: 100, type: 'One-time', status: 'Completed' },
        ],
        purchaseHistory: [
          { id: '1', date: '01/20/2024', item: 'CHIRP Logo T-Shirt', amount: 25, status: 'Shipped' },
          { id: '2', date: '12/15/2023', item: 'Chicago Skyline Music Poster', amount: 20, status: 'Delivered' },
        ],
        collection: [
          {
            id: 'track-001',
            trackName: 'Cruel Summer',
            artistName: 'Taylor Swift',
            albumName: 'Lover',
            albumArt: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=200&h=200&fit=crop',
            labelName: 'Republic Records',
            dateAdded: '2024-12-01T14:30:00Z'
          },
          {
            id: 'track-002',
            trackName: 'Levitating',
            artistName: 'Dua Lipa',
            albumName: 'Future Nostalgia',
            albumArt: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop',
            labelName: 'Warner Records',
            dateAdded: '2024-11-28T09:15:00Z'
          },
          {
            id: 'track-003',
            trackName: 'Blinding Lights',
            artistName: 'The Weeknd',
            albumName: 'After Hours',
            albumArt: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200&h=200&fit=crop',
            labelName: 'XO Records',
            dateAdded: '2024-11-20T16:45:00Z'
          },
        ]
      },
      volunteer: {
        email: 'volunteer@chirpradio.org',
        name: 'Sam Volunteer',
        firstName: 'Sam',
        lastName: 'Volunteer',
        location: 'Chicago, Illinois',
        role: 'volunteer',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
        memberSince: '2019-06-20',
        password: 'demo123', // For demo purposes only
        socialLinks: {
          facebook: 'www.facebook.com/samvolunteer',
          instagram: 'www.instagram.com/samvolunteer',
          linkedin: 'www.linkedin.com/samvolunteer'
        },
        donationHistory: [
          { id: '1', date: '02/01/2024', amount: 150, type: 'Monthly', status: 'Active' },
          { id: '2', date: '01/01/2024', amount: 150, type: 'Monthly', status: 'Completed' },
          { id: '3', date: '11/20/2023', amount: 75, type: 'One-time', status: 'Completed' },
          { id: '4', date: '09/15/2023', amount: 200, type: 'One-time', status: 'Completed' },
        ],
        purchaseHistory: [
          { id: '1', date: '02/10/2024', item: 'Vintage Radio Waves Poster', amount: 20, status: 'Delivered' },
          { id: '2', date: '01/05/2024', item: 'CHIRP Logo Hoodie', amount: 45, status: 'Delivered' },
          { id: '3', date: '11/28/2023', item: 'CHIRP Enamel Mug', amount: 15, status: 'Delivered' },
        ],
        collection: [
          {
            id: 'track-004',
            trackName: 'Pusha Man',
            artistName: 'Chance the Rapper',
            albumName: 'Acid Rap',
            albumArt: 'https://upload.wikimedia.org/wikipedia/en/5/5b/Chance_the_rapper_acid_rap.jpg',
            labelName: 'Chance the Rapper',
            isLocal: true,
            dateAdded: '2024-12-02T10:15:00Z'
          },
          {
            id: 'track-005',
            trackName: 'Stupid Kid',
            artistName: 'Alkaline Trio',
            albumName: 'From Here to Infirmary',
            albumArt: 'https://upload.wikimedia.org/wikipedia/en/c/ce/Alkaline_Trio_-_From_Here_to_Infirmary_cover.jpg',
            labelName: 'Vagrant Records',
            isLocal: true,
            dateAdded: '2024-11-25T16:45:00Z'
          },
          {
            id: 'track-006',
            trackName: 'Take Me Out',
            artistName: 'Franz Ferdinand',
            albumName: 'Franz Ferdinand',
            albumArt: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=200&h=200&fit=crop',
            labelName: 'Domino Recording',
            dateAdded: '2024-11-15T14:20:00Z'
          },
        ]
      },
      dj: {
        email: 'dj@chirpradio.org',
        name: 'Sally Smith',
        firstName: 'Sally',
        lastName: 'Smith',
        location: 'Chicago, Illinois',
        role: 'dj',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop',
        memberSince: '2018-01-10',
        password: 'demo123', // For demo purposes only
        djName: 'DJ Sally',
        showName: 'Seashells by the Seashore',
        socialLinks: {
          facebook: 'www.facebook.com/djsally',
          instagram: 'www.instagram.com/djsally',
          twitter: 'www.twitter.com/djsally',
          linkedin: 'www.linkedin.com/djsally',
          bluesky: 'bsky.app/profile/djsally.bsky.social'
        },
        donationHistory: [
          { id: '1', date: '02/05/2024', amount: 250, type: 'Monthly', status: 'Active' },
          { id: '2', date: '01/05/2024', amount: 250, type: 'Monthly', status: 'Completed' },
          { id: '3', date: '12/05/2023', amount: 250, type: 'Monthly', status: 'Completed' },
          { id: '4', date: '10/31/2023', amount: 500, type: 'One-time', status: 'Completed' },
          { id: '5', date: '08/15/2023', amount: 100, type: 'One-time', status: 'Completed' },
        ],
        purchaseHistory: [
          { id: '1', date: '01/25/2024', item: 'CHIRP 20th Anniversary Poster', amount: 20, status: 'Shipped' },
          { id: '2', date: '12/20/2023', item: 'Underground Music Scene Poster', amount: 20, status: 'Delivered' },
          { id: '3', date: '11/15/2023', item: 'CHIRP Baseball Cap', amount: 22, status: 'Delivered' },
          { id: '4', date: '10/10/2023', item: 'CHIRP Vinyl Tote Bag', amount: 18, status: 'Delivered' },
        ],
        collection: [
          {
            id: 'track-007',
            trackName: 'Vis Major',
            artistName: 'Into It. Over It.',
            albumName: 'Standards',
            albumArt: 'https://f4.bcbits.com/img/a1076606024_16.jpg',
            labelName: 'Storchmasers',
            isLocal: true,
            dateAdded: '2024-12-05T11:24:00Z'
          },
          {
            id: 'track-008',
            trackName: 'Last Place You Look',
            artistName: 'The Get Up Kids',
            albumName: 'Four Minute Mile',
            albumArt: 'https://upload.wikimedia.org/wikipedia/en/9/95/Gukfmm.jpg',
            labelName: 'Doghouse Records',
            dateAdded: '2024-11-30T10:21:00Z'
          },
          {
            id: 'track-009',
            trackName: 'Only Shallow',
            artistName: 'My Bloody Valentine',
            albumName: 'Loveless',
            albumArt: 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=200&h=200&fit=crop',
            labelName: 'Creation Records',
            dateAdded: '2024-11-18T09:48:00Z'
          },
        ]
      }
    };

    const selectedProfile = profiles[role];

    // Save directly to localStorage to ensure it persists before reload
    localStorage.setItem('chirp-user', JSON.stringify(selectedProfile));
    localStorage.setItem('chirp-logged-in', 'true');

    setUser(selectedProfile);
    setIsLoggedIn(true);
    console.log(`✅ Switched to ${role} profile:`, selectedProfile);
  };

  const verifyPassword = (password: string): boolean => {
    // In real implementation, this would securely verify password
    return user?.password === password;
  };

  const requestEmailChange = (newEmail: string, token: string) => {
    if (!user) return false;

    const expiry = new Date();
    expiry.setHours(expiry.getHours() + 48); // 48 hour expiry

    const updatedUser = {
      ...user,
      pendingEmail: newEmail,
      pendingEmailToken: token,
      pendingEmailExpiry: expiry.toISOString(),
    };

    setUser(updatedUser);
    return true;
  };

  const verifyEmailChange = (token: string): boolean => {
    if (!user || !user.pendingEmail || !user.pendingEmailToken) return false;

    // Check token matches and hasn't expired
    if (user.pendingEmailToken !== token) return false;

    if (user.pendingEmailExpiry) {
      const expiry = new Date(user.pendingEmailExpiry);
      if (expiry < new Date()) return false;
    }

    // Complete email change
    const updatedUser = {
      ...user,
      email: user.pendingEmail,
      pendingEmail: undefined,
      pendingEmailToken: undefined,
      pendingEmailExpiry: undefined,
    };

    setUser(updatedUser);
    return true;
  };

  const cancelEmailChange = () => {
    if (!user) return;

    const updatedUser = {
      ...user,
      pendingEmail: undefined,
      pendingEmailToken: undefined,
      pendingEmailExpiry: undefined,
    };

    setUser(updatedUser);
  };

  return {
    isLoggedIn,
    user,
    login,
    logout,
    signup,
    switchProfile,
    verifyPassword,
    requestEmailChange,
    verifyEmailChange,
    cancelEmailChange,
  };
}
