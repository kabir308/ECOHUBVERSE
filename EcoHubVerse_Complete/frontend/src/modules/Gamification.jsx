import React, { useState, useEffect } from 'react';

const Gamification = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [actionFeedback, setActionFeedback] = useState(null);

    useEffect(() => {
        fetchGamificationProfile();
    }, []);

    const fetchGamificationProfile = async () => {
        try {
            const response = await fetch('/api/gamification/profile/user123');
            const data = await response.json();
            setProfile(data);
        } catch (error) {
            console.error('Error fetching gamification profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const logAction = async (action) => {
        try {
            const response = await fetch('/api/gamification/action', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: 'user123',
                    action,
                    metadata: { timestamp: new Date().toISOString() }
                })
            });
            const data = await response.json();
            setActionFeedback(data);
            fetchGamificationProfile();
            
            setTimeout(() => setActionFeedback(null), 5000);
        } catch (error) {
            console.error('Error logging action:', error);
        }
    };

    const calculateProgress = () => {
        if (!profile) return 0;
        return ((profile.points % 1000) / 1000) * 100;
    };

    if (loading) {
        return <div className="p-6 text-center">Loading your eco-achievements...</div>;
    }

    if (!profile) {
        return <div className="p-6 text-center">Unable to load gamification profile</div>;
    }

    return (
        <div className="p-6">
            <div className="mb-6">
                <h2 className="text-3xl font-bold mb-2">🎮 Eco-Gamification</h2>
                <p className="text-gray-600">Track your ecological impact and earn rewards</p>
            </div>

            {actionFeedback && (
                <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                    <p className="font-bold">{actionFeedback.message}</p>
                    {actionFeedback.newBadges.length > 0 && (
                        <p className="text-sm">New badges earned: {actionFeedback.newBadges.join(', ')}</p>
                    )}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-gradient-to-r from-green-400 to-green-600 rounded-lg p-6 text-white">
                    <h3 className="text-xl font-semibold mb-4">Your Level</h3>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-4xl font-bold">Level {profile.level}</span>
                        <span className="text-2xl">🌟</span>
                    </div>
                    <div className="mb-2">
                        <div className="flex justify-between text-sm mb-1">
                            <span>{profile.points} points</span>
                            <span>{profile.nextLevelPoints} points</span>
                        </div>
                        <div className="bg-white bg-opacity-30 rounded-full h-3">
                            <div
                                className="bg-white rounded-full h-3 transition-all duration-500"
                                style={{ width: `${calculateProgress()}%` }}
                            ></div>
                        </div>
                    </div>
                    <p className="text-sm opacity-90">Rank: {profile.rank}</p>
                </div>

                <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg p-6 text-white">
                    <h3 className="text-xl font-semibold mb-4">Environmental Impact</h3>
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-4xl font-bold">{profile.carbonSaved} kg</span>
                        <span className="text-2xl">🌍</span>
                    </div>
                    <p className="text-sm opacity-90 mb-4">CO₂ saved through your actions</p>
                    <div className="text-sm">
                        <p>≈ {Math.round(profile.carbonSaved / 5)} trees planted</p>
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <h3 className="text-xl font-bold mb-4">🏆 Your Badges</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {profile.badges.map((badge) => (
                        <div key={badge.id} className="border rounded-lg p-4 text-center">
                            <div className="text-4xl mb-2">🏅</div>
                            <h4 className="font-semibold text-sm mb-1">{badge.name}</h4>
                            <p className="text-xs text-gray-600">
                                Earned: {new Date(badge.earned).toLocaleDateString()}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-6">
                <h3 className="text-xl font-bold mb-4">📊 Your Achievements</h3>
                <div className="space-y-3">
                    {profile.achievements.map((achievement) => (
                        <div key={achievement.action} className="flex items-center justify-between border rounded-lg p-4">
                            <div className="flex-1">
                                <h4 className="font-semibold capitalize">{achievement.action.replace('-', ' ')}</h4>
                                <p className="text-sm text-gray-600">Completed {achievement.count} times</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-green-600">{achievement.points} pts</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-6">
                <h3 className="text-xl font-bold mb-4">🎯 Log Eco-Action</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <button
                        onClick={() => logAction('recycle')}
                        className="bg-green-500 text-white px-4 py-3 rounded-lg hover:bg-green-600 transition-colors"
                    >
                        ♻️ Recycle
                    </button>
                    <button
                        onClick={() => logAction('bike-commute')}
                        className="bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        🚴 Bike Commute
                    </button>
                    <button
                        onClick={() => logAction('solar-usage')}
                        className="bg-yellow-500 text-white px-4 py-3 rounded-lg hover:bg-yellow-600 transition-colors"
                    >
                        ☀️ Solar Usage
                    </button>
                    <button
                        onClick={() => logAction('plant-tree')}
                        className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors"
                    >
                        🌳 Plant Tree
                    </button>
                    <button
                        onClick={() => logAction('share-article')}
                        className="bg-purple-500 text-white px-4 py-3 rounded-lg hover:bg-purple-600 transition-colors"
                    >
                        📤 Share Article
                    </button>
                    <button
                        onClick={() => logAction('complete-course')}
                        className="bg-indigo-500 text-white px-4 py-3 rounded-lg hover:bg-indigo-600 transition-colors"
                    >
                        🎓 Complete Course
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Gamification;
